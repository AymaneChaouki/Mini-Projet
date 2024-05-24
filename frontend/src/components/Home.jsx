import React from 'react'
import Header from './Header'
import { Outlet } from "react-router"
import Footer from './Footer'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {

  const [books,setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      await axios.get("http://localhost:3000/api/livres")
          .then((response) => {
            setBooks(response.data);
          }).catch((error) => {
            console.log(error)
          })
    }
    fetchBooks();
  },[])
  return (
    <React.Fragment>
      {books.length > 0 && (
        <div className='page-wrapper'>
            <Header />
            <Outlet />
            <Footer/>
        </div>
      )}
        
    </React.Fragment>
  )
}
