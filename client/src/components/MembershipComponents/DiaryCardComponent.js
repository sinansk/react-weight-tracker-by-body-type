import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToDiary, deleteFromDiary } from '../../redux/userDiary'
import DeleteButton from '../CommonComponents/DeleteButton'
import { addDailyCalorie, deleteDailyCalorie } from '../../firebase'
import { IoIosAdd } from 'react-icons/io'
import { createModal } from '../../utils/modalHooks'
import { TbSquareRoundedCheckFilled } from 'react-icons/tb'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { setCustomFoods } from '../../redux/customFoods'
import { formatInputValue } from '../../utils/formatInputValue'

const DiaryCardComponent = ({ className, selectedDate }) => {
    console.log(selectedDate, "selectedDate")
    const dispatch = useDispatch()
    const uid = useSelector((state) => state.user.currentUser.uid)
    const userDiary = useSelector((state) => state.userDiary);

    const diary = userDiary.calorieDiary.find((entry) => entry.date === selectedDate);
    const calorieDiary = useSelector((state) => state.userDiary.calorieDiary)
    const foods = diary?.foods;
    console.log(diary, "DiaryComponent");

    const columns = [
        { id: "amount", label: "Amount" },
        { id: "food_name", label: "Food" },
        { id: "carbs", label: "Carbs" },
        { id: "fat", label: "Fat" },
        { id: "protein", label: "Protein" },
        { id: "calories", label: "Calories" }
    ]

    const TableHeader = ({ columns }) => {
        return (
            <thead className='w-full '>
                <tr>
                    {columns.map((column) => (
                        <th key={column.id}>{column.label}</th>
                    ))}
                </tr>
            </thead>
        )
    }
    const [isQuickCalorie, setIsQuickCalorie] = useState(false)
    const initalCustomFood = {
        id: Date.now(),
        uid: uid,
        food: {
            amount: "",
            brand_name: "",
            food_name: "Quick Calorie",
            carbs: "",
            fat: "",
            protein: "",
            calories: ""
        }
    }
    const [quickCalorie, setQuickCalorie] = useState(initalCustomFood)
    const handleAddButton = () => {
        // createModal("AddCustomFoodModal", { selectedDate: selectedDate })
        setIsQuickCalorie(!isQuickCalorie)

    }
    const handleInputChange = (e) => {
        const { name, value, dataset } = e.target;

        const trimmedValue = formatInputValue(value, dataset.unit);

        setQuickCalorie((prevQuickCalorie) => ({
            ...prevQuickCalorie,
            food: {
                ...prevQuickCalorie.food,
                [name]: trimmedValue,
            },
        }));
    };

    const handleInputFocus = (e) => {
        const { name, value, dataset } = e.target;

        const trimmedValue = formatInputValue(value, dataset.unit);

        setQuickCalorie((prevQuickCalorie) => ({
            ...prevQuickCalorie,
            food: {
                ...prevQuickCalorie.food,
                [name]: trimmedValue,
            },
        }));
    };

    const handleInputBlur = (e) => {
        const { name, value, dataset } = e.target;

        const trimmedValue = formatInputValue(value, dataset.unit);
        const formattedValue = trimmedValue.endsWith('.') || trimmedValue.endsWith(',')
            ? trimmedValue + '00'
            : trimmedValue.includes('.')
                ? trimmedValue.replace(/\.(\d$|\.$)/, (match, group1) => `.${group1 || '00'}`)
                : trimmedValue.length > 0 && !trimmedValue.endsWith('.')
                    ? `${trimmedValue}.00`
                    : '';
        trimmedValue.length > 0 &&
            setQuickCalorie((prevQuickCalorie) => ({
                ...prevQuickCalorie,
                food: {
                    ...prevQuickCalorie.food,
                    [name]: formattedValue + dataset.unit,
                },
            }));
    };

    useEffect(() => {
        console.log(quickCalorie, "quickCalorie")
    }, [quickCalorie])

    const addCustomFood = () => {
        dispatch(addDailyCalorie(quickCalorie, calorieDiary, selectedDate))
        setIsQuickCalorie(false)
        setQuickCalorie(initalCustomFood)
    }
    return (

        <>
            <div className={`${className} p-5 pt-0 mx-auto shadow-lg rounded-xl bg-white w-[600px] h-fit`}>
                <h2 className='p-2 my-auto text-lg'>{selectedDate}</h2>
                {foods ? (
                    <table className='min-w-full p-5 divide-y divide-gray-200'>
                        <TableHeader columns={columns} />

                        <tbody className="bg-white divide-y divide-gray-200 text-slate-700">
                            {foods?.map((item, rowIndex) => (
                                <tr key={rowIndex} className=''>
                                    {columns.map((column) => (
                                        <td className='px-3 py-2 ' key={column.id}>
                                            {column.id !== "food_name" ? (
                                                <p className='font-medium text-gray-600 text-md'>{item[column.id]}</p>
                                            ) : (
                                                <>
                                                    <p className='font-medium text-gray-600 text-md'>{item?.food_name}</p>
                                                    <p className='text-gray-500'>{item?.brand_name}</p>
                                                </>
                                            )}
                                        </td>
                                    ))}
                                    <td className=''>
                                        <DeleteButton onClick={() => deleteDailyCalorie(item, calorieDiary, selectedDate)} className="m-auto " size={18} />
                                    </td>
                                </tr>
                            ))}
                            <tr className={`${isQuickCalorie ? `table-row outline-dashed outline-2 outline-offset-1 ` : `hidden`}`}>
                                <td colSpan={2} className=''>
                                    Quick Calorie
                                </td>
                                <td > <div className="relative">
                                    <input
                                        name="carbs"
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        value={quickCalorie.food.carbs}
                                        data-unit="g"
                                        placeholder="optional"
                                        className="w-20 px-1 border-[1px] focus:outline-pink-500 rounded-md bg-slate-50"
                                        type="text"
                                    />
                                </div></td>
                                <td > <div className="relative">
                                    <input
                                        name="fat"
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        value={quickCalorie.food.fat}
                                        data-unit="g"
                                        placeholder="optional"
                                        className="w-20 px-1 border-[1px] focus:outline-pink-500 rounded-md bg-slate-50"
                                        type="text"
                                    />
                                </div></td>
                                <td > <div className="relative">
                                    <input
                                        name="protein"
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        value={quickCalorie.food.protein}
                                        data-unit="g"
                                        placeholder="optional"
                                        className="w-20 px-1 border-[1px] focus:outline-pink-500 rounded-md bg-slate-50"
                                        type="text"
                                    />
                                </div></td>
                                <td > <div className="relative">
                                    <input
                                        required
                                        name="calories"
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        value={quickCalorie.food.calories}
                                        data-unit="kcal"
                                        placeholder="required"
                                        className="w-20 px-1 border-[1px] focus:outline-pink-500 rounded-md bg-slate-50"
                                        type="text"
                                    />
                                </div></td>
                                <td><button className='flex items-center justify-center' onClick={addCustomFood}><TbSquareRoundedCheckFilled size={18} className='m-auto cursor-pointer hover:text-pink-500' /></button></td>
                            </tr>
                        </tbody>

                        {diary &&
                            <tfoot className='font-bold'>
                                <tr>
                                    <td onClick={handleAddButton} colSpan={2}><span className="flex flex-row items-center justify-center px-3 py-1.5 text-pink-500 rounded-lg cursor-pointer hover:bg-gray-100" ><IoIosAdd size={20} /> Add Quick Calorie</span></td>
                                    <td>{diary?.totalNutrient?.totalCarbs}</td>
                                    <td>{diary?.totalNutrient?.totalFat}</td>
                                    <td>{diary?.totalNutrient?.totalProtein}</td>
                                    <td>{diary?.totalNutrient?.totalCalories}</td>
                                    <td />
                                </tr>
                            </tfoot>
                        }
                    </table>
                ) : (
                    <>
                        <h2>THERE IS NO FOOD</h2>
                        <button onClick={handleAddButton} ><span className="flex flex-row items-center justify-center px-3 py-1.5 text-pink-500 rounded-lg cursor-pointer hover:bg-gray-100" ><IoIosAdd size={20} /> Add custom food</span></button>
                    </>
                )}
            </div>
        </>

    )
}

export default DiaryCardComponent