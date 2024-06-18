import React from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Home from './Home';
import Layout from './Layout';
import Payment from './pages/Payment';
// import Payment from './pages/Payment';
// import Home2 from './Home2';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/payment' element={<Payment/>}/>
            {/* <Route index element={<Home2/>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App;