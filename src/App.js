import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';


function App() {
  const showCart = useSelector(state=>state.ui.cartIsvisible)
  const cart = useSelector(state=>state.cart)
  useEffect(()=>{
    fetch('https://http-test-5cfcc-default-rtdb.firebaseio.com/productCart.json',{method:"PUT",
  body:JSON.stringify(cart)});
  },[cart])
  return (
    <Layout>
      {showCart&&<Cart />}
      <Products />
    </Layout>
  );
}

export default App;