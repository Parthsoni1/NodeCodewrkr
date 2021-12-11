const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const AddCart = require('../models/addToCart');

module.exports = {
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);

    },
    newUser: async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            const cart = new Cart();
            newUser.cart = cart;
            cart.user = newUser;
            await cart.save();
            await newUser.save();
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    },
    getUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },
    replaceUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = req.body;
        const result = await User.findByIdAndUpdate(userId, user);
        res.status(200).json({ success: true });
    },
    updateUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = req.body;
        const result = await User.findByIdAndUpdate(userId, user);
        res.status(200).json({ success: true });
    },
    getCars: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('product');
        res.status(200).json(user.product)
    },
    newUserCars: async (req, res, next) => {
        const { userId } = req.params;
        const newProduct = new Product(req.body);

        const user = await User.findById(userId);
        newProduct.seller = user;

        await newProduct.save();
        user.product.push(newProduct);
        await user.save();
        res.status(201).json(user);
    },
    newUserAddToCart: async (req, res, next) => {
        const { userId } = req.params;
        const { productId } = req.params;
        const product = await Product.findById(productId);
        const user = await User.findById(userId);
        const isAddCartAvailable = await AddCart.find({ "user": userId });
        if (isAddCartAvailable.length === 0) {
            const newCart = new AddCart(req.body);
            newCart.user = user;
            newCart.product = product;
            const cart = await Cart.find({ "user": userId });
            // cart[0].cartItem.push(newCart);
            console.log('newCart.quantity;',newCart.quantity, 'product.price ', product.price );
            const total = product.price * parseInt(newCart.quantity);
            if(cart[0].total) {
                cartTotal = cart[0].total + total;
            } else {
                cartTotal = total;
            }
            console.log('total  ', total, 'cart', cart);
            Cart.findOneAndUpdate({ "user": userId },{total: cartTotal},
            function (err) {
                console.log('err', err);
            });
            // const cartItemUpdate = await Cart.findOneAndUpdate({ "user": userId },{cartItem: newCart});
            await cart.save();
            await newCart.save();
            // cart[0].cartItem.forEach(e => {
            //     console.log('ee', e);
            // })
            // if() {

            // }
            res.status(201).json(newCart);
        } else {
            const isProductAvail = await AddCart.find({ "product": productId });
            if (isProductAvail.length === 0) {
                const newCart = new AddCart(req.body);
                newCart.user = user;
                newCart.product = product;
                const cart = await Cart.find({ "user": userId });
                cart.cartItem.push(newCart);
                const total = product.price * newCart.quantity;
                cartTotal = cart.total + total;
                Cart.findOneAndUpdate({ "user": userId },{total: cartTotal},
                function (err) {
                    console.log('err', err);
                });
                await newCart.save();
                await cart.save();
                res.status(201).json(newCart);
            } else {
                const incQuantity = isProductAvail[0].quantity + parseInt(req.body.quantity);
                const updatedCart = await AddCart.findOneAndUpdate({ "product": productId },{ quantity: incQuantity} );
                await updatedCart.save();
                res.status(201).json(updatedCart);
            }
        }
        
    },
    newUserProductCart: async (req, res, next) => {
        const { userId } = req.params;
        const { productId } = req.params;

        const newCart = new Cart(req.body);

        const user = await User.find({ 'user': userId });
        newCart.user = user;
        const product = await Product.findById(productId);
        newCart.product = product;
        // await newCart.save();
        // user.product.push(newProduct);
        // await user.save();
        res.status(201).json(newCart);
    }
}