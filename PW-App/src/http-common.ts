import axios from "axios";

export default axios.create({
  baseURL: "https://pwbackendpw.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    
  }
});