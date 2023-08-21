import React, { useEffect, useState } from 'react';
import { addDailyCalorie, deleteCustomFood, saveCustomFood } from '../../firebase';
import { useSelector } from 'react-redux';
import ButtonPrimary from '../CommonComponents/ButtonPrimary';
import SearchDropdown from '../CommonComponents/SearchDropdown';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import FormatedInputComponent from '../MembershipComponents/FormatedInputComponent';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import DeleteButton from '../CommonComponents/DeleteButton';
import { createModal } from '../../utils/modalHooks';
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
    }, [selectedOption])

    useEffect(() => {
        console.log(customFood, "customFood")
    }, [selectedOption, customFood])

    const searchDropdownOptions = customFoods?.map((food) => ({
        value: food,
        label: food?.brand_name + " " + food?.food_name,
    }));
    const handleClear = () => {
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

    useEffect(() => {
        if (selectedOption) {
            setCustomFood(selectedOption.value);
        }
    }, [selectedOption]);

    const handleDeleteButton = async (e) => {
        e.preventDefault()
        createModal("ConfirmationModal", {
            title: "Delete Food",
            text: "Are you sure you want to delete this food?",
            onConfirm: async () => {
                await deleteCustomFood({ uid: uid, id: selectedOption.value.id })
                setSelectedOption("")
            }
        })
    }

    return (
        <div className="flex flex-col gap-2 p-2 sm:py-10 sm:px-5 sm:w-80 bg-gradient-to-tl from-teal-900 via-slate-700 to-slate-800">
            <>
                <Formik initialValues={
                    Object.fromEntries(
                        Object.entries(customFood).map(([key, value]) => [key, value])
                    )
                } onSubmit={(values) => handleSaveFood({ values })} validationSchema={validation}>
                    {({ values, errors, touched, handleChange, handleBlur, resetForm }) => (
                        <Form>
                            {customFoods?.length > 0 &&
                                <div className='flex items-center justify-between gap-2'>
                                    <SearchDropdown selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={searchDropdownOptions} />
                                    {selectedOption && (
                                        <DeleteButton className='w-4 h-4 sm:w-6 sm:h-6' onClick={handleDeleteButton} type="button" />
                                    )}
                                    <AiOutlineMinusCircle type='button' title='Clear Form' className='w-4 h-4 text-gray-200 cursor-pointer hover:text-teal-500 sm:w-6 sm:h-6' onClick={() => {
                                        handleClear()
                                        resetForm()
                                    }} />
                                </div>
                            }
                            {inputs.map((input, i) => (
                                <div>
                                    <div className='flex items-center justify-between'>

                                        <span className={`capitalize text-slate-200`}>{input.name.replace("_", " ")}: </span>
                                        <ErrorMessage
                                            name={input.name}
                                            component="div"
                                            className="text-red-500 "
                                        />
                                    </div>
                                    <Field
                                        name={input.name}
                                        type="text"
                                        className={` w-full p-2 border-2 border-[hsl(0,0%,80%)] rounded-md h-9 lg:h-11`}
                                        placeholder={input.placeholder}
                                        unit={input?.unit}
                                        component={FormatedInputComponent}
                                        selectedOption={selectedOption}
                                    />
                                </div>
                            ))}
                            <ButtonPrimary className="w-full mt-4" type="submit" onClick={handleSaveFood} >SAVE FOOD</ButtonPrimary>
                        </Form>
                    )}
                </Formik>
            </>
        </div>
    );
};

export default AddCustomFoodModal;