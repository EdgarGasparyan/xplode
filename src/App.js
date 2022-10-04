import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const App = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const getData = async () => {
    const { data } = await axios.get(
      `https://dummyjson.com/products?limit=100&skip=0`
    );
    setData(data.products);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  const ProductPerPage = 10;
  const pagesVisited = pageNumber * ProductPerPage;
  const pageCount = Math.ceil(data.length / ProductPerPage);

  const displayCard = data
    .slice(pagesVisited, pagesVisited + ProductPerPage)
    .map((product) => {
      return (
        <div className="card">
          <div className="cardImg">
            <img src={product.thumbnail} alt="Image" />
          </div>
          <strong>
            <h3> Brand: {product.brand}</h3>
          </strong>
          <strong>
            <p>Name: {product.title}</p>
          </strong>
        </div>
      );
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="wrapper">
      <div className="productPAGE">{displayCard}</div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

// ?limit=10&skip=10

export default App;
