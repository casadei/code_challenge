require 'rails_helper'

RSpec.describe GoogleBooks, :type => :model do
  def fake_request query, startIndex, userIp
      url = "#{GoogleBooks::PROVIDER_URL}?maxResults=#{GoogleBooks::MAX_RESULTS_PER_PAGE}&q=#{query}&startIndex=#{startIndex}&userIp=#{userIp}"
      body = "{ \"totalItems\": 61, \"items\": [] }"

      stub_request(:get, url)
        .with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Host'=>'www.googleapis.com', 'User-Agent'=>'Ruby'})
        .to_return(:status => 200, :body => body, :headers => {})
  end

  query = "book"
  ip = "127.0.0.1"

  describe("Find") do
    it ("should make a request to google books api") do
      startIndex = 0

      fake_request query, startIndex, ip

      response = GoogleBooks.find({ :q => query }, 1, ip)  

      expect(response.success).to eq(true)
      expect(response.data[:totalItems]).to eq(61)
      expect(response.data[:items].length).to eq(0)
    end

    it "should calculate correct startIndex corresponding to page" do
      startIndex = GoogleBooks::MAX_RESULTS_PER_PAGE * 1
      fake_request query, startIndex, ip

      response = GoogleBooks.find({ :q => query }, 2, ip)  

      expect(response.success).to eq(true)
    end
  end

  describe("when define own notation")
    it "should calculate correct total of pages" do
      startIndex = 0

      fake_request query, startIndex, ip

      response = GoogleBooks.find({ :q => query }, 1, ip)  

      expect(response.success).to eq(true)

      hash = response.to_own_notation

      expect(hash[:pages]).to eq(4)
    end
end
