import React, { useEffect, useState } from 'react';
import { addDailyCalorie, saveCustomFood } from '../../firebase';
import { useSelector } from 'react-redux';
import ButtonPrimary from '../CommonComponents/ButtonPrimary';
import SearchDropdown from '../CommonComponents/SearchDropdown';
import { formatInputValue } from '../../utils/formatInputValue';
import { AiOutlineMinusCircle } from 'react-icons/ai';
const AddCustomFoodModal = (data) => {
    const uid = useSelector((state) => state.user.currentUser.uid);
    const calorieDiary = useSelector((state) => state.userDiary.calorieDiary);
    const customFoods = useSelector((state) => state.customFoods.customFoods);
    const [selectedOption, setSelectedOption] = useState("");
    const initialCustomFodd = {
        food_name: "",
        brand_name: "",
        amount: "",
        calories: "",
        fat: "",
        carbs: "",
        protein: "",
    };
    const [customFood, setCustomFood] = useState(initialCustomFodd);

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
                [name]: trimmedValue,
            }));
        } else {
            setCustomFood((prevCustomFood) => ({
                ...prevCustomFood,
                [name]: value,
            }));
        }
    };

    const handleInputFocus = (e) => {
        const { name, value, dataset } = e.target;

        if (dataset.unit && value.trim() !== '') {
            const trimmedValue = formatInputValue(value, dataset.unit);
            setCustomFood((prevCustomFood) => ({
                ...prevCustomFood,
                [name]: trimmedValue,
            }));
        } else {
            setCustomFood((prevCustomFood) => ({
                ...prevCustomFood,
                [name]: value,
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
                [name]: formattedValue + dataset.unit,
            }));
        } else {
            setCustomFood((prevCustomFood) => ({
                ...prevCustomFood,
                [name]: value,
            }));
        }
    };
    const handleSaveFood = () => {
        saveCustomFood({
            uid: uid,
            food: customFood,
        })
        addDailyCalorie({
            uid: uid,
            food: customFood,
        }, calorieDiary, data.data.selectedDate)
    }
    useEffect(() => {
        setCustomFood({
            ...selectedOption?.value,
        })
    }, [selectedOption, uid])

    useEffect(() => {
        console.log(customFood)
    }, [selectedOption, customFood])

    const searchDropdownOptions = customFoods?.map((food) => ({
        value: food,
        label: food?.brand_name + " " + food?.food_name,
    }));
    const handleRemove = () => {
        setSelectedOption("")
        setCustomFood(initialCustomFodd)
    }
    return (
        <div className="flex flex-col gap-2 sm:w-80">
            <>
                {customFoods?.length > 0 &&
                    <div className='flex items-center justify-between'>
                        <SearchDropdown selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={searchDropdownOptions} />
                        <AiOutlineMinusCircle className='cursor-pointer' size={26} onClick={handleRemove} />
                    </div>
                }
                {inputs.map((input, i) => (
                    <input
                        key={i}
                        name={input.name}
                        type="text"
                        className="w-full p-2 border-2 border-gray-300 rounded-md h-9 lg:h-11"
                        placeholder={input.placeholder}
                        value={customFood?.[input.name]}
                        onChange={(e) => handleInputChange(e, input.name)}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        data-unit={input?.unit}
                    />
                ))}
                <ButtonPrimary className="w-full" onClick={handleSaveFood} >SAVE FOOD</ButtonPrimary>
            </>
        </div>
    );
};

export default AddCustomFoodModal;