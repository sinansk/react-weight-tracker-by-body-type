import React, { useState } from "react";
import FoodCalorieCard from "../components/MembershipComponents/FoodCalorieCard";
import ExerciseCalorieCard from "../components/MembershipComponents/ExerciseCalorieCard";
import PaginationComponent from "../components/CommonComponents/PaginationComponent";
import FavFoodsComponent from "../components/MembershipComponents/FavFoodsComponent";

const Test = () => {
    const itemsPerPage = 5; // Sayfa başına gösterilecek öğe sayısı
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    return (
        <>
            {/* <FoodCalorieCard />
            <ExerciseCalorieCard /> */}
            {/* <PaginationComponent totalItems={100} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} /> */}
            <FavFoodsComponent />
        </>
    );
};

export default Test;
