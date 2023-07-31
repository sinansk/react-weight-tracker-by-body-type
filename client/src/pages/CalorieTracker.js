import React, { useEffect, useState } from 'react'
import axios from "axios"

const CalorieTracker = () => {
    const [searchFood, setSearchFood] = useState();
    const [responseList, setResponseList] = useState(null)
    const handleInputChange = (e) => {
        setSearchFood(e.target.value);
    };

    const handleSearch = async (e) => {
        console.log(e)
        e.preventDefault()
        const query = searchFood
        try {
            const response = await axios.post("http://localhost:5000/api/search-food", { food: query });
            console.log(response)
            setResponseList(response.data.foods.food)
            setSearchFood("")
        } catch (err) {
            console.error('Error:', err);
        }
    }
    return (
        <div className=''>
            <div className='py-10 mx-auto sm:w-96'>
                <form className='flex items-center justify-between w-full gap-2'>
                    <input type='text' id='searchFood' value={searchFood} onChange={handleInputChange} className='flex-auto h-10 px-3 rounded-lg focus:outline-pink-500' placeholder='Search food...' />
                    <button onClick={handleSearch} className="relative inline-flex items-center h-10 px-8 py-3 overflow-hidden text-white bg-pink-500 rounded-lg hover:bg-pink-400 focus:bg-pink-400 group active:bg-pink-400 focus:outline-none focus:ring">SEARCH</button>
                </form>
                <div class=" mt-2 w-full overflow-hidden rounded-md bg-white">
                    {responseList?.map((item, index) => (
                        <div key={index} class="cursor-pointer py-2 px-3 hover:bg-slate-100">
                            <p class="text-sm text-gray-500">{item.food_name}</p>
                            <p class="text-sm font-medium text-gray-600">{item.food_description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalorieTracker