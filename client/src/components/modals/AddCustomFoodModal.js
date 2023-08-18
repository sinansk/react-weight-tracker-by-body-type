import React, { useEffect, useState } from 'react';
import { addDailyCalorie, saveCustomFood } from '../../firebase';
import { useSelector } from 'react-redux';
import ButtonPrimary from '../CommonComponents/ButtonPrimary';
import SearchDropdown from '../CommonComponents/SearchDropdown';
import { formatInputValue } from '../../utils/formatInputValue';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import FormatedInputComponent from '../MembershipComponents/FormatedInputComponent';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
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
    // ... (import statements)


    // ... (other code)

    const handleInputChange = (name, newValue) => {
        setCustomFood((prevCustomFood) => ({
            ...prevCustomFood,
            [name]: newValue,
        }));
    };

    const handleInputBlur = (name, newValue) => {
        // Perform any additional formatting or handling if needed
        setCustomFood((prevCustomFood) => ({
            ...prevCustomFood,
            [name]: newValue,
        }));
    };

    const handleInputFocus = (name, newValue) => {
        // Perform any additional handling if needed
        setCustomFood((prevCustomFood) => ({
            ...prevCustomFood,
            [name]: newValue,
        }));
    };

    const handleSaveFood = ({ values }) => {
        console.log(values, "values")
        saveCustomFood({
            uid: uid,
            food: values,
        })
        addDailyCalorie({
            uid: uid,
            food: values,
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

    const validation = Yup.object().shape({
        food_name: Yup.string().required("Required"),
        brand_name: Yup.string().required("Required"),
        amount: Yup.string().required("Required"),
        calories: Yup.string().required("Required"),
        fat: Yup.string().required("Required"),
        carbs: Yup.string().required("Required"),
        protein: Yup.string().required("Required"),
    })
    return (
        <div className="flex flex-col gap-2 sm:w-80">
            <>
                <Formik initialValues={
                    Object.fromEntries(
                        Object.entries(customFood).map(([key, value]) => [key, value])
                    )
                } onSubmit={(values) => handleSaveFood({ values })} validationSchema={validation}>
                    {({ values, errors, touched, handleChange, handleBlur }) => (

                        <Form>

                            {customFoods?.length > 0 &&
                                <div className='flex items-center justify-between'>
                                    <SearchDropdown selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={searchDropdownOptions} />
                                    <AiOutlineMinusCircle className='cursor-pointer' size={26} onClick={handleRemove} />
                                </div>
                            }
                            {inputs.map((input, i) => (

                                <div>

                                    <ErrorMessage

                                        name={input.name}
                                        component="div"
                                        className="text-red-500 "
                                    />
                                    <span className={`${errors[input.name] && 'hidden'} capitalize`}>{input.name.replace("_", " ")}: </span>
                                    <Field
                                        name={input.name}
                                        type="text"
                                        className={`${errors[input.name] && touched[input.name] ? 'border-red-500' : 'border-[hsl(0,0%,80%)] '} w-full p-2 border-2 border-gray-300 rounded-md h-9 lg:h-11`}
                                        placeholder={input.placeholder}
                                        unit={input?.unit}
                                        component={FormatedInputComponent}
                                        formatValue={formatInputValue}

                                    />

                                </div>
                            ))}
                            <ButtonPrimary className="w-full" type={"submit"} onClick={handleSaveFood} >SAVE FOOD</ButtonPrimary>
                        </Form>
                    )}
                </Formik>
            </>
        </div>
    );
};

export default AddCustomFoodModal;