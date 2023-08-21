import React, { useEffect, useRef, useState } from 'react'
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
import toast from 'react-hot-toast'

const DiaryCardComponent = ({ className, selectedDate, calendarExpand, setCalendarExpand, handleAdd }) => {
    console.log(selectedDate, "selectedDateDiaryCrardComponent")
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
                        <th className={` `} key={column.id}>{column.label}</th>
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
        if (quickCalorie.food.calories !== undefined && quickCalorie.food.calories !== "") {
            dispatch(addDailyCalorie(quickCalorie, calorieDiary, selectedDate))
            setQuickCalorie(initalCustomFood)
        } else {
            toast.error("Please fill calories!")
        }
    }
    const handleCalendarExpand = () => {
        console.log("handleCalendarExpand")
        setCalendarExpand(!calendarExpand)
    }


    return (
        <>
            <div className={`${className} p-1 sm:p-5 text-xs sm:text-base pt-0 mx-auto shadow-lg rounded-xl text-gray-200 bg-gray-500/50 w-[600px] h-fit overflow-auto no-scrollbar`}>
                <h2 className='p-2 my-auto text-lg' onClick={handleCalendarExpand}>{selectedDate}</h2>
                {foods ? (
                    <table className='min-w-full p-5 divide-y divide-gray-200'>
                        <TableHeader columns={columns} />

                        <tbody className="divide-y divide-gray-200 ">
                            {foods?.map((item, rowIndex) => (
                                <tr key={rowIndex} className=''>
                                    {columns.map((column) => (
                                        <td className='px-1.5 py-1 sm:px-3 sm:py-2 ' key={column.id}>
                                            {column.id !== "food_name" ? (
                                                <p className='font-medium text-md'>{item[column.id]}</p>
                                            ) : (
                                                <>
                                                    <p className='font-medium text-md'>{item?.food_name}</p>
                                                    <p className='0'>{item?.brand_name}</p>
                                                </>
                                            )}
                                        </td>
                                    ))}
                                    <td className=''>
                                        <DeleteButton onClick={() => deleteDailyCalorie(item, calorieDiary, selectedDate)} className="w-3 h-3 m-auto sm:h-5 sm:w-5" />
                                    </td>
                                </tr>
                            ))}
                            <tr className={`${isQuickCalorie ? `table-row outline-dashed outline-2  outline-offset-1 ` : `hidden`}`}>
                                <td colSpan={2} className=''>
                                    Quick Calorie
                                </td>
                                {['carbs', 'fat', 'protein', 'calories'].map((nutrient) => (
                                    <td key={nutrient}>
                                        <div className="relative">
                                            <input
                                                name={nutrient}
                                                onChange={handleInputChange}
                                                onFocus={handleInputFocus}
                                                onBlur={handleInputBlur}
                                                value={quickCalorie.food[nutrient]}
                                                data-unit={nutrient === 'calories' ? 'kcal' : 'g'}
                                                placeholder={nutrient === 'calories' ? 'required' : 'optional'}
                                                className="w-12 sm:w-20 px-1 border-[1px] focus:outline-teal-500 rounded-md placeholder:text-gray-200 bg-slate-500"
                                                type="text"
                                            />
                                        </div>
                                    </td>
                                ))}
                                <td><button className='flex items-center justify-center' onClick={addCustomFood}><TbSquareRoundedCheckFilled size={18} className='m-auto text-teal-500 cursor-pointer hover:text-teal-400' /></button></td>
                            </tr>
                        </tbody>

                        {diary &&
                            <tfoot className='font-bold'>
                                <tr>
                                    <td onClick={handleAddButton} colSpan={2}><span className="flex flex-row items-center justify-center px-3 py-1.5  text-teal-500 rounded-lg cursor-pointer hover:bg-gray-400/40" ><IoIosAdd size={20} /> Add Quick Calorie</span></td>
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
                        {/* <button onClick={handleAdd} ><span className="flex flex-row items-center justify-center px-3 py-1.5 text-pink-500 rounded-lg cursor-pointer hover:bg-gray-100" ><IoIosAdd size={20} /> Add custom food</span></button> */}
                    </>
                )}
            </div>
        </>
    )
}

export default DiaryCardComponent