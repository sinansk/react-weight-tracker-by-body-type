import React, { useEffect, useState } from 'react';
import { addDailyCalorie, saveCustomFood } from '../../firebase';
import { useSelector } from 'react-redux';
import ButtonPrimary from '../CommonComponents/ButtonPrimary';
import SearchDropdown from '../CommonComponents/SearchDropdown';
import { formatInputValue } from '../../utils/formatInputValue';

const AddCustomFoodModal = (data) => {
    const uid = useSelector((state) => state.user.currentUser.uid);
    const calorieDiary = useSelector((state) => state.userDiary.calorieDiary);
    const customFoods = useSelector((state) => state.customFoods.customFoods);
    const [selectedOption, setSelectedOption] = useState("");
    useEffect(() => {
        console.log(customFoods, "customFoodsMODAL")
    }, [customFoods])
    const [customFood, setCustomFood] = useState({
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
        placeholder: "Amount",
        unit: "g"
    },
    {
        name: "fat",
        placeholder: "Fat",
        unit: "g"
    },
    {
        name: "carbs",
        placeholder: "Carbs",
        unit: "g"
    },
    {
        name: "protein",
        placeholder: "Protein",
        unit: "g"
    },
    {
        name: "calories",
        placeholder: "Calories",
        unit: "kcal"
    },
    ]
    const handleInputChange = (e) => {
        const { name, value, dataset } = e.target;

        if (dataset.unit && value.trim() !== '') {
            const trimmedValue = formatInputValue(value, dataset.unit);
            setCustomFood((prevCustomFood) => ({
                ...prevCustomFood,
                food: {
                    ...prevCustomFood.food,
                    [name]: trimmedValue,
                },
            }));
        } else {
            setCustomFood((prevCustomFood) => ({
                ...prevCustomFood,
                food: {
                    ...prevCustomFood.food,
                    [name]: value,
                },
            }));
        }
    };

    const handleInputFocus = (e) => {
        const { name, value, dataset } = e.target;

        if (dataset.unit && value.trim() !== '') {
            const trimmedValue = formatInputValue(value, dataset.unit);
            setCustomFood((prevCustomFood) => ({
                ...prevCustomFood,
                food: {
                    ...prevCustomFood.food,
                    [name]: trimmedValue,
                },
            }));
        } else {
            setCustomFood((prevCustomFood) => ({
                ...prevCustomFood,
                food: {
                    ...prevCustomFood.food,
                    [name]: value,
                },
            }));
        }
    };

    const handleInputBlur = (e) => {
        const { name, value, dataset } = e.target;

        if (dataset.unit && value.trim() !== '') {
            const trimmedValue = formatInputValue(value, dataset.unit);
            const formattedValue = trimmedValue.endsWith('.') || trimmedValue.endsWith(',')
                ? trimmedValue + '00'
                : trimmedValue.includes('.')
                    ? trimmedValue.replace(/\.(\d$|\.$)/, (match, group1) => `.${group1 || '00'}`)
                    : trimmedValue.length > 0 && !trimmedValue.endsWith('.')
                        ? `${trimmedValue}.00`
                        : '';

            setCustomFood((prevCustomFood) => ({
                ...prevCustomFood,
                food: {
                    ...prevCustomFood.food,
                    [name]: formattedValue + dataset.unit,
                },
            }));
        } else {
            setCustomFood((prevCustomFood) => ({
                ...prevCustomFood,
                food: {
                    ...prevCustomFood.food,
                    [name]: value,
                },
            }));
        }
    };
    const handleSaveFood = () => {
        saveCustomFood(customFood)
        addDailyCalorie(customFood, calorieDiary, data.data.selectedDate)
    }
    useEffect(() => {
        setCustomFood(prevCustomFood => ({
            ...prevCustomFood,
            food: selectedOption?.value
        }))
    }, [selectedOption])

    return (
        <div className="flex flex-col gap-2 sm:w-80">
            <>
                {customFoods?.length > 0 &&
                    <SearchDropdown data={customFoods} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                }
                {inputs.map((input, i) => (
                    <input
                        key={i}
                        name={input.name}
                        type="text"
                        className="w-full p-2 border-2 border-gray-300 rounded-md"
                        placeholder={input.placeholder}
                        value={customFood?.food?.[input.name]}
                        onChange={(e) => handleInputChange(e, input.name)}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        data-unit={input?.unit}
                    />
                ))}
                <ButtonPrimary className="w-full" onClick={handleSaveFood} text="SAVE FOOD"></ButtonPrimary>
            </>
        </div>
    );
};

export default AddCustomFoodModal;




