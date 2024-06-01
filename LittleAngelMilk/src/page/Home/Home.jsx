import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from '../../component/header/Header';
import Footer from '../../component/footer/footer'
import "./Home.css"
export default function Home() {
  return (
    <div className='HomeBody'>
        <Header/>
        <Footer/>
    </div>
  )
}
