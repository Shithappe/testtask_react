import React, { useState } from "react";
import Cookies from "js-cookie";

const FilterComponent = ({fetchFilterData}) => {
    const [findTitle, setFindTitle] = useState(Cookies.get("findTitle") ? Cookies.get("findTitle") : "");
    const [dateFrom, setDateFrom] = useState(Cookies.get("dateFrom") ? Cookies.get("dateFrom") : "");
    const [dateTo, setDateTo] = useState(Cookies.get("dateTo") ? Cookies.get("dateTo") : "");
    const [priceFrom, setPriceFrom] = useState(Cookies.get("priceFrom") ? Cookies.get("priceFrom") : "");
    const [priceTo, setPriceTo] = useState(Cookies.get("priceTo") ? Cookies.get("priceTo") : "");

    function findTitleHandler(e) {
        setFindTitle(e.target.value);
        fetchFilterData(e.target.value, null, null, null, null);
        Cookies.set("findTitle", e.target.value);
    }
    function dateFromHandler(e) {
        setDateFrom(e.target.value);
        fetchFilterData(null, e.target.value , null, null, null);
        Cookies.set("dateFrom", e.target.value);
    }
    function dateToHandler(e) {
        setDateTo(e.target.value);
        fetchFilterData(null, null, e.target.value, null, null);
        Cookies.set("dateTo", e.target.value);
    }
    function priceFromHandler(e) {
        setPriceFrom(e.target.value);
        fetchFilterData(null, null, null, e.target.value, null);
        Cookies.set("priceFrom", e.target.value);
    }
    function priceToHandler(e) {
        setPriceTo(e.target.value);
        fetchFilterData(null, null, null, null, e.target.value);
        Cookies.set("priceTo", e.target.value);
    }
    
    function cleanHandler(e) {
        Cookies.remove("findTitle"); setFindTitle("");
        Cookies.remove("dateFrom");  setDateFrom("");
        Cookies.remove("dateTo");    setDateTo("");
        Cookies.remove("priceFrom"); setPriceFrom("");
        Cookies.remove("priceTo");   setPriceTo("");
    }

    return(
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
    )
}

export default FilterComponent;