# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
from scrapy import Item
import gp.settings


class GpPipeline(object):
    @classmethod
    def from_crawler(cls, crawler):
        cls.DB_URI = crawler.settings.get('MONGODB_URI', 'mongodb://localhost:27017')
        cls.DB_NAME = crawler.settings.get('MONGODB_DBNAME', 'scrapy_db')
        return cls()

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.DB_URI)
        self.db = self.client[self.DB_NAME]
        self.collection = self.db[spider.settings.get('MONGODB_DOCNAME')]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        postItem = dict(item)
        self.collection.insert_one(postItem)
        return item

    #def insert_db(self, item):
    #    if isinstance(item, Item):
    #        item = dict(item)
    #    self.db.books.insert_one(item)
