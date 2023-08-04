import React from 'react'
import { setInput } from "../../redux/userRedux"
import { createModal } from '../../utils/modalHooks';
import { useDispatch, useSelector } from 'react-redux'
import useUpdateUserInfo from '../../utils/useUpdateUserInfo';

const MeasurementsModal = (data) => {
    const userPersonalInfo = useSelector((state) => state.user.data.personalInfo)
    const measurements = Object.keys(userPersonalInfo).filter((key) =>
        ["arm", "calve", "chest", "forearm", "wrist", "hip", "neck", "shoulder", "thigh", "waist"].includes(key)
    ).sort()
    const dispatch = useDispatch()
    const updateUserInfo = useUpdateUserInfo()

    const handleUpdate = async () => {
        if (data.data?.willOpenModal) {
            createModal(data.data.willOpenModal)
        } else {
            updateUserInfo()
        }
    }

    return (

        userPersonalInfo &&
        <div className=''>
            <ul className="grid gap-2">
                {measurements?.map((key) => (
                    <li key={key}>
                        <span>{key}: </span>
                        <input className="w-full h-10 px-4 font-thin transition-all duration-200 ease-in-out rounded-md outline-none peer bg-gray-50 drop-shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-400" type="number" defaultValue={userPersonalInfo[key]} name={key} onChange={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))} />
                    </li>
                ))}
            </ul>
            <button onClick={handleUpdate} className="h-10 mt-5 w-full font-semibold text-center grid content-center bg-pink-700 px-1 py-2.5 text-white hover:bg-pink-500 rounded-sm">UPDATE</button>
        </div>

    )
}

export default MeasurementsModal