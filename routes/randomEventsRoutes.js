const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;
// const cors = require('cors');

// router.use(cors());

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let randomEvents = await db.collection('random_events').find().toArray();
    res.send(randomEvents)
})

router.get('/:id', async(req,res)=>{
    let randomEvents = await db.collection('random_events').findOne({
        '_id':ObjectId(req.params.id)
    })
    res.send(randomEvents)
})

module.exports = router;