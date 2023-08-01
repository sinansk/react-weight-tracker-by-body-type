import React, { useEffect, useState } from 'react'
import axios from "axios"
import ButtonPrimary from '../components/ButtonPrimary';
import { BiMessageSquareAdd } from "react-icons/bi"
import { motion } from "framer-motion";
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { addToDiary } from '../redux/userDiary';
const CalorieTracker = () => {
    const [searchFood, setSearchFood] = useState();
    const [responseList, setResponseList] = useState(null)
    const [editedWeight, setEditedWeight] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [diaryItems, setDiaryItems] = useState([])
    const diary = useSelector((state) => state.userDiary.calorieDiary)
    const handleInputChange = (e) => {
        setSearchFood(e.target.value);
    };
    const dispatch = useDispatch()
    const handleSearch = async (e) => {
        console.log(e)
        e.preventDefault()
        const query = searchFood
        try {
            setIsLoading(true)
            const response = await axios.post("http://localhost:5000/api/search-food", { food: query });
            console.log(response)
            setResponseList(response.data.foods.food)
            // Process the food data and update state
            const processedFoods = response.data.foods.food?.map((food) => {
                // Check if the food_description is in the expected format
                const regex = /Per (?<weight>[^\-]+) - Calories: (?<calories>[\d.]+kcal) \| Fat: (?<fat>[\d.]+g) \| Carbs: (?<carbs>[\d.]+g) \| Protein: (?<protein>[\d.]+g)/

                const match = food.food_description.match(regex);

                if (match) {
                    const { weight, calories, fat, carbs, protein } = match.groups;

                    // Modify the "food_description" field and return the updated object
                    const newData = {
                        ...food,
                        food_description: {
                            weight: weight,
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

            setSearchFood("")
            setIsLoading(false)
            setResponseList(processedFoods);
        } catch (err) {
            console.error('Error:', err);
        }
    }

    const handleWeightChange = (foodId, newWeight) => {
        setEditedWeight((prevEditedWeight) => ({
            ...prevEditedWeight,
            [foodId]: newWeight,
        }));
    };

    useEffect(() => {
        console.log("responseList", responseList)
    }, [responseList])

    const formatWeightValue = (weight) => {
        // Regular expression to extract the numeric value and unit
        const regex = /(\d+(\.\d+)?)(\s*)([a-zA-Z]+)/;
        const match = weight.match(regex);

        if (match) {
            const numericValue = match[1];
            const unit = match[4].trim();
            return { value: numericValue, unit };
        }

        return { value: weight, unit: "" }; // Return as it is if the regex doesn't match
    };

    const getWeightForDiary = (foodId, originalWeight) => {
        return editedWeight[foodId] !== undefined ? editedWeight[foodId] : originalWeight;
    };

    const handleDiary = (foodItem) => {
        console.log("foodItem", foodItem)
        const weight = getWeightForDiary(foodItem.food_id, formatWeightValue(foodItem.food_description.weight).value);

        // Günlüğe yeni öğeyi ekleyelim
        setDiaryItems((prevDiaryItems) => [
            ...prevDiaryItems,
            {
                food_id: foodItem.food_id,
                food_name: foodItem.food_name,
                brand_name: foodItem.brand_name,
                food_detail: {
                    weight: weight + formatWeightValue(foodItem.food_description.weight).unit, // Öğe ağırlığını günlüğe ekliyoruz
                    calories: (parseFloat(foodItem.food_description.calories) * parseFloat(weight) / 100).toFixed(2) + "kcal",
                    fat: (parseFloat(foodItem.food_description.fat) * parseFloat(weight) / 100).toFixed(2) + "g",
                    carbs: (parseFloat(foodItem.food_description.carbs) * parseFloat(weight) / 100).toFixed(2) + "g",
                    protein: (parseFloat(foodItem.food_description.protein) * parseFloat(weight) / 100).toFixed(2) + "g",
                },
            },
        ]);
        toast.success(`You have added ${foodItem.food_name} in your diary!`)
        dispatch(addToDiary(diaryItems))
    };

    useEffect(() => {
        console.log("diaryItems", diaryItems)
    }, [diaryItems])

    useEffect(() => {
        console.log(diary, "redux diary")
    }, [diary])
    return (
        <div className='w-full'>
            <div className='py-10 mx-auto sm:w-[600px]'>
                <form className='flex items-center justify-between min-w-full gap-2'>
                    <input type='text' id='searchFood' value={searchFood} onChange={handleInputChange} className='flex-auto h-10 px-3 rounded-lg focus:outline-pink-500' placeholder='Search food...' />
                    <ButtonPrimary name="SEARCH" onClick={handleSearch} loading={isLoading} disabled={!searchFood?.trim()} />
                </form>
                <div className="grid w-full gap-1 mt-2 overflow-hidden rounded-md ">
                    {responseList?.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className='px-3 py-2 bg-white hover:bg-slate-100'>
                            <p className="font-medium text-gray-600 text-md">
                                <span>{item?.brand_name}</span> {item.food_name}
                            </p>
                            <div className='flex items-center gap-2 mt-2 text-gray-500'>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={editedWeight[item.food_id] !== undefined ? editedWeight[item.food_id] : formatWeightValue(item.food_description.weight).value}
                                        onChange={(e) => handleWeightChange(item.food_id, e.target.value)}
                                        className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-pink-500"
                                    />
                                    <span className="ml-1">{formatWeightValue(item.food_description.weight).unit}</span>
                                </div>
                                | Calories: {parseFloat(item.food_description.calories) * parseFloat(editedWeight[item.food_id] || item.food_description.weight) / 100}kcal |
                                Fat: {parseFloat(item.food_description.fat) * parseFloat(editedWeight[item.food_id] || item.food_description.weight) / 100}g |
                                Carbs: {parseFloat(item.food_description.carbs) * parseFloat(editedWeight[item.food_id] || item.food_description.weight) / 100}g |
                                Protein: {parseFloat(item.food_description.protein) * parseFloat(editedWeight[item.food_id] || item.food_description.weight) / 100}g
                                <button onClick={() => handleDiary(item)} className='ml-auto'><BiMessageSquareAdd /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalorieTracker