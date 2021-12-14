import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { Product } from "../interfaces/product";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [msg, setMsg] = useState("");
  const [inputValue, setInputValue] = useState("");





  const handleUserInput = (e:any) => {
    setInputValue(e.target.value);
  };



  const searchKey = async (key: string) => {
    console.log("aaaa", key);

    if (!!key) {
      //  setMsg("")
      const response = await fetch(
        `http://localhost:8000/api/products/find?title=${key}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      data.length === 0 ? setMsg("sorry no data") : setMsg("");
      setProducts(data);
    } else {
      setMsg("enter a value");
    }
  };

  const getData = async () => {
    const response = await fetch("http://localhost:8000/api/products");

    const data = await response.json();

    setProducts(data);
  };

  const reset = () => {
    getData();
    setMsg("");
    setInputValue("");
  };

  const del = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((p: Product) => p.id !== id));
    }
  };

  useEffect(() => {
    getData();

    // searchKey("Hello")
  }, []); 

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link
            to="/admin/products/create"
            className="btn btn-sm btn-outline-secondary"
          >
            Add
          </Link>
        </div>
      </div>
      {!!msg && <p> {msg} </p>}
      {searchTerm}
   

<input type="text" value={inputValue} onChange={handleUserInput} /> 

      <button onClick={() => searchKey(inputValue)}>search</button>
      <button onClick={() => reset()}>reset</button>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product) => {
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img src={p.image} height="180" alt="descrip" />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.likes}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/admin/products/${p.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <a
                        href=""
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(p.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Products;
