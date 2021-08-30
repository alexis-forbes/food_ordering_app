import React, { useReducer } from 'react'; 

import CartContext from './cart-context';

//manages our cart data
//manages the cartcontext data and provide the context
//to all components that want access to it
//RETURN jsx code because it is a component
//props.children allows us to wrap any component that wants acess
//to the context
//we will add the logic of managing this
//we have to add the pointers of what contains


const defaultCartState = {
    items: [],
    totalAmount: 0
};


//reducer is outside of the component so that its not
//re-evaluated every time 
//return a new state snapshot 
const cartReducer = (state, action) => {
    //Add logic to adding a cartitem
    if (action.type === "ADD"){
        //update cart items
        //we want to group amount in items and update price for total aggregated 
        //concat returns a new updated array instead of updating the old array in memory
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount; 
        
        //check if item is already part of the cart before 
        //deriving the updated items
        //findIndex finds the index of an item within an array
        //if the item we are looking at in the array has the same id
        //as the item we are adding with the action will return the index
        //of that item if it exists.
        const existingCartItemIndex = state.items.findIndex((item) => 
        item.id === action.item.id); 

        //get the existing by reaching out to state items and 
        //accessing that index
        //will only work if item exists if not, can't access a not existing item
        //if it exists it will be added to that item
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems; 

        //add and updatedItem variable and an updatedItems variable. 
        //another check where we check if existingcartitem is a thing
        //
        if (existingCartItem) {
            //item will be set to a new object where we copy the existingcart item but we update the amount
            //the amount that was added by the action is added to the existing
            //variable created on the flight as a constant
            const updatedItem = {
                ...existingCartItem, 
                amount: existingCartItem.amount + action.item.amount}
           //items are updated by copying the existing items (updated in a new array)
           updatedItems = [...state.items];
           //for that existing cartitem index we over-write with the updated item
           updatedItems[existingCartItemIndex] = updatedItem; 
        } else {
            //if item is added for the first time
            //its a brand new item where we copy our action item
            updatedItems = state.items.concat(action.item);
        }

        //Return a new state snapshot where we return items
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }; 
    }

    if (action.type === "REMOVE") {

        //if item is already in cart decrease amount per one
        //if length is 1, delete item
        //we start by finding the index of an existing item
        const existingCartItemIndex = state.items.findIndex((item) => 
        item.id === action.id); 

         //Get the item itself by reaching to state.items[index]
         const existingItem = state.items[existingCartItemIndex]; 
         const updatedTotalAmount = state.totalAmount - existingItem.price;
        
         let updatedItems; 

         if (existingItem.amount === 1) {
             //remove item from array
             //filter creates a new array filtering by the following expressions
             //passes a funct executed by every element in the array
             //the funct receives the item
             //we check that all items where the id is not equal to the action id
             //return false
            updatedItems = state.items.filter((item) => item.id !== action.id);
         } else {
             //keep item in array just decrease amount by 1
             //we just update the amount and copy the existingitem
             const updatedItem = { ...existingItem, amount:existingItem.amount - 1 }; 
             //updateditems is a copy of state.items to create a new array with the old items
             updatedItems = [...state.items];
             //we over-write the old item in the array with the updated item which has the updated amount
             updatedItems[existingCartItemIndex] = updatedItem; 
            }

            //return a new state object 
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            }


    }
       
    
    return defaultCartState;
}




const CartProvider = (props) => {

    //use reducer returns 2 arguments
    //1st cartState with state snapshot (array)
    //2nd dispatch funct which allows to dispatch an action to the reducer
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    //Here we get the item that should be added to the cart
    //we also want to check if its part already of the cart
    //in that case update state not add a new item 
    //we will use usereducer because it is a complex state 
    //we will use dispatch action to add or remove items 
    //its up to you what an action is
    //typically an object which has a property that allows you to identify 
    //that action inside of reducer function 
    //we also forward the item to the reducer which we expect to get on the function 
    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
        //we call this add item in mealitemform
    }
    
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });

    
    }

    //state is needed to construct this cartContext object
    const cartContext = {
        items: cartState.items, 
        totalAmount: cartState.totalAmount, 
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

//object cartContext here is added as a value prop

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}



export default CartProvider;