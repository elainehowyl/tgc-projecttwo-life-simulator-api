const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;
// const cors = require('cors');

// router.use(cors());

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let users = await db.collection('users').find().toArray();
    res.send(users)
})

router.get('/:username', async(req,res)=>{
    let user = await db.collection('users').findOne({
        'username':req.params.username
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


router.delete('/:username', async(req,res) => {
    await db.collection('users').deleteOne({
        username:req.params.username
    })
    res.send({
        'status':'OK'
    })
})


module.exports = router;