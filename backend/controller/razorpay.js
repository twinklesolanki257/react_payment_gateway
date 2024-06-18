const { instance } = require("../config/razorpay")
const crypto = require('crypto')

const capturePayment = async (req, res) => {
    try {
        const { payment } = req.body;

        if (payment === 0) {
            return res.json({
                success: false,

            })
        }
        const option = {
            amount: payment * 100,
            currency: "INR",
        }
        try {

            const paymentResponse = await instance.orders.create(option)

            console.log(paymentResponse)

            res.json({
                success: true,
                data: paymentResponse

            })

        } catch (error) {
            console.log(error)
            res.status(500)
                .json({
                    success: false,
                    message: "pese nhi hai ni kruga payment"
                })
        }

    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                success: false,
                message: "pese nhi hai ni kruga payment"
            })
    }
}

const paymentVerify = async(req,res)=>{
    try {
        const order_id = req.body?.razorpay_order_id;
        const payment_id = req.body?.razorpay_payment_id;
        const signature_id = req.body?.razorpay_signature_id;

const body = order_id + "|" + payment_id
        const verifySignature = crypto.createHmac("sha256", "IYyPjkA6FD75rHTtOjtFGlCN").update(body.toString()).digest("hex")

        if(verifySignature ===signature_id ){

           return res.status(200).json({
                success:true,
                message:"aagye pese"
            })
        }else {
            return res.status(403).json({
                success:false,
                message:"nahi aaye pese"
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"kuch gadbadi hai daya"
        })
    }
}

module.exports ={
    capturePayment,
    paymentVerify
}