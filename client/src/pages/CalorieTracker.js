import React, { useEffect, useState } from 'react'
import axios from "axios"

const CalorieTracker = () => {
    const [searchFood, setSearchFood] = useState(null);
    const handleInputChange = (e) => {
        setSearchFood(e.target.value);
    };

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth');
                console.log('Response:', response);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        verifyToken();
    }, []);

    return (
        <div>
            <input type='text' id='searchFood' value={searchFood} onChange={handleInputChange} />
            <button className="relative inline-flex items-center px-8 py-3 mx-2 overflow-hidden text-white bg-pink-500 rounded-lg hover:bg-pink-400 focus:bg-pink-400 sm:mt-4 group active:bg-pink-400 focus:outline-none focus:ring">SEARCH</button>
            {searchFood ? (
                <pre>{JSON.stringify(searchFood, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CalorieTracker