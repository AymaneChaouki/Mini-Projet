import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function SearchBooks() {
    const [books,setBooks] = useState([]);
    const {titre} = useParams();   
    useEffect(() => {
      const fetchBooks = async () => {
        await axios.get("http://localhost:3000/api/livres/search/"+`${titre}`)
            .then((response) => {
              setBooks(response.data);
            }).catch((error) => {
              console.log(error)
            })
      }
      fetchBooks();
    },[titre])

  return (
    <React.Fragment>
        <div className="main">
        <div className="bestseller-products bg-light pt-5 pb-5 mb-5">
          <div className="block">
            <div className="block-wrapper ">
              <div className="container">

                <div className="products-container row" data-layout="fitRows">
                  {books.length > 0 && books.map((book, index) => (
                    <div className="product-item col-6 col-md-4 " key={index}>
                      <div className="product product-4">
                        <figure className="product-media">
                          <Link
                              to={`/book/${book._id}`}>
                            <img
                              src="/assets/images/demos/demo-11/products/product-3.jpg"
                              className="product-image"
                            />
                          </Link>
                          <div className="product-action">
                            <Link
                              to={`/book/${book._id}`}
                              className="btn-product btn-quickview"
                              title="Quick view"
                            >
                              <span>Quick View</span>
                            </Link>
                          </div>
                        </figure>

                        <div className="product-body">
                          <h3 className="product-title">
                            <Link
                              to={`/book/${book._id}`}>{book.titre}</Link>
                          </h3>
                          <span>{book.auteur}</span>
                          <div className="product-price">
                            <span className="new-price">{book.description}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}
