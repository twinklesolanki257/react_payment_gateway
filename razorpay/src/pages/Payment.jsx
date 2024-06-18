import React from 'react'
import { NewPayment } from '../service/payment'
function Payment() {
  const handlePayment=()=>{
    NewPayment(1250)
  }
  return (
    <div>

      <button  onClick={handlePayment}>
        Pay Now
      </button>
             
    </div>
  )
}
export default Payment