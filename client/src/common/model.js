import axios from 'axios';

 /**
  * 配置全局api
  */
 export function fetch (url) {
    return axios.get(url)
 }
 
 export default {
    fetch
 }