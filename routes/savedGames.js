const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;
// const cors = require('cors');

// router.use(cors());

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let savedGames = await db.collection('saved_games').find().toArray();
    res.send(savedGames)
})

router.get('/:username', async(req,res)=>{
    let savedGame = await db.collection('saved_games').findOne({
        'username':req.params.username
    })
    res.send(savedGame)
})

router.post('/', async(req,res)=>{
    let{username, displayname, gender, stats} = req.body;
    let results = await db.collection('saved_games').insertOne({
        username, displayname, gender, stats
    })
    res.send({'inserterdid':results.insertedId})
})

router.patch('/:username', async(req,res)=>{
    let username = req.params.username
    let{health, happiness, money} = req.body
    await db.collection('saved_games').updateOne({
        'username':username
    },
    {
        $set:{
            health,happiness,money
        }
    })
})

// router.patch('/:username', async(req,res) => {
//     let username = req.params.username
// })

// router.patch('/:username', async(req, res) => {
//     let username = req.params.username;
//     let {stats.health, stats.happiness, stats.money}
// })

router.delete('/:username', async(req,res) => {
    await db.collection('saved_games').deleteOne({
        username:req.params.username
    })
})

module.exports = router;