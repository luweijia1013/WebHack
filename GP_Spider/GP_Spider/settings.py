# -*- coding: utf-8 -*-

# Scrapy settings for GP_Spider project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = 'GP_Spider'

SPIDER_MODULES = ['GP_Spider.spiders']
NEWSPIDER_MODULE = 'GP_Spider.spiders'


# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'GP_Spider (+http://www.yourdomain.com)'
USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'

# Obey robots.txt rules
ROBOTSTXT_OBEY = False

# Configure maximum concurrent requests performed by Scrapy (default: 16)
#CONCURRENT_REQUESTS = 32

# Configure a delay for requests for the same website (default: 0)
# See https://docs.scrapy.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
DOWNLOAD_DELAY = 0.25
# The download delay setting will honor only one of:
#CONCURRENT_REQUESTS_PER_DOMAIN = 16
#CONCURRENT_REQUESTS_PER_IP = 16

# Disable cookies (enabled by default)
COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
#TELNETCONSOLE_ENABLED = False

# Override the default request headers:
DEFAULT_REQUEST_HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en',
    'referer': 'https://play.google.com/',
    'cookie': 'CONSENT=YES+GB.zh-CN+; _ga=GA1.3.90637757.1557139741; SID=eQfn1xH4gOF8KyjnSp02CQaNHLY7ZVx34Wj6hwMqm1hRBiwh_WIVq5eh0AKcLRjb9r1yzg.; HSID=AhIJG9YwNIDkkEDk4; SSID=AgbXQKsBYAP3mZMk2; APISID=w7uvH1tCGfVE5_wf/ARn2JUmM94Z-GsBdz; SAPISID=f2ABl6RUM-itd87r/AEM4_0X7Uz-05POJI; SEARCH_SAMESITE=CgQIhY4B; OTZ=5165013_56_56_123900_52_436380; _gac_UA-19995903-1=1.1573222718.CjwKCAiAwZTuBRAYEiwAcr67OddTU9upX4_IJydheo1s_4e6yYyTPcsrOeYp9AnYVhRzA03kEAmB9hoC9KEQAvD_BwE; ANID=AHWqTUmaW_xYyrP6_rIBJSFewiy_9mo41n27F4lXm0L4KV02rDmrIyNDA8yq4ema; PLAY_ACTIVE_ACCOUNT=ICrt_XL61NBE_S0rhk8RpG0k65e0XwQVdDlvB6kxiQ8=wsweisu@gmail.com; _gid=GA1.3.839486863.1574350923; NID=192=WjAJan-3_0QDng0A7SiSZ0DFJnzGi1EkCoat3DnNBTEaEQU9iolx4q_LXMdRIKtPKMbiAQRtm1-RMtc6jQWas3-lRYkXzStKY96WrOaQVEh7zJThDZ70BjF2qmlaVHwqOS8YUjSIn_0YCzKhjXcZsglRoYyeqVYuySwlEFY9nivhm7TvM_SX5sgN-hn2ijWR4ejXL9GNuudXto6Zx83AoB2ZxYTrVYVeMIedU1sVxmxOjGWdZdOvJduaxzpbqbA; 1P_JAR=2019-11-22-3; SIDCC=AN0-TYsH-afpT1x3J0FatTOdWUqY7-7gySijWPm_MQa5KpMuyxrLqszTW6CXTqaavRxyXfrgu2Ec'
}

# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'GP_Spider.middlewares.GpSpiderSpiderMiddleware': 543,
#}

# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
DOWNLOADER_MIDDLEWARES = {
    # 'GP_Spider.middlewares.GpSpiderDownloaderMiddleware': 543,
    'GP_Spider.middlewares.SeleniumDownloaderMiddleware': 543,
}

# Enable or disable extensions
# See https://docs.scrapy.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    'scrapy.extensions.telnet.TelnetConsole': None,
#}

# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
    'GP_Spider.pipelines.GpSpiderPipeline': 300,
    # 'GP_Spider.redis.pipelines.RedisPipeline': 100,
}
# DUPEFILTER_CLASS = "scrapy redis.dupefilter.RFPDupeFilter"
# SCHEDULER = "scrapy redis.schedule.Scheduler"
# SCHEDULER_PERSIST = True
# REDIS_HOST = '127.0.0.1'
# REDIS_PORT = 6379

MONGODB_URI = 'mongodb://localhost:27017'
MONGODB_DBNAME = 'scrapy_db'
MONGODB_DOCNAME = 'apkinfo_test'

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/autothrottle.html
#AUTOTHROTTLE_ENABLED = True
# The initial download delay
#AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
#AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
#AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = 'httpcache'
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'

HTTPERROR_ALLOWED_CODES = [301, 302]

#LOG_STDOUT = True
# LOG_LEVEL = 'INFO'
LOG_FILE = 'spider.log'

