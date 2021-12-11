const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartItem:[{
        type:Schema.Types.ObjectId,
        ref:'addCart'
    }],
    user: {
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    total: Number
});

const Cart = mongoose.model('cart',cartSchema);
module.exports = Cart;