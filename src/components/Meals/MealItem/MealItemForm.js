import React, { useRef, useState } from 'react'; 

import classes from './MealItemForm.module.css'; 
import Input from '../../UI/Input';


//to extract the entered amount with refs
//input is a custom component so wee need extra for it to work with ref
//we have to go to the component where we want to receive refs
//input component, import react and wrap the component function
//with React.forwardRef 



const MealItemForm = (props) => {

    //will control wether this form is valid or not
    const [amountIsValid, setAmountIsValid] = useState(true); 

    const amountInputRef = useRef(); 

    const submitHandler = (event) =>{
        event.preventDefault(); 

        //amountInputRef.current will point at the input element stored in the ref
        //every input element has a value prop which holds the current entered value
        //that value is always a string even if input is type number
        //needs conversion (+)
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        //validation checking entered amount as text, trim to remove white space
        //check if no value was entered or if entered amount as number is >1 or <5
        //or even if these conditions are checked with return. 
        //manage state here 

        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5 
        ) {
            setAmountIsValid(false); 
            return; 
        }

        //execute context method to add a cart item 
        //calling a function we expect to get from props
        //to forward the validated enteredAmountNumber
        //we will create this method in MealItem component
        props.onAddToCart(enteredAmountNumber);
    }

    //if input value is false, output an error message 
    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} label="Amount" input={{
                id: "amount", 
                type: "number", 
                min: "1", 
                max: "5", 
                step: "1", 
                defaultValue: "1", 
            }}></Input>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
            
        </form>
    )
}

export default MealItemForm; 