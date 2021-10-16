import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrencySelection, TotalAmmount } from '../App';
import { useCartService } from '../hooks/cart-hooks';
import './styles.scss';

  export const Modal = (p: { show:boolean, close: () => void }) => {
    const { bagItems, setBagItems, selectedCurrencySymbol, getCurrencySymbol, rerenderTotal } = useCartService();
    const { totalAmmount, setTotalAmmount } = useContext(TotalAmmount);
    const { currency, setCurrency } = useContext(CurrencySelection);

    useEffect(() => {
      const bag = localStorage.getItem("bag");
      if (bag !== null) {
          setBagItems(JSON.parse(bag));
      }
      const currency = localStorage.getItem("currency");
      if (currency !== null) {
        setCurrency(currency);
      }
      const total = localStorage.getItem("total");
      if (total !== null) {
        if (currency === "0" || currency === undefined) {
          setTotalAmmount(parseInt(parseInt(total).toFixed(2)));
        } else if (currency === "1") {
          setTotalAmmount(parseInt((parseInt(total) / 1.16).toFixed(2)));
        } else if (currency === "2") {
          setTotalAmmount(parseInt((parseInt(total) / 1.36).toFixed(2)));
        }
      }
      getCurrencySymbol();
  }, [currency, rerenderTotal])

    return (
      <div className="modal-wrapper"
        style={{
          transform: p.show ? 'translateY(0vh)' : 'translateY(-100vh)',
          opacity: p.show ? '1' : '0'
        }}
      >
        <div className="modal-header">
          {/* <p>Welcome To Our Site</p> */}
          {/* <span onClick={p.close} className="close-modal-btn">x</span> */}
        </div>
        <div className="modal-content">
          <div className="modal-body">
            <h4>My Bag, {bagItems.length} items</h4>
            <br/><br/>
          </div>
          {bagItems.slice(0,2).map(item => 
          <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div style = {{textAlign: 'start'}}>
              <text style = {{width: 100}}><strong>Name: </strong>{item.name}</text>
              <br />
              <text style = {{width: 100}}><strong>Price: </strong>{currency === "0" || currency === undefined ? item.price : currency === "1" ? parseInt((parseInt(item.price) / 1.16).toFixed(2)) : currency === "2" ? parseInt((parseInt(item.price) / 1.36).toFixed(2)) : ""} {selectedCurrencySymbol}</text>
              <br />
              <text><strong>Size: </strong>{item.sizes === undefined ? "" : item.sizes![item.sizeIndex]}</text>
              <br /> <br/> <br/><br /> <br/> <br/><br/>
            </div>
            <text>IMAGE</text>
          </div>
          )}
          <div className="modal-footer">
              <p style = {{display: 'flex', flex: 'start', position: 'absolute', top: 420}}><strong>Total:</strong></p>
              <p style = {{position: 'absolute', left: 200, bottom: 60, fontWeight: 'bold'}}>{totalAmmount} {selectedCurrencySymbol}</p>
            <Button style = {{top: 40}} variant = "outlined" className="btn-cancel">
              <Link style = {{textDecoration: 'none', color: 'black'}} to = "/cart-page">  View Bag </Link>
            </Button>
            <Button style = {{position: 'absolute', left: 200, bottom: 10,  background: 'rgb(0,152,0)'}}variant = "text" className="btn-cancel">
              <Link style = {{textDecoration: 'none', color: 'black'}} to = '/check-out'>
              Check out
              </Link></Button>
          </div>
        </div>
      </div>
    )
  };
