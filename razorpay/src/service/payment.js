import axios from "axios"

const axiosInstance = axios.create({})

const apiConnector = (ourMethod,url,bodyData,headers,params)=>{
    return axiosInstance({
        method: ourMethod,
        url: url,
        data :bodyData ? bodyData : null,
        headers :headers ? headers : null,
        params :params ? params : null
    })
}


// Load the Razorpay SDK from the CDN
function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

export async function NewPayment(
    payment
){try {
    
    const response =  await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!response){
        console.log(" SDK failed to load check your net ")
        return
    }

    const orderResponse = await apiConnector(
        "POST",
        "http://localhost:4000/capturePayment",
        {
            payment
        }
    )

    if(!orderResponse.data.success){
        throw new Error(orderResponse.data.message)
    }



    const options = {
        key : "rzp_test_FxBtjItP2u7E8r",
        currency : orderResponse.data.data.currency,
        amount :orderResponse.data.data.amount,
        order_id : orderResponse.data.data.id,
        name:"mahi Techno",

        handler:function(response){
            verifyPayment({ response})
        }
    }

    const paymentObject =  new window.Razorpay(options)

    paymentObject.open()
    paymentObject.on("payment failed", function (response){
        console.log(response.Error)
    })
} catch (error) {
    console.log("PAYMENT KARNE ME DIKKAT HAI",error)
}

}


async function verifyPayment(bodyData){
    try {
        const response = await apiConnector("POST","http://localhost:4000/verifyPayment" ,bodyData)

        console.log("BACKEND RESPONSE VERIFY PAYMENT", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log("Payment succesfull")
        
    } catch (error) {
        console.log(error)
        
    }
}