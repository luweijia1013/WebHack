# -*- coding: utf-8 -*-
import random, base64

class ProxyMiddleware(object):
    proxyList = {
        '93.81.246.5:53281',
        '212.3.208.252:30091',
        '181.129.70.82:35402',
    }

    def process_request(self, request, spider):
        # Set the location of the proxy
        pro_adr = random.choice(self.proxyList)
        print("Use Proxy -> " + pro_adr)
        request.meta['proxy'] = "http://" + pro_adr