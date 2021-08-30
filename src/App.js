import React, { useState } from 'react'; 

import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

//we need to import state because cart has 2 states
//here because it is where cart is being rendered
//initial state false because its for cartIsShown
//setCartIsShown allows us to update the state

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true); 
  }

  const hideCartHandler = () => {
    setCartIsShown(false); 
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}></Cart>}
      <Header onShowCart={showCartHandler}></Header>
        <main>
          <Meals></Meals>
        </main>
    </CartProvider>
  );
}

export default App;
