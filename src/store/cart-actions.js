import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";




export const fetchCartData = () => {
    return  async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://http-test-5cfcc-default-rtdb.firebaseio.com/productCart.json');
            

            if (!response.ok) {
                throw new Error ("can not fetch data  !")
            }
            
            const data = await response.json();
            return data;
        }   
        
        try{
            const cartData = await fetchData()
            dispatch(uiActions.shownotification({
                status:"success",
                title:"success!",
                message:"fetching cart data successfully ! ",}))
            dispatch(cartActions.replaceCart({items: cartData.items||[],
            totalQuantity:cartData.totalQuantity}))
        }catch{
            dispatch(uiActions.shownotification({
                status:"error",
                title:"Error",
                message:"fetching cart data failed !",}))
        }
    }

}


export const sendCartData = (cart)=>{
    return async(dispatch)=>{
      dispatch(uiActions.shownotification({
        status:"pending",
        title:"sending ...",
        message:"sending cart data ",}))
  
  
        const sendRequest=async()=>{
          const response=await fetch('https://http-test-5cfcc-default-rtdb.firebaseio.com/productCart.json',{method:"PUT",
           body:JSON.stringify({
            items:cart.items,
            totalQuantity : cart.totalQuantity,
           })});
  
          if(!response.ok){
          throw new Error ("sending cart data failed !")
        };
        }
  
        try{
           await sendRequest()
           dispatch(uiActions.shownotification({
            status:"success",
            title:"success!",
            message:"sending cart data successfully ! ",}))
        }catch{
          dispatch(uiActions.shownotification({
            status:"error",
            title:"Error",
            message:"sending cart data failed !",}))
        }
        
  
        
  
  
  
      }
    }