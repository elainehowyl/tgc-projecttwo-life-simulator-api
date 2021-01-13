const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;
// const cors = require('cors');

// router.use(cors());

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let houses = await db.collection('houses').find().toArray();
    res.send(houses)
})

router.get('/:id', async(req,res)=>{
    let houses = await db.collection('houses').findOne({
        '_id':ObjectId(req.params.id)
    })
    res.send(houses)
})

module.exports = router;