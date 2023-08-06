import React, { useEffect, useState } from 'react';
import { addDailyCalorie, saveCustomFood } from '../../firebase';
import { useSelector } from 'react-redux';
import ButtonPrimary from '../CommonComponents/ButtonPrimary';
import SearchDropdown from '../CommonComponents/SearchDropdown';

const AddCustomFoodModal = (data) => {
    const uid = useSelector((state) => state.user.currentUser.uid);
    const calorieDiary = useSelector((state) => state.userDiary.calorieDiary);
    console.log(data)
    const customFoods = useSelector((state) => state.customFoods.customFoods);
    const [selectedOption, setSelectedOption] = useState("");
    useEffect(() => {
        console.log(customFoods, "customFoodsMODAL")
    }, [customFoods])
    const [customFood, setCustomFood] = useState({
        id: Date.now(),
        uid: uid,
        food: {
            food_name: "",
            brand_name: "",
            amount: "",
            calories: "",
            fat: "",
            carbs: "",
            protein: "",
        },
    });
    const inputs = [{
        name: "food_name",
        placeholder: "Food Name"
    },
    {
        name: "brand_name",
        placeholder: "Brand Name"
    },
    {
        name: "amount",
        placeholder: "Amount"
    },
    {
        name: "fat",
        placeholder: "Fat"
    },
    {
        name: "carbs",
        placeholder: "Carbs"
    },
    {
        name: "protein",
        placeholder: "Protein"
    },
    {
        name: "calories",
        placeholder: "Calories"
    },
    ]
    const handleInputChange = (e, key) => {
        const { value } = e.target;
        setCustomFood((prevCustomFood) => ({
            ...prevCustomFood,
            food: {
                ...prevCustomFood.food,
                [key]: value,
            },
        }));
    };


    const handleSaveFood = () => {
        saveCustomFood(customFood)
        addDailyCalorie(customFood, calorieDiary, data.data.selectedDate)
    }
    useEffect(() => {
        console.log(selectedOption?.value, "selectedOption")
        setCustomFood(prevCustomFood => ({
            ...prevCustomFood,
            food: selectedOption?.value

        }))
    }, [selectedOption])

    useEffect(() => {
        console.log(customFood, "customFood")
    }, [customFood])
    return (
        <div className="flex flex-col gap-2 sm:w-80">
            <>
                <SearchDropdown data={customFoods} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                {inputs.map((input, i) => (
                    <input
                        key={i}
                        type="text"
                        className="w-full p-2 border-2 border-gray-300 rounded-md"
                        placeholder={input.placeholder}
                        value={customFood?.food?.[input.name]}
                        onChange={(e) => handleInputChange(e, input.name)}
                    />
                ))}
                <ButtonPrimary className="w-full" onClick={handleSaveFood} text="SAVE FOOD"></ButtonPrimary>
            </>
        </div>
    );
};

export default AddCustomFoodModal;




