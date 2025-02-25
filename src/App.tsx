import './App.css'
import { useRoutes } from 'react-router-dom'
import Client from './layout/client'
import Home from './components/client/home'
import Admin from './layout/admin'
import ProductsList from './components/client/productsList'
import HomeAdmin from './components/admin/home'
import AddProduct from './components/admin/products/add'
import ListCategory from './components/admin/category/list'
import ListProducts from './components/admin/products/list'
import EditProduct from './components/admin/products/edit'
import AddCategory from './components/admin/category/add'
import EditCategory from './components/admin/category/edit'
import ProductDetail from './components/client/productDetail'
import CategoryPage from './components/client/categoriesList'
import Login from './components/client/login'
import Register from './components/client/register'


function App() {
  const routes = useRoutes([
    {path:'', element:<Client/>, children:[
      {path:'/', element:<Home/>},
      {path:'products', element:<ProductsList/>},
      {path:'products/:id', element:<ProductDetail/>},
      {path:'categories', element:<CategoryPage/>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
    ]},
    {path:'dashboard', element:<Admin/>, children:[
      {path:'', element:<HomeAdmin/>},
      {path:'list-products', element:<ListProducts/>},
      {path:'add-product', element:<AddProduct/>},
      {path:'edit-product/:id', element:<EditProduct/>},
      {path:'list-categories', element:<ListCategory/>},
      {path:'add-category', element:<AddCategory/>},
      {path:'edit-category/:id', element:<EditCategory/>}
    ]}
  ])

  return routes
}

export default App
