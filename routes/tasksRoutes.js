const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let tasks = await db.collection('tasks').find().toArray();
    res.render('tasks',{
        'tasksRecords':tasks
    })
})

module.exports = router;