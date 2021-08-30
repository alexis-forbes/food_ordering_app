import React from 'react'; 

//store is a convention name to have the context 
//we create a context where we pass the items array and total amount
//it has 2 functions
//addItem to store and add items
//removeItem receives an id to identify the item which should be removed from cart
//we have to manage the context in a component with usestate or usereduer
//so that context can update and change part of the app


const CartContext = React.createContext({
    items: [], 
    totalAmount: 0, 
    addItem: (item) => {}, 
    removeItem: (id) => {}
})



export default CartContext;