var url = "mongodb://localhost:27017/scrapy_db";
var db = connect(url);

db.google.aggregate([
    {
        $group: { _id: {app_url: '$app_url', app_name: '$app_name', app_description: '$app_description'}, count:{$sum: 1}, dups: {$addToSet: '$_id'}}
    },
    {
        $match: {count: {$gt: 1}}
    }
]).forEach(function(doc)){
    doc.dups.shift();
    db.google.remove({_id: {$in: doc.dups}})
}