from pymongo import MongoClient
import csv

db = MongoClient('localhost', 27017)['scrapy_db']
collection = db['apkinfo_tt']


# Deduplication
def find_dup_key():
    pipeline = [
        {
            # Match documents with specific words
            "$match": {
                "app_id": {"$exists": True},
                "app_name": {"$exists": True},
                "app_url": {"$exists": True},
            }
        },
        {
            "$group": {
                "_id": {
                    "app_id": "$app_id",
                    "app_name": "$app_name",
                    "app_url": "$app_url",
                    "app_date": "$app_date",
                },
                "count": {"$sum": 1}
            }
        },
        {"$match": {
            "count": {"$gt": 1}
        }}
    ]
    return list(collection.aggregate(pipeline, allowDiskUse=True))


all_dup_key = find_dup_key()
for dup_event in all_dup_key:
    match_pipe = dup_event['_id']
    remove_id_list = []
    dups = list(collection.find(match_pipe))
    if len(dups) >= 2:
        print(len(dups))
        for key in dups:
            remove_id_list.append(key['_id'])
        print(remove_id_list)
        needToSave = remove_id_list.pop()
        print(remove_id_list)
        for to_del in remove_id_list:
            collection.delete_many({"_id": to_del})


# Delete data of specific categories
categories = ['Business', 'Casual', 'Lifestyle', 'News & Magazines', 'Role Playing', 'Social', 'Simulation', 'Trivia', 'Productivity']
for category in categories:
    collection.delete_many({"app_category": category})

# Convert to csv file
# newline=" is used to avoid blank row
with open(f"{'scrapy_db'}_{'apkinfo_tt'}.csv", "w", newline="") as csvfileWriter:
    writer = csv.writer(csvfileWriter)
    # Column name written first
    fieldList = [
        "_id",
        "app_id",
        "app_name",
        "app_rate",
        "app_category",
        "app_date",
        "app_description",
    ]
    writer.writerow(fieldList)

    allRecordRes = collection.find()
    for record in allRecordRes:
        # print(f"record = {record}")
        recordValueLst = []
        for field in fieldList:
            if field not in record:
                recordValueLst.append("None")
            else:
                recordValueLst.append(record[field])

        try:
            writer.writerow(recordValueLst)
        except Exception as e:
            print(f"write csv exception. e = {e}")

