require "net/http"

class Api::BooksController < ApplicationController
  respond_to :json
  
  # Constants
  
  FORWARD_PARAMETERS = [ "q", "filtering", "printType", "orderBy" ]

  ALLOWED_PARAMETERS = {
    :filtering => [ "preview", "full" ],
    :printType => [ "books", "magazines" ],
    :orderBy   => [ "relevance", "newest" ],
  }

  ERROR_MESSAGES = {
    :required => "Parameter \"%s\" is required.",
    :allowed  => "Parameter \"%s\" is invalid. Allowed are [%s]."
  }

  # Methods

  def index    
    return unless is_valid_request?

    output = Rails.cache.fetch(request.url, :expires_in => 1.hour) do    
      logger.info "Requesting Google Books..."
      
      books = get_data_from_google
      books.to_own_notation if books.success
    end

    Rails.cache.delete(request.url) if output.nil?

    render :json => output
  end

  private
    def is_valid_request?
      errors = [];

      errors << ERROR_MESSAGES[:required] % "q" if params[:q].nil?

      ALLOWED_PARAMETERS.keys.each do |param| 
        is_valid_param = params[param].nil? || ALLOWED_PARAMETERS[param].include?(params[param])

        errors << ERROR_MESSAGES[:allowed] % [ param, ALLOWED_PARAMETERS[param] ] unless is_valid_param
      end

      render :json => { :errors => errors }, :status => 400 unless errors.empty?

      return errors.empty?
    end

    def get_data_from_google
      page = [1, params[:page].to_i].max 
      provider_params = {}

      params.each { |key, value| provider_params[key] = value if FORWARD_PARAMETERS.include?(key) }

      return GoogleBooks.find(provider_params, page, request.remote_ip)
    end
end