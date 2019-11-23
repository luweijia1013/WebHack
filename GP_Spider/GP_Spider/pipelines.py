# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
import logging


class GpSpiderPipeline(object):
    @classmethod
    def from_crawler(cls, crawler):
        cls.DB_URI = crawler.settings.get('MONGODB_URI', 'mongodb://localhost:27017')
        cls.DB_NAME = crawler.settings.get('MONGODB_DBNAME', 'scrapy_db')
        return cls()

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.DB_URI)
        self.db = self.client[self.DB_NAME]
        self.collection = self.db[spider.settings.get('MONGODB_DOCNAME')]
        # self.collection.create_index('id', unique=True)

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        postItem = dict(item)
        # self.collection.update({'app_id': item['app_id']}, {'$set': dict(item)}, True)
        # TODO: complex update logic
        find_app_id = self.collection.find({'app_id':item['app_id']}).pretty()
        print('FINDAPPID:', find_app_id)
        if not find_app_id:
            logging.info('New App_id: %s !' % item['app_id'])
            self.collection.insert_one(postItem)
        else:
            logging.warning('App_id: %s existed!' % item['app_id'])
        return item


