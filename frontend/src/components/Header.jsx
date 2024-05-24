/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if(search.trim() !== ""){
      navigate(`/search/${search}`)
    }
  }
  return (
    <React.Fragment>
      <header className="header header-12">
        <div className="header-middle">
          <div className="container">
            <div className="header-left">
              <Link to={"/"} className="logo">
                <img
                  src="/assets/images/demos/demo-20/logo.png"
                  alt="Molla Logo"
                  width="105"
                  height="25"
                />
              </Link>
            </div>

            <div className="header-right">
              <div className="header-search header-search-extended header-search-visible header-search-no-radius">
                <a href="#" className="search-toggle" role="button">
                  <i className="icon-search"></i>
                </a>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="header-search-wrapper search-wrapper-wide">
                    <label htmlFor="q" className="sr-only">
                      Search
                    </label>
                    <input
                      type="search"
                      className="form-control"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      name="q"
                      id="q"
                      placeholder="Search product ..."
                      required
                    />
                    <button className="btn btn-primary" type="submit">
                      <i className="icon-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
