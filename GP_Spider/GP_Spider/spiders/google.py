# -*- coding: utf-8 -*-
import scrapy
import logging
import collections

from GP_Spider.items import GpItem
from scrapy import Request
from selenium import webdriver
from selenium.webdriver import ChromeOptions


class GoogleSpider(scrapy.Spider):
    name = 'google'
    allowed_domains = ['google.play.com']
    start_urls = ['https://play.google.com/store/search?q=articulation&c=apps']

    def __init__(self):
        super(GoogleSpider, self).__init__(name='google')
        # url = 'https://play.google.com/store'
        # tag = getattr(self, 'tag', None)
        # if tag is not None:
        #     url = url + '/search?q=' + tag + '&c=apps'
        #     print(url)
        #     GoogleSpider.start_urls.append((url))
        # yield scrapy.Request(url, self.parse, cookies={'SingleApp': True})
        self.categories = []
        option = ChromeOptions()
        option.headless = True
        self.driver = webdriver.Chrome(options=option)

    # def parse(self, response):
    #     keywords = [
    #         'stuttering', 'speech%20therapy', 'speech%20and%20language%20therapy', 'aphasia', 'apraxia', 'dysarthria'
    #     ]

    #     for key in keywords:
    #         app_url = ("https://play.google.com/store/search?q=" + key + "&c=apps")
    #         print(app_url)
    #         yield Request(url=app_url, callback=self.parse_search, dont_filter=True)

    #TODO: To be overloaded by different calling type: tag call/ normal call
    def parse(self, response):
        print("START PARSING")
        selector = scrapy.Selector(response)
        # print(response.body)
        #
        # urls = selector.xpath('//a[@class="poRVub" and aria-hidden="true"]/@href').extract()
        # urls = selector.xpath('//*[@id="fcxH9b"]/div[4]/c-wiz/div/div[2]/div/c-wiz/c-wiz/c-wiz/div/div[2]/div[1]/c-wiz/div/div/div/div/div/a/@href').extract()

        urls = selector.xpath('//a[@class="JC71ub"]/@href').extract()

        print(len(urls))
        logging.debug(urls)
        for app_url in urls:
            yield Request(url="https://play.google.com" + app_url, callback=self.parse_one_app, dont_filter=True, cookies={'SingleApp':True})
            print("https://play.google.com" + app_url)
        print('COUNTER: ', collections.Counter(self.categories))

    def parse_one_app(self, response):
        item = GpItem()
        app_id_index = response.url.find('id=') + len('id=') if response.url.find('id=') >= 0 else -1
        item['app_id'] = response.url[app_id_index:]  if app_id_index != -1 else ''
        item['app_url'] = response.url
        item['app_name'] = response.xpath('//h1[@itemprop="name"]/span').xpath('text()').get()
        item['app_icon'] = response.xpath('//img[@itemprop="image"]/@src').get()
        item['app_rate'] = response.xpath('//div[@class="K9wGie"]/div[@class="BHMmbe"]').xpath('text()').get()
        item['app_category'] = response.xpath('//a[@itemprop="genre"]').xpath('text()').get()
        self.categories.append(item['app_category'])
        # TODO: xpath fix of version and date
        item['app_date'] = response.xpath('//div[@class="IQ1z0d"]/span[@class="htlgb"]').xpath('text()').get()
        item['app_version'] = response.xpath('//div[@class="IQ1z0d"]/span[@class="htlgb"]').xpath('text()').get()
        item['app_description'] = response.xpath('//div[@itemprop="description"]/span/div').xpath('text()').get()
        # item['app_developer'] = response.xpath('//')
        # print(response.text)
        print(item)
        yield item


