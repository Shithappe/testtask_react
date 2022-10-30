import React, { useState } from "react";
import Cookies from "js-cookie";

const SortComponent = ({products, fetchSortData}) => {
    const [sortMode, setSortMode] = useState(Cookies.get("sortMode"));
    // fetchSortData([])  
    // sort(sortMode);
    console.log(products);


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

    return(
        <div className="radio-group" onChange={changeSortMode}>
        <input type="radio" value="name" id="name" name="selector" defaultChecked={sortMode === "name"} />
        <label htmlFor="name">Name</label>
        
        <input type="radio" value="date" id="date" name="selector" defaultChecked={sortMode === "date"} />
        <label htmlFor="date">Date</label>

        <input type="radio" value="price" id="price" name="selector" defaultChecked={sortMode === "price"} />
        <label htmlFor="price">Price</label>
    </div>
    )
}

export default SortComponent;