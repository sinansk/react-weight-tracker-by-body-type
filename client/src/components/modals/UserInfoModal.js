import React from 'react'
import { createModal } from '../../utils/modalHooks'
import SelectInput from '../SelectInput'
import { activityLevels, ages, bodyGoals, bodyTypes, heights, weights } from '../../data'
import useUpdateUserInfo from '../../utils/useUpdateUserInfo'

const UserInfoModal = (data) => {

    const updateUserInfo = useUpdateUserInfo()
    const handleUpdate = async () => {
        if (data.data?.willOpenModal) {
            createModal("MeasurementsModal", {
                willOpenModal: false
            })
        } else {
            updateUserInfo()
        }
    }

    return (
        <div className="grid grid-cols-2 gap-2 h-4/5  sm:w-80">
            <div><SelectInput options={ages} label="Age," name="age" /></div>
            <div><SelectInput options={bodyTypes} label="My fingers are," name="bodyType" /></div>
            <div><SelectInput options={heights} label="Height" name="height" /></div>
            <div><SelectInput options={activityLevels} label="Activity Level:" name="activityLevel" /> </div>
            <div><SelectInput options={weights} label="Weight" name="weight" /></div>
            <div><SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" /></div>
            <button className="h-10 mt-5 col-span-2 font-semibold text-center grid content-center bg-indigo-700 px-1 py-2.5 text-white hover:bg-indigo-500 rounded-sm" onClick={handleUpdate} >UPDATE</button>
        </div>
    )
}

export default UserInfoModal