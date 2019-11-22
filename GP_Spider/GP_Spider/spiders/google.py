# -*- coding: utf-8 -*-
import scrapy
import logging

from GP_Spider.items import GpItem
from scrapy import Request

class GoogleSpider(scrapy.Spider):
    name = 'google'
    allowed_domains = ['google.play.com']
    start_urls = ['https://play.google.com/store']

    def parse(self, response):
        keywords = [
            'stuttering', 'speech%20therapy', 'speech%20and%20language%20therapy', 'aphasia', 'apraxia', 'dysarthria'
        ]

        link_flag = 0

        urls = []
        for key in keywords:
            app_url = ("https://play.google.com/store/search?q=" + key + '&c=apps')
            # print(app_url)
            yield Request(url=app_url, callback=self.parse_search, dont_filter=True)

    def parse_search(self, response):
        print("START PARSING")
        selector = scrapy.Selector(response)
        #print(response.body)

        urls = selector.xpath('//div[@class="Qktxw"]/div[@class="WpDbMd"]/div[@class="T4LgNb"]/div[@class="N4FjMb"]/div[@class="WcZbQd"]/div[@class="Ktdaqe"]/div[@class="ZmHEEd"]/div[@class="ImZGtf mpg5gc"]/div[@class="uMConb  V2Vq5e POHYmb-eyJpod YEDFMc-eyJpod y1APZe-eyJpod drrice"]/a[@class="poRVub" and aria-hidden="true"]/@href').extract()
        #urls = selector.xpath('//*[@id="fcxH9b"]/div[4]/c-wiz/div/div[2]/div/c-wiz/c-wiz/c-wiz/div/div[2]/div[1]/c-wiz/div/div/div/div/div/a/@href').extract()

        print(urls)
        logging.debug(urls)


        for app_url in urls:
            yield Request(url="https://play.google.com" + app_url, callback=self.parse_detail, dont_filter=True)
            print("https://play.google.com" + app_url)

    def parse_detail(self, response):
        item = GpItem()
        item['app_url'] = response.url
        item['app_name'] = response.xpath('//h1[@itemprop="name"]/span').xpath('text()').get()
        item['app_icon'] = response.xpath('//img[@itemprop="image"]/@src').get()
        item['app_rate'] = response.xpath('//div[@class="K9wGie"]/div[@class="BHMmbe"]').xpath('text()').get()
        item['app_version'] = response.xpath('//div[@class="IQ1z0d"]/span[@class="htlgb"]').xpath('text()').get()
        item['app_description'] = response.xpath('//div[@itemprop="description"]/span/div').xpath('text()').get()
        # item['app_developer'] = response.xpath('//')
        # print(response.text)
        print(item)
        yield item


