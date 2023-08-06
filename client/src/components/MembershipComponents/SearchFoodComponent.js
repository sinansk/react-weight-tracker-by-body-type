import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { BiMessageSquareAdd } from "react-icons/bi"
import { motion } from "framer-motion";
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import SearchComponent from '../SearchComponent';
import { addToDiary } from '../../redux/userDiary';
import { saveDailyCalorie } from '../../redux/userDiaryThunk';
import { addDailyCalorie } from '../../firebase';

const SearchFoodComponent = ({ className, selectedDate }) => {
    const [searchFoodInput, setSearchFoodInput] = useState();
    const { currentUser } = useSelector((state) => state.user)
    const [responseList, setResponseList] = useState(null)
    const [editedAmount, setEditedAmount] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const calorieDiary = useSelector((state) => state.userDiary.calorieDiary)
    const dispatch = useDispatch()
    const inputRefs = {}

    const handleDivClick = (foodId) => {
        inputRefs[foodId].focus()
    }

    const handleInputChange = (e) => {
        setSearchFoodInput(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault()
        const query = searchFoodInput
        try {
            setIsLoading(true)
            const response = await axios.post("http://localhost:5000/api/search-food", { food: query });
            console.log("response", response.data.foods.food)
            setResponseList(response.data.foods.food)
            // Process the food data and update state
            const processedFoods = response.data.foods.food?.map((food) => {
                // Check if the food_description is in the expected format
                const regex = /Per (?<amount>[^\-]+) - Calories: (?<calories>[\d.]+kcal) \| Fat: (?<fat>[\d.]+g) \| Carbs: (?<carbs>[\d.]+g) \| Protein: (?<protein>[\d.]+g)/
                const match = food.food_description.match(regex);

                if (match) {
                    const { amount, calories, fat, carbs, protein } = match.groups;

                    // Modify the "food_description" field and return the updated object
                    const newData = {
                        ...food,
                        food_description: {
                            amount: amount,
                            calories: calories,
                            fat: fat,
                            carbs: carbs,
                            protein: protein,
                        },
                    };
                    return newData;
                }
                // If regex doesn't match, leave the food_description as it is
                return food;
            });
            setSearchFoodInput("")
            setIsLoading(false)
            setResponseList(processedFoods);
        } catch (err) {
            console.error('Error:', err);
        }
    }

    const handleAmountChange = (foodId, newAmount) => {
        setEditedAmount((prevEditedAmount) => ({
            ...prevEditedAmount,
            [foodId]: newAmount,
        }));
    };

    const formatAmountValue = (amount) => {
        // Regular expression to extract the numeric value and unit
        const regex = /(\d+(\.\d+)?)(\s*)([a-zA-Z]+)/;
        const match = amount.match(regex);

        if (match) {
            const numericValue = match[1];
            const unit = match[4].trim();
            return { value: numericValue, unit };
        }
        return { value: amount, unit: "" }; // Return as it is if the regex doesn't match
    };

    const getAmountForDiary = (foodId, originalAmount) => {
        return editedAmount[foodId] !== undefined ? editedAmount[foodId] : originalAmount;
    };

    const handleDiary = (foodItem) => {
        const amount = getAmountForDiary(foodItem.food_id, formatAmountValue(foodItem.food_description.amount).value);
        const food_detail = {
            food_id: foodItem.food_id,
            food_name: foodItem.food_name,
            brand_name: foodItem?.brand_name ?? null,
            amount: amount + formatAmountValue(foodItem.food_description.amount).unit, // Öğe ağırlığını günlüğe ekliyoruz
            calories: (parseFloat(foodItem.food_description.calories) * parseFloat(amount) / 100).toFixed(2) + "kcal",
            fat: (parseFloat(foodItem.food_description.fat) * parseFloat(amount) / 100).toFixed(2) + "g",
            carbs: (parseFloat(foodItem.food_description.carbs) * parseFloat(amount) / 100).toFixed(2) + "g",
            protein: (parseFloat(foodItem.food_description.protein) * parseFloat(amount) / 100).toFixed(2) + "g",

        }
        // dispatch(addToDiary(food))
        addDailyCalorie({
            uid: currentUser.uid,
            food: food_detail
        }, calorieDiary, selectedDate)

        toast.success(`You have added ${foodItem.food_name} in your diary!`)
    };

    useEffect(() => {
        console.log(responseList)
    }, [responseList])
    useEffect(() => {
        console.log(selectedDate, "selectedDateSEARCH")
    }, [selectedDate])

    // useEffect(() => {
    //     if (calorieDiary.length > 0) {
    //         console.log(calorieDiary)
    //         addDailyCalorie({
    //             uid: currentUser.uid,
    //             calorieDiary: calorieDiary
    //         })
    //     }
    // }, [calorieDiary, currentUser]);

    return (
        <div className={`${className} py-10 w-full`}>
            <SearchComponent value={searchFoodInput} onChange={handleInputChange} placeholder="Search food..." onButtonClick={handleSearch} loading={isLoading} />
            <div className="grid min-w-full gap-1 mt-2 overflow-hidden rounded-lg ">
                {responseList?.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleDivClick(item.food_id)}
                        className='px-3 py-2 bg-white cursor-auto hover:bg-slate-100 group'>
                        <p className="font-medium text-gray-600 text-md">
                            <span>{item?.brand_name}</span> {item.food_name}
                        </p>
                        <div className='flex items-center gap-2 mt-2 text-gray-500'>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    ref={(ref) => { inputRefs[item.food_id] = ref }}
                                    value={editedAmount[item.food_id] !== undefined ? editedAmount[item.food_id] : formatAmountValue(item.food_description.amount).value}
                                    onChange={(e) => handleAmountChange(item.food_id, e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-pink-500 "
                                />
                                <span className="ml-1">{formatAmountValue(item.food_description.amount).unit}</span>
                            </div>
                            | Calories: {(parseFloat(item.food_description.calories) * parseFloat(editedAmount[item.food_id] || item.food_description.amount) / 100).toFixed(2)}kcal |
                            Fat: {(parseFloat(item.food_description.fat) * parseFloat(editedAmount[item.food_id] || item.food_description.amount) / 100).toFixed(2)}g |
                            Carbs: {(parseFloat(item.food_description.carbs) * parseFloat(editedAmount[item.food_id] || item.food_description.amount) / 100).toFixed(2)}g |
                            Protein: {(parseFloat(item.food_description.protein) * parseFloat(editedAmount[item.food_id] || item.food_description.amount) / 100).toFixed(2)}g
                            {currentUser &&
                                <button onClick={() => handleDiary(item)} className='ml-auto'><BiMessageSquareAdd size={20} className='hover:text-pink-400' title="Add To Diary" aria-label='Add To Diary' /></button>
                            }
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SearchFoodComponent