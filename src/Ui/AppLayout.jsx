import React from 'react'
import Header from "./Header"
import  CartOverView from "../features/Cart/CartOverview"
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader';


export default function AppLayout() {
   const navigation = useNavigation(); 
   const isLoading = navigation.state === "loading" ; 
   


  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
       {isLoading && <Loader/>}

        <Header/>

        <div className="overflow-scroll  scroll-behavior: smooth;">
        <main className="  max-w-9xl  ">

            <Outlet/>
        </main>
        </div>
        <CartOverView />
    </div>
  )
}
