const Order = require('../models/order')

exports.getOrders = async (req, res, next) => {
    try {
        const orders = Order.find();

        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (err) {
        res.status(404).json({
            success: false
        })
    }
    
}

exports.getOrder = async (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Get orders by id'
    })
}

exports.createOrder = async (req, res, next) => {
    try {
        // const { orderNumber, userName, foods } = req.body;

        // // Create the order with the extracted data
        // const createdOrder = await Order.create({
        //     orderNumber,
        //     userName,
        //     foods,
        // });
        const createdOrder = Order.create(req.body);
        res.status(200).json({
            success: true,
            data: createdOrder
        })
        console.log(`create success fully`);
    } catch (err){
        res.status(404).json({
            success: false
        })
        console.log(err);
    }
    
}

exports.updateOrder = async (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'update order'
    })
}

exports.deleteOrder = async (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'delete order'
    })
}