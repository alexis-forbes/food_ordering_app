import React from 'react'; 

import classes from './Card.module.css';


//props.children so that whatever is passed between
//the closing tag of Card component is used inside of this Card

const Card = (props) => {
    return (
        <div className={classes.card}>{props.children}</div>
    )
}

export default Card; 