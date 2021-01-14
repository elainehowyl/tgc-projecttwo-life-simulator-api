const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;
// const cors = require('cors');

// router.use(cors());

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let rewards = await db.collection('milestone_rewards').find().toArray();
    res.send(rewards)
})

router.get('/:id', async(req,res)=>{
    let reward = await db.collection('milestone_rewards').findOne({
        '_id':ObjectId(req.params.id)
    })
    res.send(reward)
})

module.exports = router;