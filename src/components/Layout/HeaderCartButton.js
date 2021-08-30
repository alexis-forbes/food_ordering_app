import React, { useContext, useEffect, useState } from 'react'; 

import classes from './HeaderCartButton.module.css'; 
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';


//we need the context not the provider
//header will be re-evaluated by react whenever context changes 
//by using context  
//it changes when we update it in the cartprovider
//we need to stablish that connection
//reduce allows us to transform an array of data into a single number or value
//helps us not add 3 items of one kind but one kind to the cart with amount 3
//curNumber is a value that is carried on through executions 
//initially is 0 but it changes after the first time the funct is executed
//it will be the result returned after that exec

const HeaderCartButton = (props) => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false); 

    const cartCtx = useContext(CartContext); 

    //using object destructuring to pull out the items out of cart 
    //so that we can only refer and pass items not context
    //otherwise it would be called for every object
    const { items } = cartCtx; 


    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0); 

    



    //adding keyframe animation to button 
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;
    //we will use useEffect to make the button bump conditionally 
    //it is a sideEffect of clicking the add button
    //it takes a function and an array of dependencies
    //also using useState to re-evaluate adding time and re-render the component
    //when animation classes is added conditionally
    useEffect(() => {
        //we only want to highlight if at least is one item in the cart
        if (items.length === 0) {
            return; 
        } 
        setBtnIsHighlighted(true); 
        //remove the class after animation is finished 
        //to make it bump several times
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false); 
        }, 300); 

        //clean up timer (sideEffect) in case component should be removed
        //if we return a funct in useEffect react automatically calls it as a clean up funct
        //after we add an item & trigger bump, we clean up the funct 
        return () => {
            clearTimeout(timer); 
        }
    }, [items]); 



    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}
export default HeaderCartButton; 