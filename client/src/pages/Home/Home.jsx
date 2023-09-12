import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Slider from '../../components/Slider/Slider'
import "./Home.scss"
import useAuth from '../../hooks/useAuth'
import useToken from '../../hooks/useToken'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user} = useAuth()
  const navigate = useNavigate();
  
  useEffect( () => {
    if(!user)
      return navigate("/login")
  }, [navigate]);

  const {payments} = useToken()
  console.log(payments)
  return (
    <div className='home'>
      <Slider/>
      <FeaturedProducts type="featured"/>
      <Categories/>
      <FeaturedProducts type="trending"/>
      <Contact/>
    </div>
  )
}

export default Home;