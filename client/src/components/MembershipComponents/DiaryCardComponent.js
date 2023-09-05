import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToDiary, deleteFromDiary } from '../../redux/userDiary'
import DeleteButton from '../CommonComponents/DeleteButton'
import { addDailyCalorie, copyDiary, deleteDailyCalorie, saveDiaryAsRoutine } from '../../firebase'
import { IoIosAdd } from 'react-icons/io'
import { createModal } from '../../utils/modalHooks'
import { TbSquareRoundedCheckFilled } from 'react-icons/tb'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { setCustomFoods } from '../../redux/customFoods'
import { formatInputValue } from '../../utils/formatInputValue'
import toast from 'react-hot-toast'
import SelectInput from '../CommonComponents/SelectInput'
import SearchDropdown from '../CommonComponents/SearchDropdown'
import ButtonPrimary from '../CommonComponents/ButtonPrimary'
import moment from 'moment'
import { AiFillSave } from 'react-icons/ai'

const DiaryCardComponent = ({ className, selectedDate, calendarExpand, setCalendarExpand, handleAdd }) => {
    console.log(selectedDate, "selectedDateDiaryCrardComponent")
    const dispatch = useDispatch()
    const uid = useSelector((state) => state.user.currentUser.uid)
    const userDiary = useSelector((state) => state.userDiary);

    const diary = userDiary.calorieDiary.find((entry) => entry.date === selectedDate);
    const [selectedOption, setSelectedOption] = useState("")
    const calorieDiary = useSelector((state) => state.userDiary.calorieDiary)
    const foods = diary?.foods;
    console.log(diary, "DiaryComponent");
    const calorieRoutines = useSelector((state) => state.userDiary.calorieRoutines)
    const columns = [
        { id: "amount", label: "Amount" },
        { id: "food_name", label: "Food" },
        { id: "carbs", label: "Carbs" },
        { id: "fat", label: "Fat" },
        { id: "protein", label: "Protein" },
        { id: "calories", label: "Calories" }
    ]

    const TableHeader = ({ className, columns }) => {
        return (
            <thead className={`${className} w-full `}>
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
        setCalendarExpand(!calendarExpand)
    }


    const searchDropdownOptions = calorieRoutines?.map((diary) => ({
        value: diary,
        label: diary?.name,
    }));


    const handleRoutine = async () => {
        await copyDiary({
            uid: uid,
            foods: selectedOption?.value.foods,
            totalNutrient: selectedOption?.value.totalNutrient,
            selectedDate: selectedDate
        })
    }
    const handleAddRoutine = async () => {
        createModal("SaveRoutineModal", {
            onSubmit: async (values) => {
                await saveDiaryAsRoutine({
                    uid,
                    selectedDate: selectedDate,
                    foods: diary?.foods,
                    totalNutrient: diary?.totalNutrient,
                    name: values.routineName
                })
            }
        })
    }
    return (
        <>
            <div className={`${className} p-1 sm:p-5 text-xs sm:text-base pt-0 mx-auto shadow-lg rounded-xl text-gray-200  bg-gray-500/50 w-[600px] h-fit sm:max-h-[700px] overflow-auto no-scrollbar`}>
                <div className='relative flex items-center'>
                    <h2 className='p-2 m-auto text-lg' onClick={handleCalendarExpand}>{selectedDate}</h2>
                    {diary &&
                        <button title='Save As Routine' onClick={handleAddRoutine} className='float-right hover:text-teal-500'><AiFillSave className='w-5 h-5 sm:w-8 sm:h-8' /></button>
                    }
                </div>
                {foods ? (
                    <table className='min-w-full p-5 divide-y divide-gray-100'>
                        <TableHeader columns={columns} />
                        <tbody className="divide-y divide-gray-400 ">
                            {foods?.map((item, rowIndex) => (
                                <tr key={rowIndex} className=''>
                                    {columns.map((column) => (
                                        <td className='px-1.5 py-1 sm:px-3 sm:py-2 ' key={column.id} title={column.id}>
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
                                    <td title='Total Carbs'>{diary?.totalNutrient?.totalCarbs}</td>
                                    <td title='Total Fat'>{diary?.totalNutrient?.totalFat}</td>
                                    <td title='Total Protein'>{diary?.totalNutrient?.totalProtein}</td>
                                    <td title='Total Calories'>{diary?.totalNutrient?.totalCalories}</td>
                                    <td />
                                </tr>
                            </tfoot>
                        }
                    </table>
                ) : (
                    <div className='flex flex-col items-center gap-5 justify-evenly'>
                        <h2>THERE IS NO FOOD</h2>
                        {calorieRoutines && (
                            <div className='choose-routine'>
                                <h2>YOU CAN ADD FROM ROUTINES</h2>
                                <div className='z-50 flex items-center justify-center gap-5 mt-5 text-slate-700'>
                                    <SearchDropdown
                                        menuPortalTarget={document.body}
                                        className={`w-64 rounded-xl`}
                                        selectedOption={selectedOption}
                                        setSelectedOption={setSelectedOption}
                                        options={searchDropdownOptions}
                                    />
                                    <ButtonPrimary onClick={handleRoutine}>ADD</ButtonPrimary>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default DiaryCardComponent