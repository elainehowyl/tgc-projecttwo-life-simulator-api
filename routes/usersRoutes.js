const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let users = await db.collection('users').find().toArray();
    res.send(users)
})

router.get('/:id', async(req,res)=>{
    let db = MongoUtil.getDB();
    let user = await db.collection('users').findOne({
        '_id':ObjectId(req.params.id)
    })
    res.send(user)
})

router.post('/', async(req,res)=>{
    let db = MongoUtil.getDB();
    let{
        username, password, email, displayname, gender
    } = req.body;
    let results = await db.collection('users').insertOne({
        username, password, email, displayname, gender
    })
    res.send({'inserterdid':results.insertedId})
})


module.exports = router;