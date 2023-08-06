import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromDiary } from '../../redux/userDiary'
import DeleteButton from '../CommonComponents/DeleteButton'
import { deleteDailyCalorie } from '../../firebase'
import { IoIosAdd } from 'react-icons/io'
import { createModal } from '../../utils/modalHooks'
const DiaryCardComponent = ({ className, selectedDate }) => {
    console.log(selectedDate, "selectedDate")
    const dispatch = useDispatch()

    const userDiary = useSelector((state) => state.userDiary);

    // Seçilen tarihe ait kayıtları bulmak için döngü ile kontrol edelim.
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
    const handleAddButton = () => {
        createModal("AddCustomFoodModal", { selectedDate: selectedDate })
    }
    return (
        foods && (
            <>
                <div className={`${className} p-5 pt-0 mx-auto shadow-lg rounded-xl bg-white w-[600px] h-fit`}>
                    <h2 className='p-2 my-auto text-lg'>{diary.date}</h2>
                    <table className='min-w-full p-5 divide-y divide-gray-200'>
                        <TableHeader columns={columns} />
                        <tbody className="bg-white divide-y divide-gray-200 text-slate-700">
                            {foods?.map((item, rowIndex) => (
                                <tr key={rowIndex} className=''>
                                    {columns.map((column) => (
                                        <td className='px-3 py-2 ' key={column.id}>
                                            {column.id !== "food_name" ? (
                                                <p className='font-medium text-gray-600 text-md'>{item.food[column.id]}</p>
                                            ) : (
                                                <>
                                                    <p className='font-medium text-gray-600 text-md'>{item.food.food_name}</p>
                                                    <p className='text-gray-500'>{item.food?.brand_name}</p>
                                                </>
                                            )}
                                        </td>
                                    ))}
                                    <td className='ml-1 '>
                                        {/* <DeleteButton onClick={() => dispatch(deleteFromDiary(item))} className="my-auto" /> */}
                                        <DeleteButton onClick={() => deleteDailyCalorie(item, calorieDiary, selectedDate)} className="my-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        {diary &&
                            <tfoot className='font-bold'>
                                <tr>
                                    <td onClick={handleAddButton} colSpan={2}><span className="flex flex-row items-center justify-center px-3 py-1.5 text-pink-500 rounded-lg cursor-pointer hover:bg-gray-100" ><IoIosAdd size={20} /> Add custom food</span></td>
                                    <td>{diary?.totalNutrient?.totalCarbs}</td>
                                    <td>{diary?.totalNutrient?.totalFat}</td>
                                    <td>{diary?.totalNutrient?.totalProtein}</td>
                                    <td>{diary?.totalNutrient?.totalCalories}</td>
                                    <td />
                                </tr>
                            </tfoot>
                        }
                    </table>
                </div>
            </>
        )
    )
}

export default DiaryCardComponent