class GoogleBooks 
  PROVIDER_URL = "https://www.googleapis.com/books/v1/volumes/"  
  MAX_RESULTS_PER_PAGE = 20

  attr_reader :params, :data, :success

  def initialize(params, data, success)
    @params = params
    @data = data
    @success = success
  end

  def to_own_notation
    return if @data[:items].nil?

    total = @data[:totalItems].to_i

    transformed = {
      :total => total,
      :pages => (total.to_f / MAX_RESULTS_PER_PAGE).ceil,
      :items => []
    }

    @data[:items].each { |item| transformed[:items] << transform_item(item) }

    return transformed    
  end

  def self.find(params, page, remote_ip)
    # define internal parameters
    params[:startIndex] = (page - 1) * MAX_RESULTS_PER_PAGE
    params[:maxResults] = MAX_RESULTS_PER_PAGE
    params[:userIp] = remote_ip

    # make request
    uri = URI(PROVIDER_URL)
    uri.query = URI.encode_www_form(params)
    response = Net::HTTP.get_response(uri)
    
    # construct model
    new(params, JSON.parse(response.body).with_indifferent_access, response.is_a?(Net::HTTPSuccess))
  end

  private 
    def transform_item(item)
      volume = item[:volumeInfo]
      sale   = item[:saleInfo]
      price  = sale[:retailPrice] unless sale.nil?
      images = volume[:imageLinks]
      
      transformed = { :thumbnails => {} }

      safe_insert transformed, :title, volume, :title
      safe_insert transformed, :link, volume, :canonicalVolumeLink
      safe_insert transformed, :authors, volume, :authors, []
      safe_insert transformed, :description, volume, :description
      safe_insert transformed, :publisher, volume, :publisher
      safe_insert transformed, :date, volume, :publishedDate

      safe_insert transformed, :sale, sale, :saleability, false do |value|
        value != "NOT_FOR_SALE"
      end 

      safe_insert transformed, :currency, price, :currencyCode
      safe_insert transformed, :price, price, :amount, 0
      safe_insert transformed[:thumbnails], :normal, images, :thumbnail
      safe_insert transformed[:thumbnails], :small,  images, :smallThumbnail

      return transformed
    end

    def safe_insert(dest, dest_key, source, source_key, default = "", &transform)
      unless source.nil? then
        dest[dest_key] = source[source_key] || default
        dest[dest_key] = transform.call(dest[dest_key]) if block_given?
      end
    end    
end