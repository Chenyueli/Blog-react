/**
 *  路由配置
 */
import Home from '../containers/home';
import {  About, Topics } from '../containers/component';
const router = [
  { path:'/', component: Home, exact: true },
  { path:'/about', component: About },
  { path:'/topics', component: Topics },
];

export default router;