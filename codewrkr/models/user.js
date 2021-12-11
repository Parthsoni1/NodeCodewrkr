const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    product: [{
        type:Schema.Types.ObjectId,
        ref:'product'
    }],
    cart:{
        type:Schema.Types.ObjectId,
        ref:'cart'
    }
});

const User = mongoose.model('user',userSchema);
module.exports = User;