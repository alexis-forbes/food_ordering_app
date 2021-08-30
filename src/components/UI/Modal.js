import React, { Fragment } from 'react'; 
import ReactDOM from 'react-dom';

import classes from './Modal.module.css'; 

//we want to use react portal for backdrop (blocking interaction with the back layout of page)
//render modal overlay itself with portal 
//to use the component wherever i want
//but render the actual html elements in an specific tree of the dom (index.html)
//here we will create backdrop & overlay (rendered in index.html)
//for that create 2 separate components in this file (or separate files whatever)
//both receive props because both receive data 


const Backdrop = (props) => {

    return (
        <div className={classes.backdrop} onClick={props.onClose}> 

        </div>
    )
}


const ModalOverlay = (props) => {

    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}
            </div>
        </div>
    )
}

//portal needs to know what to portal & where to portal it
//we should select the div in index 
//as we need it in both, we create a helper const
//Modal will be used to wrap Cart & app.js
//we have to get the on close that we passed above on the jsx
//we have to pass in on Cart component to add this behaviour backdrop

const portalElement = document.getElementById("overlays"); 

const Modal = (props) => {

    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}></Backdrop>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )



}




export default Modal; 