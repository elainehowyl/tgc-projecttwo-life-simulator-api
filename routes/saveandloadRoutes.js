const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let saveandload = await db.collection('saveandload').find().toArray();
    res.render('saveandload',{
        'saveandloadRecords':saveandload
    })
})

module.exports = router;