import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

  function FooterComponent(p: {title: string, item1: string, item2: string, item3: string, item4?: string}) {
      return (
        <div style = {{display: 'flex', flexDirection: 'column', textAlign: 'start'}}>
        <p style = {{fontWeight: 'bold', fontSize: 18}}>{p.title}</p>
        <br />
        <a>{p.item1}</a>
        <br />
        <a>{p.item2}</a>
        <br />
        <a>{p.item3}</a>
        <br />
        <a>{p.item4}</a>
    </div>
      );
  }
export function Footer() {
    return (
        <div style = {{marginTop: 10}}>
            <div style = {{textAlign: 'center'}}>
            <hr className = "footer-line"/>    
            <br /><br />
            <text className = "scandiweb-text">PW App © 2021</text>
            </div>
            <br /> <br />
            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
                <FooterComponent
                 title = "Help" 
                 item1 = "Shipping and returns"
                 item2 = "Contact"
                 item3 = "Digital receipt"
                 item4 = "Cookie preferences"
                 />
                <FooterComponent
                 title = "About us" 
                 item1 = "Join Life"
                 item2 = "Find a store"
                 item3 = "Company"
                 item4 = "Work with us"
                 />
                <FooterComponent
                 title = "Payment methods" 
                 item1 = "Visa"
                 item2 = "Mastercard"
                 item3 = "American Express"
                 />
            </div>
            <br /><br />
        <div className="social-container">
      <h3>Social Follow</h3>
      <a href="https://www.google.com"
        className="youtube social">
        <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a href="https://www.google.com"
        className="facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.google.com" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.google.com"
        className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        </div>
        </div>
    );
}