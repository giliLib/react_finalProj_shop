import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ProductList from './pages/ProductList';
import AddUserSignUpForm from './pages/AddUserSignUpForm';
import Login from './pages/Login';
import { login } from './api/userServise';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import CheckOut from './pages/CheckOut';
import ProductDetails from './components/ProductDetails';
import ProductCartList from '../src/pages/ProductCartList'
import PrivateRoute from './components/PrivateRoute';
import AddProductManager from './pages/AddProductManager';
import HomePage from './pages/HomePage';
import { useDispatch } from 'react-redux';
import { userIn } from './features/userSlice';
import EditProduct from './pages/EditProduct';

function App() {

  let dispatch = useDispatch();
  useEffect(() => {

    let u = localStorage.getItem("currentUser")
    if (u) {
      u = JSON.parse(u);
      dispatch(userIn(u))
    }

  })



  return (
    <>

      <NavBar />
      <Routes>
        <Route path='Login' element={<Login />} />
        <Route path='AddProductManager' element={<AddProductManager />} />
        <Route path='AddUserSignUpForm' element={<AddUserSignUpForm />} />
        <Route path='EditProduct/:id' element={<EditProduct />} />

        <Route path="/ProductList" element={<ProductList />}>
          <Route path="ProductDetails/:id" element={<ProductDetails />} />
        </Route>
        <Route path='CheckOut' element={<PrivateRoute role="USER" >
          <CheckOut />
        </PrivateRoute>} />
        <Route path='ProductCartList' element={<ProductCartList />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
