/**
 * 返回一个基本的App
 */
import React from 'React';
import { Route, Link } from 'react-router-dom';
import router from './router/route';
import './assets/main.less';

import mock  from '../../mock'

const configRoute = (router)=> {
  return (
     <div>
      {
          router.map((route,index) =>(
            <Route key= { index + 'route-render'} path={ route.path } exact={route.exact ? route.exact: false } component={route.component}  />
          ))
      }
    </div>
  )

} 
const BasicExample = () => (
    <div className="app-container">
      {/* <img src={ imageSrc } /> */}
      <div>
      <ul>
        <li><Link to="/">Home222</Link></li>
        <li><Link to="/about">About2323</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      <hr/>
      {
        configRoute(router)
      }
     </div>
   </div>
)
export default BasicExample;