import React, { useContext } from 'react'; 

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import styles from './CartItem.module.css';

//Renders all the cart items in a modal with react portals 
//and displays total amount
//gives us buttons for ordering and leaving the cart

//we need to output the cart items using context 

const Cart = (props) => {

    const cartCtx = useContext(CartContext); 

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; 

    //we want to make sure the order button is only showing up if 
    //we have items in the cart 

    const hasItems = cartCtx.items.length > 0; 

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);

    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })

    }

    //bind ensures that the id to be added/removed item is passed to removehandler
    //we are passing the overall item
    //allows to preconfigure the argument the function will receive
    //when being executed
    const cartItems = (
        <ul className={styles["cart-items"]}>
        {cartCtx.items.map((item) => (
        <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}>
        </CartItem>
        ))}
        </ul>
    ); 

    return(
        <Modal onClose={props.onClose}>
            {cartItems}        
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}

        </div>
        </Modal>


    )
}

export default Cart; 