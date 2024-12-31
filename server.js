const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors")
const Razorpay = require("razorpay");
const app = express();

const port = 4000

app.use(cors())
app.use(express.json());

const razorpay = new Razorpay({
    key_id: "rzp_live_Almm3nJiaFXj9e",
    key_secret: "LYrix53hV04e3ZMZj8WTKNQi"
})

app.get("/", async (req,res)=>{
    res.send("Hello world");
})

app.post("/order-create", async(req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt${Date.now()}`
    }

    try {
        const order = await razorpay.orders.create(options);
        res.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            receipt: order.receipt
        })
    }
    catch (err) {
        res.json({ message: "Order not create", error: err });
    }
})

app.listen(port, () => {
    console.log(`Port is listen on localhost:${port}`)
})