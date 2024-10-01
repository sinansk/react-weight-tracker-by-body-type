import React from 'react'
import { useSelector } from 'react-redux';

const TotalCalorieCard = ({ className, selectedDate }) => {

    const userDiary = useSelector((state) => state.userDiary);
    const diary = userDiary.calorieDiary.find((entry) => entry.date === selectedDate);
    const columns = [
        { id: "activity", label: "Activity" },
        { id: "calorie", label: "Calorie" },

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
    return (
        <div className={`${className} p-5 pt-0 mx-auto shadow-lg rounded-xl bg-white w-[600px] h-fit`}>
            <h2 className='p-2 my-auto text-lg'>{selectedDate}</h2>
            <table className='min-w-full p-5 divide-y divide-gray-200'>
                <TableHeader columns={columns} />
                <tbody className="bg-white divide-y divide-gray-200 text-slate-700">
                    <tr className=''>
                        <td className='px-3 py-2 '>Foods</td>
                        <td className=''>{diary?.totalNutrient?.totalCalories}</td>
                    </tr>
                    <tr>
                        <td className='px-3 py-2 '>Exercise</td>
                        <td className='px-3 py-2 '>0</td>
                    </tr>
                </tbody>
                <tfoot className='font-bold'>
                    <tr>
                        <td className=''>Total Calorie</td>
                        <td className=''>3000kcal</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default TotalCalorieCard