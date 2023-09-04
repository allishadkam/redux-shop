import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';


function App() {
  const showCart = useSelector(state=>state.ui.cartIsvisible)
  const dispatch=useDispatch();
  const cart = useSelector(state=>state.cart)


  useEffect(()=>{
    const handelRequest = async ()=>{

      dispatch(uiActions.shownotification({
      status:"pending",
      title:"sending ...",
      message:"sending cart data ",}))

    const response=await fetch('https://http-test-5cfcc-default-rtdb.firebaseio.com/productCart.json',{method:"PUT",
    body:JSON.stringify(cart)});

      if(!response.ok){
        throw new Error ("something went wrong")
      };

      dispatch(uiActions.shownotification({
        status:"success",
        title:"success!",
        message:"sending cart data successfully ! ",}))



    }


    handelRequest().catch((error)=>{
      dispatch(uiActions.shownotification({
        status:"error",
        title:"Error",
        message:"sending cart data failed !",}))
    })
  },[cart,dispatch])



  return (
    <Layout>
      {showCart&&<Cart />}
      <Products />
    </Layout>
  );
}

export default App;