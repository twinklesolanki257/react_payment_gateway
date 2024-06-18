const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 4000;
const {
    capturePayment,
    paymentVerify
} = require("./controller/razorpay")

app.use(express.json())

app.use(
    cors({
        origin:"*",
        
    })
)

app.post("/capturePayment" , capturePayment)
app.post("/verifyPayment" , paymentVerify)



// dummy request 
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});


// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});
