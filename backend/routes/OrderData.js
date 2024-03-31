const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')

router.post('/orderData', async (req, res) => {

    let data = req.body.order_data;
    await data.splice(0, 0, { order_id: req.body.order_id, order_date: req.body.order_date })

    let emailId = await Order.findOne({ 'email': req.body.email })

    if (emailId === null) {
        try {

            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })

        } catch (error) {
            res.send({ "error": error })
        }
    } else {

        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } })
                .then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            res.send({ "error": error })
        }
    }

})

router.post('/myOrderData', async (req, res) => {

    try {
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData: myData})
        
    } catch (error) {
        res.json({"error":error})
    }

})

module.exports = router;