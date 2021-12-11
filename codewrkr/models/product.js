const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    make:String,
    model:String,
    year:String,
    price:String,
    seller: {
        type:Schema.Types.ObjectId,
        ref:'users'
    }
});

const Product = mongoose.model('product',productSchema);
module.exports = Product;