import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 //   cart : [],

 cart:[
  
 ]
};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem(state,action) {

            state.cart.push(action.payload)
        },
        deleteItem(state,action) {
            state.cart = state.cart.filter((item)=>item.pizzaId!==action.payload)
        },
        increaseItemQuantity(state,action) {
            const item  = state.cart.find((item)=>item.pizzaId === action.payload)
            item.quantinty ++;
            item.totalPrice = item.quantinty * item.unitPrice
        },
        dincreaseItemQuantity(state,action) {
            const item  = state.cart.find((item)=>item.pizzaId === action.payload)
            item.quantinty--;
            item.totalPrice = item.quantinty * item.unitPrice
            if(item.quantinty ===0) cartSlice.caseReducers.deleteItem(state,action);
        },
        clearCart(state) {
            state.cart = [];
        },
        

    }


})


export const {addItem,increaseItemQuantity,deleteItem,dincreaseItemQuantity,clearCart}=cartSlice.actions

export default cartSlice.reducer;


export const getTotalCartQuantity =((state)=>state.cart.cart.reduce((sum,item)=>sum + item.quantinty,0)) 

export const getTotalCartPrice =((state)=>state.cart.cart.reduce((sum,item)=>sum + item.totalPrice,0)) 

export const getCart= ((state)=>state.cart.cart)

export const getCurrentQuantityItemById = id =>state=>state.cart.cart.find((item)=>item.pizzaId===id)?.quantinty ?? 0;