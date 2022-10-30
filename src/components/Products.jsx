import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import FilterComponent from "./FiltersComponent";
import SortComponent from "./SortComponent";

const Products = () => {
    const [products, setProducts] = useState([]);
    // const [sortMode, setSortMode] = useState(Cookies.get("sortMode"));
    // sort(sortMode);
    const [currentPage, setCurrentPage] = useState(Cookies.get("page") ? Number(Cookies.get("page")) : 1);

    const [findTitle, setFindTitle] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [fromPrice, setFromPrice] = useState("");
    const [toPrice, setToPrice] = useState("");

    const fetchFilterData = (title, fromDate, toDate, fromPrice, toPrice) => {
        if (title) setFindTitle(title);
        if (fromDate) setFromDate(fromDate);
        if (toDate) setToDate(toDate);
        if (fromPrice) setFromPrice(fromPrice);
        if (toPrice) setToPrice(toPrice);
     }

    const fetchSortData = (data) => {
        setProducts(data);
    }
    
    function logoutHandler(e) {
        Cookies.remove("findTitle"); 
        Cookies.remove("dateFrom");  
        Cookies.remove("dateTo");    
        Cookies.remove("priceFrom"); 
        Cookies.remove("priceTo"); 
        Cookies.remove("page");
        Cookies.remove("token");
        window.location.reload();
    }

    
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://dummy-api.d0.acom.cloud/api/products?page=${currentPage}
                                                             &title=${findTitle}
                                                             &from=${fromDate}&to=${toDate}
                                                             &price_from=${fromPrice}&price_to=${toPrice}`,
            headers: { 'Authorization': 'Bearer ' + Cookies.get("token")}
            })
        .then(function (response) {
            setProducts(response.data.data);
        })
        .catch((err) => {
            console.log(err);
            Cookies.remove("token");
            window.location.reload();
        })
    },
        [currentPage, findTitle, fromDate, toDate, fromPrice, toPrice]
    )


    function goPrevPage() {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        Cookies.set("page", currentPage);
    }
    
    function goNextPage() {
        if (currentPage < 6) setCurrentPage(currentPage + 1);
        Cookies.set("page", currentPage);
    }



    return (
        <div>
            <input className="logout" type="button" value="Log out" onClick={logoutHandler} />
            <h1>Products</h1>

            <SortComponent products={products} fetchSortData={fetchSortData} />
            <FilterComponent fetchFilterData={fetchFilterData} />

            <div className="products">
            {products?.map(product => (
                <div className="product" key={product.id}>
                    <img src={product.thumbnail} alt="" />
                    <span>{product.title}</span>
                    <span>{product.price}</span>
                </div>
            ))}
            </div>


            <div className="pagination">
                <button onClick={goPrevPage}>Prev</button>
                <span>{currentPage}</span>
                <button onClick={goNextPage}>Next</button>
            </div>
        </div>
    )
}

export default Products;