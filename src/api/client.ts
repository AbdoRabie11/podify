import axios from "axios";

const client = axios.create({
  baseURL:'http://localhost:6000'
})


export default client