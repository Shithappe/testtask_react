import React, { useState } from "react";
import Cookies from "js-cookie";

const PaginationComponent = ({fetchPage}) => {
    const [currentPage, setCurrentPage] = useState(Cookies.get("page") ? Number(Cookies.get("page")) : 1);

    function goPrevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            fetchPage(currentPage);
            Cookies.set("page", currentPage);
        }
    }
    
    function goNextPage() {
        if (currentPage < 6) {
            setCurrentPage(currentPage + 1);
            fetchPage(currentPage);
            Cookies.set("page", currentPage);
        }
    }

    return(
        <div className="pagination">
            <button onClick={goPrevPage}>Prev</button>
            <span>{currentPage}</span>
            <button onClick={goNextPage}>Next</button>
        </div>
    )
}

export default PaginationComponent;