import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [sortMode, setSortMode] = useState(Cookies.get("sortMode"));
    const [currentPage, setCurrentPage] = useState(Cookies.get("page") ? Number(Cookies.get("page")) : 1);
    sort(sortMode);
    
    const [findTitle, setFindTitle] = useState(Cookies.get("findTitle") ? Cookies.get("findTitle") : "");
    const [dateFrom, setDateFrom] = useState(Cookies.get("dateFrom") ? Cookies.get("dateFrom") : "");
    const [dateTo, setDateTo] = useState(Cookies.get("dateTo") ? Cookies.get("dateTo") : "");
    const [priceFrom, setPriceFrom] = useState(Cookies.get("priceFrom") ? Cookies.get("priceFrom") : "");
    const [priceTo, setPriceTo] = useState(Cookies.get("priceTo") ? Cookies.get("priceTo") : "");

    function findTitleHandler(e) {
        setFindTitle(e.target.value);
        Cookies.set("findTitle", e.target.value);
    }
    function dateFromHandler(e) {
        setDateFrom(e.target.value);
        Cookies.set("dateFrom", e.target.value);
    }
    function dateToHandler(e) {
        setDateTo(e.target.value);
        Cookies.set("dateTo", e.target.value);
    }
    function priceFromHandler(e) {
        setPriceFrom(e.target.value);
        Cookies.set("priceFrom", e.target.value);
    }
    function priceToHandler(e) {
        setPriceTo(e.target.value);
        Cookies.set("priceTo", e.target.value);
    }
    function cleanHandler(e) {
        Cookies.remove("findTitle"); setFindTitle("");
        Cookies.remove("dateFrom");  setDateFrom("");
        Cookies.remove("dateTo");    setDateTo("");
        Cookies.remove("priceFrom"); setPriceFrom("");
        Cookies.remove("priceTo");   setPriceTo("");
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
                                                             &from=${dateFrom}&to=${dateTo}
                                                             &price_from=${priceFrom}&price_to=${priceTo}
                                                             &title=${findTitle}`,
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
        [currentPage, dateFrom, dateTo, priceFrom, priceTo, findTitle]
    )

    function changeSortMode(e) {
        setSortMode(e.target.value);
        Cookies.set("sortMode", e.target.value);
        sort(e.target.value);
    }

    function sort(mode) {
        switch (mode) {
            case "name":
                products.sort((a, b) => a.title.localeCompare(b.title));  
                break;

            case "date":
                products.sort(function(a, b){
                    if (a.created_at > b.created_at) return -1;
                    else if(a.created_at < b.created_at) return  1;
                    else return  0;
                  });
                break;

            case "price":
                products.sort(function(a, b){
                    if (Number(a.price) < Number(b.price)) return -1;
                    else if (Number(a.price) > Number(b.price)) return 1;
                    else return 0;
                })
                    break;
        
            default:
                break;
        }
    }

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

            <div className="radio-group" onChange={changeSortMode}>
                <input type="radio" value="name" id="name" name="selector" defaultChecked={sortMode === "name"} />
                <label htmlFor="name">Name</label>
                
                <input type="radio" value="date" id="date" name="selector" defaultChecked={sortMode === "date"} />
                <label htmlFor="date">Date</label>

                <input type="radio" value="price" id="price" name="selector" defaultChecked={sortMode === "price"} />
                <label htmlFor="price">Price</label>
            </div>

            <div className="sort">
                <input className="clean" type="button" value="Clean" onClick={cleanHandler} />
                <div className="intName">
                    <input type="text" placeholder="Find by title" value={findTitle} onChange={findTitleHandler} />
                </div>
                <div className="intDate">
                    <input type="date" value={dateFrom} onChange={dateFromHandler} />
                    <input type="date" value={dateTo} onChange={dateToHandler} />
                </div>
                <div className="intPrice">
                    <input type="number" placeholder="Price from..." value={priceFrom} onChange={priceFromHandler} />
                    <input type="number" placeholder="Price to..." value={priceTo} onChange={priceToHandler} />
                </div>
            </div>


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