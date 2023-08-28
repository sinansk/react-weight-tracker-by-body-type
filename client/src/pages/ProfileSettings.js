import React from 'react'
import ButtonPrimary from '../components/CommonComponents/ButtonPrimary'
import { useDispatch, useSelector } from 'react-redux'
import { createModal } from '../utils/modalHooks'
import { deleteAccount } from '../firebase'
import SelectInput from '../components/CommonComponents/SelectInput'
import { bodyTypes } from '../data'
import InputPrimary from '../components/CommonComponents/InputPrimary'
import { setInput } from '../redux/userRedux'
import { BiSolidRightArrow } from 'react-icons/bi'
const ProfileSetting = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <div className='flex flex-col w-full h-full min-h-full'>
            <form onSubmit={''}>
                <div className='w-screen grid-cols-2 row-span-2 p-2 text-gray-700 shadow-lg sm:grid sm:p-10 bg-gray-800/60 md:w-1/2 lg:h-full sm:m-auto rounded-xl '>
                    <div className='flex flex-col items-start justify-center col-span-1 gap-2 sm:p-5'>
                        <h1 className='text-2xl text-left text-gray-200 '>Profile Settings</h1>
                        <label htmlFor="firstName" className='text-sm font-semibold text-gray-200'>First Name</label>
                        <input id="firstName" defaultValue={user?.currentUser.firstName} type="text" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='First Name' />
                        <label htmlFor="lastName" className='text-sm font-semibold text-gray-200'>Last Name</label>
                        <input id="lastName" defaultValue={user?.currentUser.lastName} type="text" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Last Name' />
                        <InputPrimary name="birthDay" type="date" label="Birth Day" className="w-full text-gray-200 h-9" reduxName="personalInfo" />
                        <label htmlFor="bodyType" className="-mb-3 text-gray-200 sm:mb-0">
                            Body Type
                        </label>
                        <div className='flex items-center justify-between w-full gap-3'>
                            <select
                                disabled
                                className="w-full text-center bg-white border-2 rounded-lg h-9 border-slate-400 outline-slate-500"
                                id="bodyType"
                                name="bodyType"
                                value={user.data?.personalInfo?.bodyType}
                                onChange={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))}
                                onBlur={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))}
                            >
                                {bodyTypes.map((bodyType) => (
                                    <option key={bodyType.value} value={bodyType.value}>
                                        {bodyType.value}
                                    </option>
                                ))}
                            </select>
                            <BiSolidRightArrow className="hidden float-right w-8 h-8 text-teal-500 sm:block" />
                        </div>
                        <label htmlFor="gender" className='text-sm font-semibold text-gray-200'>Gender</label>
                        <SelectInput id="gender" name="gender" reduxName="personalInfo" className='w-full border-gray-400 rounded-md ' options={['male', 'female']} />
                        <label htmlFor="email" className='text-sm font-semibold text-gray-200'>Email</label>
                        <input id="email" defaultValue={user.currentUser.email} type="email" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Email' />
                        <label htmlFor="password" className='text-sm font-semibold text-gray-200'>Password</label>
                        <input id="password" defaultValue="" type="password" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Password' />
                        <label htmlFor="confirmPassword" className='text-sm font-semibold text-gray-200'>Confirm Password</label>
                        <input id="confirmPassword" defaultValue="" type="password" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Confirm Password' />
                    </div>
                    <div className='flex flex-col col-span-1 gap-3 p-2 text-gray-200 sm:p-5'>
                        <h1 className='text-2xl text-center text-gray-200'>INFO</h1>
                        {/* <img src={user?.data?.personalInfo?.avatar} alt="" className='object-cover w-10 h-10 rounded-xl' /> */}
                        <div className=''>
                            <h3>Changing your gender, birthday and body type will effect your calculations. We will recalculate your results.</h3>
                            <div className='mt-5 border border-teal-500 border-dashed rounded-lg sm:p-4'>

                                <h2 className='text-lg font-semibold uppercase '>If you would like to learn your body type again, </h2>
                                <span className="flex flex-col items-center h-full">

                                    <img
                                        className="h-20 md:my-3"
                                        src={require(`../assets/washing-hands-male.png`)}
                                        alt="washing-hands"
                                    />
                                    <p className="text-xs font-semibold sm:text-base">
                                        Please wrap your thumb and forefinger around your wrist in the area
                                        you normally wear a watch!
                                    </p>
                                    <form className="text-center md:mt-auto xl:mt-auto ">
                                        <SelectInput options={bodyTypes} label="My Fingers Are," name="bodyType" reduxName='personalInfo' />
                                    </form>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-start col-span-2 col-start-1 row-start-2 gap-3'>
                        <ButtonPrimary type='submit' className='w-1/2'>Save</ButtonPrimary>
                    </div>
                </div>
                <button
                    onClick={() => createModal("ReAuthModal", {
                        onConfirm: async () => {
                            await deleteAccount()
                        }
                    })}
                    className='text-sm font-semibold text-red-500 hover:text-red-400 hover:underline'>
                    Delete my account
                </button>
            </form>
        </div>
    )
}

export default ProfileSetting