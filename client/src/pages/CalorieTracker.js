import React from 'react'
import DiaryCardComponent from '../components/MembershipComponents/DiaryCardComponent'
import SearchFoodComponent from '../components/MembershipComponents/SearchFoodComponent'

const CalorieTracker = () => {
    return (
        <div className='flex'>
            <SearchFoodComponent className="sm:w-[600px] mx-auto" />
            <DiaryCardComponent className="my-10" />
        </div>
    )
}

export default CalorieTracker