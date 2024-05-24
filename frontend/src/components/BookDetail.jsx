import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export default function BookDetail() {
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  const [formData,setFormData] = useState({
    email:"",
    name:"",
    prenom:"",
    dateDebut:"",
    dateRetour:"",
  })

  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      await axios
        .get(`http://localhost:3000/api/livres/${id}`)
        .then((response) => {
          setBook(response.data);
        })
        .catch(() => {
          navigate("/");
        });
    };
    fetchBook();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const onSubmit= async(e)=>{
    e.preventDefault();
    if(formData.email.trim() === "" || formData.name.trim() === "" || formData.prenom.trim() === "" || formData.dateDebut.trim() === "" || formData.dateRetour.trim() === ""){
      alert("Veuillez remplir tous les champs")
    }else{
      const client = {
        email:formData.email,
        name:formData.name,
        prenom:formData.prenom
      }
      await axios.post("http://localhost:3000/api/client",client)
        .then(async(response) => {
          const data = {
            dateDebut:formData.dateDebut,
            dateRetour:formData.dateRetour,
            clientId:response.data._id,
            bookId: book._id
          }
          await axios.post("http://localhost:3000/api/emprunt",data)
            .then(() => {
              alert("Emprunt effectue avec succes")
              navigate("/")
            }).catch((error) => {
              console.log(error)
            })
        })
    }
  }

  return (
    <React.Fragment>
      {book && (
        <div className="main">
          <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
            <div className="container d-flex align-items-center">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Books</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {book.titre}
                </li>
              </ol>
            </div>
          </nav>

          <div className="page-content">
            <div className="container">
              <div className="product-details-top mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <div className="product-gallery product-gallery-vertical">
                      <div className="row">
                        <figure className="product-main-image">
                          <img
                            id="product-zoom"
                            src="/assets/images/products/single/centered/1.jpg"
                            data-zoom-image="/assets/images/products/single/centered/1-big.jpg"
                            alt="product image"
                          />

                          <a
                            href="#"
                            id="btn-product-gallery"
                            className="btn-product-gallery"
                          >
                            <i className="icon-arrows"></i>
                          </a>
                        </figure>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="product-details product-details-centered">
                      <h1 className="product-title">{book.titre}</h1>
                      <div className="product-price">{book.auteur}</div>

                      <div className="product-content">
                        <p>{book.description}</p>
                      </div>

                      <div className="product-details-action">
                        <div className="details-action-col">
                          <form id="dateRangeForm" onSubmit={(e) => onSubmit(e)}>
                            <div>
                              <label htmlFor="email">Email:</label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                                className="form-control"
                                required
                              />
                              <label htmlFor="nom">Nom:</label>
                              <input
                                type="text"
                                id="nom"
                                value={formData.name}
                                onChange={(e) => handleChange(e)}
                                name="nom"
                                className="form-control"
                                required
                              />
                              <label htmlFor="prenom">Prenom:</label>
                              <input
                                type="text"
                                id="prenom"
                                value={formData.prenom}
                                onChange={(e) => handleChange(e)}
                                name="prenom"
                                className="form-control"
                                required
                              />

                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <div>
                                <label htmlFor="dateDebut">Date Début:</label>
                                <input
                                  type="date"
                                  id="dateDebut"
                                  value={formData.dateDebut}
                                  onChange={(e) => handleChange(e)}
                                  name="dateDebut"
                                  className="form-control"
                                  required
                                />
                              </div>

                              <div>
                                <label htmlFor="dateRetour">Date Retour:</label>
                                <input
                                  type="date"
                                  id="dateRetour"
                                  value={formData.dateRetour}
                                  onChange={(e) => handleChange(e)}
                                  className="form-control"
                                  name="dateRetour"
                                  required
                                />
                              </div>
                            </div>

                            <input type="submit" value="Reserve it" className="btn btn-primary" />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
