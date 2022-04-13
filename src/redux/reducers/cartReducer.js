import {client} from '../../api/client';
import axios from "axios";

const initialState = {
  productIds: [],
  _id: "",
  userId: "",
  userEmail: "",
  productDetails: [],
  __v: 0,
  subTotalPrice: 0,
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      return { ...state, ...action.payload };
    case "GET_CART":
      return action.payload;
    default:
      return state;
    }
  };
  export default cartReducer;

export function addProductToCart(cartData) {
  // const payload={
  //   "productIds": cartData.productIds,
  //   "_id": state._id,
  //   "productDetails": cartData.productDetails
  // }
  // return async function saveNewTodoThunk(dispatch, getState) {
  //   const response = await client.post('/updateCart', { cart: payload },headers)
  //   dispatch({ type: 'UPDATE_CART', payload: response.cart })
  // }
}

export const getCartProducts=(headers)=> {
  // return async function getCartThunk(dispatch, getState){
    //   const response = await client.get('/getCart',headers);
    // }
    
    return async dispatch => {
      try {
        const response = await client.get('/getCart',headers);
      dispatch({ type: 'GET_CART', payload: response.cart })
    } catch (error) {
      console.log(" getCartProducts",error);
      
    }
  }
}
// if (userToken) {
 
//   axios({
//     url: `${url}/getCart`,
//     method: "GET",
//     headers: headers,
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         console.log("list", res.data.cart.productDetails);
//         setCartProducts(res.data.cart.productDetails);
//         dispatch({type:'UPDATE_CART',payload:res.data.cart});
//       }
//     })
//     .catch((err) => console.log("error", err));
// }


