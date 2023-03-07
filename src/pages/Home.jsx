import React, { useEffect, useState } from 'react'
import PlacesForRent from '../components/PlacesForRent'
import PlacesForSale from '../components/PlacesForSale'
import RecentOffers from '../components/RecentOffers'
import Slider from '../components/Slider'


const Home = () => {
   
  return (
    <>
        <Slider/>
        <RecentOffers/>
        <PlacesForRent/>
        <PlacesForSale/>
    </>
  )
}

export default Home