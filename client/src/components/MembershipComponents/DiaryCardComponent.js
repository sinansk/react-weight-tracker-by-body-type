import React from 'react'
import { useSelector } from 'react-redux'

const DiaryCardComponent = ({ className }) => {
    const userDiary = useSelector((state) => state.userDiary)
    const diary = userDiary.calorieDiary
    console.log(diary.totalCalorie, "DiaryComponent")

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
            <thead className='w-full rounded-b-none bg-slate-50 rounded-xl'>
                <tr>
                    {columns.map((column) => (
                        <th key={column.id}>{column.label}</th>
                    ))}
                </tr>
            </thead>
        )
    }

    return (
        <div className={`${className} pb-10 mx-auto shadow-lg rounded-xl bg-white w-[600px] h-fit`}>
            <table className='min-w-full p-5 divide-y divide-gray-200'>
                <TableHeader columns={columns} />
                <tbody className="bg-white divide-y divide-gray-200 text-slate-700">
                    {diary?.map((item, rowIndex) => ( // Değişken ismini index'ten rowIndex olarak değiştirdim
                        <tr key={rowIndex} className=''>
                            {columns.map((column) => ( // index değişkenini kaldırdım
                                <td className='px-3 py-2 ' key={column.id}> {/* Key'i column.id olarak ekledim */}
                                    {column.id !== "food_name" ? (
                                        <p className='font-medium text-gray-600 text-md'>{item.food_detail[column.id]}</p>
                                    ) : (
                                        <>
                                            <p className='font-medium text-gray-600 text-md'>{item.food_detail.food_name}</p>
                                            <p className='text-gray-500'>{item.food_detail?.brand_name}</p>
                                        </>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}

                </tbody>

            </table>
            <div className='flex justify-end w-full border-t-2'>
                <p className="mr-10 font-semibold">{userDiary.totalCalorie}kcal</p>

            </div>
        </div>
    )
}

export default DiaryCardComponent