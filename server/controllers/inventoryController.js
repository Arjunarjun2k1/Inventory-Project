const Item = require('../models/inventoryModel')

module.exports.createItem = async(req,res)=>{
    try{
        let newtask = await Item.create(req.body)
        res.status(200).json({
            status:'success',
            message:'Item added successfully'
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message:err.message
        })
    }
}

module.exports.getItem = async(req,res)=>{
    try{
        let item = await Item.find()
        res.status(200).json({
            status:'success',
            item:[...item]
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message:err.message
        })
    }
}
