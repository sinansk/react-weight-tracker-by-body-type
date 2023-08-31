import React, { useEffect, useRef, useState } from 'react'
import DiaryCardComponent from '../components/MembershipComponents/DiaryCardComponent'
import SearchFoodComponent from '../components/MembershipComponents/SearchFoodComponent'
import Calendar from '../components/Calendar'
import { useSelector } from 'react-redux'
import moment from 'moment'
import TotalCalorieCard from '../components/MembershipComponents/TotalCalorieCard'
import StickyInfo from '../components/StickyInfo'
import PieChartComponent from '../components/CommonComponents/Charts/PieChartComponent'
import SelectInput from '../components/CommonComponents/SelectInput'
import Select from 'react-select'

const CalorieTracker = () => {
    const userDiary = useSelector((state) => state.userDiary)
    const calendar = useSelector((state) => state.userDiary?.calendarDate)
    const calendarDate = calendar ? moment(calendar).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY');
    const handleDateClick = (date) => {
        setCalendarExpand(!calendarExpand)
        // setSelectedDate(date);
    };

    const diaryDates = userDiary.calorieDiary?.map((diaryItem) => diaryItem.date);
    const [calendarExpand, setCalendarExpand] = useState(false)
    const macroNeeds = useSelector((state) => state.userRecords?.records?.find((item) => item.data.date === calendarDate).data?.results?.macroNeed)
    console.log(macroNeeds, "macroNeeds")
    const data = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
    ];

    const diets = [
        { value: macroNeeds.balanced, label: "Balanced" },
        { value: macroNeeds.highprotein, label: "High-Protein" },
        { value: macroNeeds.lowcarbs, label: "Low-Carb" },
        { value: macroNeeds.lowfat, label: "Low-Fat" },
    ]

    const [selectedOption, setSelectedOption] = useState("");
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    useEffect(() => {
        console.log(selectedOption, "selectedOption")
    }, [selectedOption])

    const chartData = [
        { name: "Fat", value: selectedOption?.value?.fat },
        { name: "Carbs", value: selectedOption?.value?.carbs },
        { name: "Protein", value: selectedOption?.value?.protein },
    ];
    return (
        <div className='flex flex-col-reverse sm:grid sm:grid-cols-7'>
            <div className=' sm:py-10 sm:col-span-2'>
                <Select className='w-1/2 mx-auto text-black' inputLabel="Select" options={diets} value={selectedOption} onChange={handleSelectChange} />
                <PieChartComponent data={chartData} />
            </div>
            <div className='sm:col-span-3 flex flex-col sm:py-10 sm:overflow-hidden sm:px-20 px-1.5 calorie-tracker-page'>
                <div className=''>
                    {calendarDate &&
                        <DiaryCardComponent
                            className={`${calendarExpand && `hidden`} max-w-full`}
                            selectedDate={calendarDate}
                            calendarExpand={calendarExpand}
                            setCalendarExpand={setCalendarExpand} />}
                    <Calendar
                        className={`${!calendarExpand && `hidden`} sm:w-[550px] w-full max-w-fit py-5 mx-auto text-gray-200 border-teal-600 border-2 shadow-lg rounded-xl `}
                        diaryDates={diaryDates}
                        onDateClick={handleDateClick}
                        showContextMenu={true}
                    />
                    <SearchFoodComponent className=" sm:w-[600px] mx-auto max-w-full search-food" selectedDate={calendarDate} />
                    <StickyInfo />
                </div>
                {/* <div className='flex flex-col gap-16'>
                    <TotalCalorieCard className="" selectedDate={selectedDate} /> 
                     {selectedDate && <DiaryCardComponent className={`${calendarExpand && `hidden`} max-w-full`} selectedDate={selectedDate} calendarExpand={calendarExpand} setCalendarExpand={setCalendarExpand} />
                </div> */}
            </div>
            <div className='sm:col-span-2 '>
            </div>
        </div>
    )
}

export default CalorieTracker