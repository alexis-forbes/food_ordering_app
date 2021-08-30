//responsible of bringing the actual list of meals 
//to the screen
//dummy meals data no props needed

import React from 'react'; 
import classes from './AvailableMeals.module.css'; 
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

  //we want to return it to jsx code
  //for every meal we want to return a jsx element
  //which represents this meal item <li></li>

const AvailableMeals = () => {

    const mealsList = DUMMY_MEALS.map((meal) => 
      <MealItem 
      key={meal.id} 
      id={meal.id}
      name={meal.name} 
      description={meal.description} 
      price={meal.price}
      ></MealItem>); 

    return(
        <section className={classes.meals}>
            <Card>
              <ul>
                {mealsList}
              </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals; 