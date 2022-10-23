import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [sortMode, setSortMode] = useState(Cookies.get("sortMode"));
    const [currentPage, setCurrentPage] = useState(1);
    sort(sortMode);
    
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://dummy-api.d0.acom.cloud/api/products?page={${currentPage}}`, // апи не работатет, там только одна страница
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
        [currentPage]
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
        currentPage > 1 ? setCurrentPage(currentPage - 1) : console.log("0");;
    }

    function goNextPage() {
        currentPage < 6 ? setCurrentPage(currentPage + 1) : console.log("7");
    }



    return (
        <div>
            <h1>Products</h1>

            <div className="radio-group" onChange={changeSortMode}>
                <input type="radio" value="name" id="name" name="selector" defaultChecked={sortMode === "name"} />
                <label htmlFor="name">Name</label>
                
                <input type="radio" value="date" id="date" name="selector" defaultChecked={sortMode === "date"} />
                <label htmlFor="date">Date</label>

                <input type="radio" value="price" id="price" name="selector" defaultChecked={sortMode === "price"} />
                <label htmlFor="price">Price</label>
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