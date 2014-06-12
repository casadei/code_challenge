require 'rails_helper'

RSpec.describe Api::BooksController, :type => :controller do
  REQUIRED_MESSAGE_PATTERN = "Parameter \"%s\" is required."
  ALLOWED_MESSAGE_PATTERN = "Parameter \"%s\" is invalid. Allowed are [%s]."

  def test_validation(params = nil, expectedMessage)
      get :index, params

      parsed = JSON.parse(response.body).with_indifferent_access
      expect(parsed[:errors].length).to be(1)
      expect(parsed[:errors].first).to eq(expectedMessage)
  end

  describe "should give HTTP Status 400 (BadRequest)" do
    it "when q parameter does not informed" do
      test_validation(nil, REQUIRED_MESSAGE_PATTERN % "q")
    end

    it "when filtering parameter is not allowed" do
      params = { :q => "test", :filtering => "unknown" }
      message = ALLOWED_MESSAGE_PATTERN % [ "filtering", [ "preview", "full" ] ]

      test_validation(params, message)
    end

    it "when printType parameter is not allowed" do
      params = { :q => "test", :printType => "unknown" }
      message = ALLOWED_MESSAGE_PATTERN % [ "printType", [ "books", "magazines" ] ]

      test_validation(params, message)
    end

    it "when printType parameter is not allowed" do
      params = { :q => "test", :orderBy => "unknown" }
      message = ALLOWED_MESSAGE_PATTERN % [ "orderBy", [ "relevance", "newest" ] ]

      test_validation(params, message)
    end
  end

  it "should return HTTP Status 200 and books data when query is informed" do
    startIndex = 0
    userIp = "0.0.0.0"
    query = "book"
    
    url = "#{GoogleBooks::PROVIDER_URL}?maxResults=#{GoogleBooks::MAX_RESULTS_PER_PAGE}&q=#{query}&startIndex=#{startIndex}&userIp=#{userIp}"
    body = "{ \"totalItems\": 61, \"items\": [] }"

    stub_request(:get, url)
      .with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Host'=>'www.googleapis.com', 'User-Agent'=>'Ruby'})
      .to_return(:status => 200, :body => body, :headers => {})


    get :index, :q => query

    expect(response.code).to eq("200")

    parsed = JSON.parse(response.body).with_indifferent_access

    expect(parsed.nil?).to be(false)
  end
end