import { Fragment, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const showCart = useSelector(state=>state.ui.cartIsvisible)
  const notification = useSelector(state=>state.ui.notification);

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

    if(isInitial){
      isInitial=false;
      return;
    }


    handelRequest().catch((error)=>{
      dispatch(uiActions.shownotification({
        status:"error",
        title:"Error",
        message:"sending cart data failed !",}))
    })
  },[cart,dispatch])



  return (
    <Fragment>
      {notification&&<Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
      {showCart&&<Cart />}
      <Products />
    </Layout>
    </Fragment>
    
  );
}

export default App;