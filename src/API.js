import axios from "axios";


export const API = axios.create({
  baseURL:"https://bet24-api.nakshtech.info/",    // Insert or 
})

export const API_Match = axios.create({
  baseURL:"https://battleminey-api.nakshtech.info/",     //  Socket API
})