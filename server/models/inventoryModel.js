const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'Item should have name'],
        unique:true
    },
    price:{
        type:Number,
        required:[true,'Item should have price']
    },
    quantity:{
        type:Number,
        required:[true,'Item should have quantity']
    }
});
  
const Inventory = mongoose.model('Item', ItemSchema);

module.exports = Inventory;
