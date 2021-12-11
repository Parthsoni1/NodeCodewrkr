const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addCartschema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'product'
    },
    quantity:Number
});

const AddCart = mongoose.model('addCart',addCartschema);
module.exports = AddCart;