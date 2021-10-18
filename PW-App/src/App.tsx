import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {ProductList} from './pages/products-list';
import {ProductDescription} from './pages/product-description';
import { CartPage } from './pages/cart-page';
import { CartContextProvider } from './hooks/cart-hooks';
import { Login } from './pages/login';
import { Registration } from './pages/registration';
import { CheckOut } from './pages/check-out';
import { LoginContextProvider, useLoginService } from './hooks/login-hooks';
import { ProductContext, useProductService, WomenContextProvider } from './hooks/product-hook';
import { Footer } from './components/Footer';
import { FirstPage } from './pages/first-page';

export const GenderSelection = createContext<{gender?: number | null, setGender(value: number | null): void }>({
  setGender() {}
});
export const CurrencySelection = createContext<{currency?: string, setCurrency(value: string): void}>({
  setCurrency() {}
});
export const TotalAmmount = createContext<{totalAmmount?: number, setTotalAmmount(value: number): void}>({
  setTotalAmmount() {}
});

function App() {
  const [gender, setGender] = useState<number | null>();
  const [currency, setCurrency] = useState<string>();
  const [totalAmmount, setTotalAmmount] = useState<number>();
  if (gender === undefined) {
    localStorage.removeItem("priceFilter");
    localStorage.removeItem("filteredSize");
    localStorage.removeItem("filterByName");
  }

  return (
<Router>
    <div className="App">
    <LoginContextProvider>
      {/* <KidsContextProvider> */}
      {/* <MenContextProvider> */}
      <WomenContextProvider>
      <CurrencySelection.Provider value = {{currency, setCurrency}}>
        <TotalAmmount.Provider value = {{totalAmmount, setTotalAmmount}}>
          <CartContextProvider>
            <GenderSelection.Provider value = {{gender, setGender}}>      
              <Switch>
                <Route exact path = '/'  component = {FirstPage}/>
                <Route path = '/women'  component = {ProductList}/>
                <Route path = '/men'  component = {ProductList}/>
                <Route path = '/kids' component = {ProductList}/>
                <Route path = '/productdescription' component = {ProductDescription}/>
                <Route path ='/cart-page' component = {CartPage}/>
                <Route path = '/login' component = {Login}/>
                <Route path = '/registration' component = {Registration}/>
                <Route path = '/check-out' component = {CheckOut}/>
              </Switch>
            </GenderSelection.Provider>
          </CartContextProvider>
        </TotalAmmount.Provider>
      </CurrencySelection.Provider>
        </WomenContextProvider>
        {/* </MenContextProvider> */}
        {/* </KidsContextProvider> */}
      </LoginContextProvider>
    </div>
    {/* <Footer /> */}
    </Router>
  );
}

export default App;
