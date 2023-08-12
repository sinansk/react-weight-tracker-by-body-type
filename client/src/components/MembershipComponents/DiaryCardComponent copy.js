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

const DiaryCardComponent = ({ className, selectedDate, headerColumns, diaryEntry, diaryItems, initalCustomCalorie }) => {
    console.log(diaryEntry, "diaryEntry")

    console.log(diaryItems, "diaryItems");
    const dispatch = useDispatch()
    const uid = useSelector((state) => state.user.currentUser.uid)

    // const calorieDiary = useSelector((state) => state.userDiary.calorieDiary)

    const TableHeader = ({ headerColumns }) => {
        return (
            <thead className='w-full '>
                <tr>
                    {headerColumns.map((column) => (
                        <th colSpan={column.colSpan} key={column.id}>{column.label}</th>
                    ))}
                </tr>
            </thead>
        )
    }
    const [isQuickCalorie, setIsQuickCalorie] = useState(false)

    const [quickCalorie, setQuickCalorie] = useState(initalCustomCalorie)
    const handleAddButton = () => {
        // createModal("AddCustomFoodModal", { selectedDate: selectedDate })
        setIsQuickCalorie(!isQuickCalorie)

    }
    const handleInputChange = (e) => {
        const { name, value, dataset } = e.target;

        const trimmedValue = formatInputValue(value, dataset.unit);

        setQuickCalorie((prevQuickCalorie) => ({
            ...prevQuickCalorie,
            calorie: {
                ...prevQuickCalorie.calorie,
                [name]: trimmedValue,
            },
        }));
    };

    const handleInputFocus = (e) => {
        const { name, value, dataset } = e.target;

        const trimmedValue = formatInputValue(value, dataset.unit);

        setQuickCalorie((prevQuickCalorie) => ({
            ...prevQuickCalorie,
            calorie: {
                ...prevQuickCalorie.calorie,
                [name]: trimmedValue,
            },
        }));
    };

    const handleInputBlur = (e) => {
        const { name, value, dataset } = e.target;
        console.log(name, value, dataset, "name, value, dataset")
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
                calorie: {
                    ...prevQuickCalorie.calorie,
                    [name]: formattedValue + dataset.unit,
                },
            }));
    };

    useEffect(() => {
        console.log(quickCalorie, "quickCalorie")
    }, [quickCalorie])

    const addCustomFood = () => {
        addDailyCalorie(quickCalorie, diaryEntry, selectedDate)
        setIsQuickCalorie(false)
        setQuickCalorie(initalCustomCalorie)
    }
    return (

        <>
            <div className={`${className} p-5 pt-0 mx-auto shadow-lg rounded-xl bg-white w-[600px] h-fit`}>
                <h2 className='p-2 my-auto text-lg'>{selectedDate}</h2>
                {diaryItems ? (
                    <table className='min-w-full p-5 divide-y divide-gray-200'>
                        <TableHeader headerColumns={headerColumns} />

                        <tbody className="bg-white divide-y divide-gray-200 text-slate-700">
                            {diaryItems?.map((item, rowIndex) => (
                                <tr key={rowIndex} className=''>
                                    {headerColumns.map((column) => (
                                        <td className='px-3 py-2 ' key={column.id} colSpan={column.colSpan}>
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
                                        <DeleteButton onClick={() => deleteDailyCalorie(item, diaryEntry, selectedDate)} className="m-auto " size={18} />
                                    </td>
                                </tr>
                            ))}
                            <tr className={`${isQuickCalorie ? `table-row outline-dashed outline-2 outline-offset-1 ` : `hidden`}`}>
                                <td colSpan={2} className=''>
                                    Quick Calorie
                                </td>


                                {headerColumns.map((item) => (
                                    item.unit &&

                                    <td key={item.id} className=''>
                                        {console.log(item, "item")}
                                        <div className="relative">
                                            <input
                                                name={item.id}
                                                onChange={handleInputChange}
                                                onFocus={handleInputFocus}
                                                onBlur={handleInputBlur}
                                                value={quickCalorie.calorie[item.id]}
                                                data-unit={item.unit}
                                                placeholder={item.id === 'calories' ? 'required' : 'optional'}
                                                className="w-20 px-1 border-[1px] focus:outline-pink-500 rounded-md bg-slate-50"
                                                type="text"
                                            />
                                        </div>
                                    </td>
                                ))}

                                <td><button className='flex items-center justify-center' onClick={addCustomFood}><TbSquareRoundedCheckFilled size={18} className='m-auto cursor-pointer hover:text-pink-500' /></button></td>
                            </tr>
                        </tbody>

                        {diaryEntry &&
                            <tfoot className='font-bold'>
                                <tr>
                                    <td onClick={handleAddButton} colSpan={2}><span className="flex flex-row items-center justify-center px-3 py-1.5 text-pink-500 rounded-lg cursor-pointer hover:bg-gray-100" ><IoIosAdd size={20} /> Add Quick Calorie</span></td>
                                    <td>{diaryEntry?.totalNutrient?.totalCarbs}</td>
                                    <td>{diaryEntry?.totalNutrient?.totalFat}</td>
                                    <td>{diaryEntry?.totalNutrient?.totalProtein}</td>
                                    <td>{diaryEntry?.totalNutrient?.totalCalories}</td>
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