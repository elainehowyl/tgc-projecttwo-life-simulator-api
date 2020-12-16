const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let users = await db.collection('users').find().toArray();
    res.render('users',{
        'usersRecords':users
    })
})

module.exports = router;