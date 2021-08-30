//responsible for rendering the input

import React from 'react'; 

import classes from './Input.module.css'; 

//spread in input ensures all key value pairs in input
//object which we receive in props.input are added as 
//props to input
//it makes it highly configurable outside this component through the props.input

const Input = React.forwardRef((props, ref) => {

    //use ref inside component function to forward that ref to that input 
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} id={props.input.id} {...props.input}></input>
        </div>
    )
});

export default Input; 