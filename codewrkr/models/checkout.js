const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    user:String,
    totalPrice:String,
    cart:{
        type:Schema.Types.ObjectId,
        ref:'cart'
    }

});

const Product = mongoose.model('product',productSchema);
module.exports = Product;