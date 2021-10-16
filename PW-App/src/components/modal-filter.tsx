import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { GenderSelection } from '../App';
import { useProductService } from '../hooks/product-hook';
import { Women } from '../models/women-model';

  export const ModalFilter = (p: { show:boolean, close: () => void }) => {

    const [size, setSize] = useState<number>();
    const sizes = ["XS","S","M","L","XL"];
    const [filter, setFilter] = useState<number>();
    const filters = ["DRESSES","JEANS","SHIRTS", "T-SHIRTS", "PULLOVERS","JACKETS", "TROUSERS"];
    const filtersFromDatabase = ["Dress", "Jeans", "Shirt", "T-Shirt", "Pullover", "Jacket", "Trousers"];
    const {womenDataById, womenData, setWomenData } = useProductService();
    const { gender, setGender} = useContext(GenderSelection);
    const [value, setValue] = React.useState<number[]>([0, 1000]);

    const handleChange = (event: Event, value: number | number[]) => {
      setValue(value as number[]);
      localStorage.setItem("priceFilter", JSON.stringify(value));
    };

    // PROBLEME LA PRICE FILTER - DACA RAMANE UN SINGUR ELEMENT IN ARRAY, VINE UNDEFINED.
    function getMax() {
      let splicedArray: Women[] = [];
      if (gender === undefined || gender === null) {
        splicedArray = womenData;
      } else {
        splicedArray = womenData.filter(item => item.gender === gender)
      }
      let max;

      if (splicedArray.length === 0) {
        max = 1000;
      } else {
        max = parseInt(splicedArray[0].price);
      }
      for (let i = 1; i < splicedArray.length; ++i) {
        if (parseInt(splicedArray[i].price) > max) {
          max = parseInt(splicedArray[i].price);
        }
      }
      return max;
    }
  //   function minMax(items) {
  //     return items.reduce((acc: number, val) => {
  //         parseInt(acc[0].price) = ( acc[0] === undefined || val < acc[0] ) ? val : acc[0]
  //         acc[1] = ( acc[1] === undefined || val > acc[1] ) ? val : acc[1]
  //         return acc;
  //     }, []);
  // }
    function getMin() {
      let splicedArray: Women[] = [];
      if (gender === undefined || gender === null) {
        splicedArray = womenData;
      } else {
        splicedArray = womenData.filter(item => item.gender === gender)
      }
      let min;
      if (splicedArray.length === 0) {
        min = 0;
      } else {
        min = parseInt(splicedArray[0].price);
      }
      for (let i = 1; i < splicedArray.length; ++i) {
        if (parseInt(splicedArray[i].price) < min) {
          min = parseInt(splicedArray[i].price);
        }
      }
      // setValue([min, getMax()])
      return min;
      // for (let i=0; i<womenData.length;i++) {
        // console.log(Math.min(...womenData.map(item => parseInt(item.price))))
        // return Math.min(...womenData.map(item => parseInt(item.price)));
      // }
    }

    useEffect(() => {
      // min = Math.min(...womenData.map(item => parseInt(item.price)))
    }, [value])

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
            <h4>CHARACTERISTICS
                <br/><br/>
                {filters.map((filterItem, index) => <><Button variant = "text" style = {filter === index ? {fontWeight: 'bold'} : {}} onClick = {() => {
                  let selectedFilter = index;
                  const filteredByName = womenData.filter(womenItem => womenItem.name === filtersFromDatabase[index]);
                  if (filter === index) {
                    setFilter(undefined);
                    selectedFilter = 7;
                  } else {
                    setFilter(index);
                  }
                  if (selectedFilter === 7) {
                    localStorage.setItem("filterByName", JSON.stringify(womenData))
                  } else {
                    localStorage.setItem("filterByName", JSON.stringify(filteredByName))
                  }
                }} >
                    {filterItem}
                </Button><br /></>)}
                </h4>
            <br/><br/>
            <p style = {{fontWeight: 'bold', color: 'black'}}>SIZES
            </p><br/>
            {sizes.map((item, index) => <Button variant = "outlined" onClick = {() => {
              let selectedSize = index;
              const arrayOfNumberOfProducts = womenData.map(item => item.noProducts.split(","))
              let arr:Women[] = [];
              for (let i=0; i < arrayOfNumberOfProducts.length; i++) {
                if (parseInt(arrayOfNumberOfProducts[i][selectedSize]) > 0) {
                  arr.push(womenData[i]);
                }
              }
              if (size === index) {
                setSize(undefined);
                selectedSize = 5;
              } else {
                setSize(index);
              }
              if (selectedSize === 5) {
                localStorage.setItem("filteredSize", JSON.stringify(womenData));
              } else {
                localStorage.setItem("filteredSize", JSON.stringify(arr));
              }
              
              // setWomenData([...arr]);
            }} style = {size === index ? {backgroundColor: 'black', color: 'white', fontSize: 12, maxWidth: 40, minWidth: 40} : {fontSize: 12, maxWidth: 40, minWidth: 40}}>{item}</Button>) }
            <br/><br/>
            <p style = {{ fontWeight: 'bold', color: 'black'} }>PRICE</p>
            <br />
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value}
              style = {gender === 0 || gender === undefined || gender === null ? {width: 280, color: 'pink'} : gender === 1 ? {width: 280, color: 'blue'} : gender === 2 ? {width: 280, color: 'orange'} : {}}
              onChange={handleChange}
              // step = {50}
              size = "small"
              min = {getMin()}
              max = {getMax()}
              valueLabelDisplay="auto"
              disableSwap
              // getAriaValueText={valuetext}
            />
          </div>
        </div>
      </div>
    )
  };
