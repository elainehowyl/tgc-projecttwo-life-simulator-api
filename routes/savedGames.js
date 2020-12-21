const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let savedGames = await db.collection('saved_games').find().toArray();
    res.send(savedGames)
})

router.get(':/id', async(req,res)=>{
    let db = MongoUtil.getDB();
    let savedGame = await db.collection('saved_games').findOne({
        '_id':ObjectId(req.params.id)
    })
    res.send(savedGame)
})

router.post('/', async(req,res)=>{
    let db = MongoUtil.getDB();
    let{username, displayname, gender, stats} = req.body;
    let results = await db.collection('saved_games').insertOne({
        username, displayname, gender, stats
    })
    res.send({'inserterdid':results.insertedId})
})

module.exports = router;