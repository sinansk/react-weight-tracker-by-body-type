import React from 'react'
import ButtonPrimary from '../components/CommonComponents/ButtonPrimary'
import { useDispatch, useSelector } from 'react-redux'
import { createModal } from '../utils/modalHooks'
import { deleteAccount } from '../firebase'
import SelectInput from '../components/CommonComponents/SelectInput'
import { bodyTypes } from '../data'
import InputPrimary from '../components/CommonComponents/InputPrimary'
const ProfileSetting = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.currentUser)
    return (
        <div className='flex flex-col w-full h-full min-h-full'>
            <form onSubmit={''}>
                <div className='w-screen grid-cols-2 row-span-2 p-2 text-gray-700 shadow-lg sm:grid sm:p-10 bg-gray-800/60 md:w-1/2 lg:h-full sm:m-auto rounded-xl '>
                    <div className='flex flex-col items-start justify-center col-span-1 gap-2 sm:p-5'>
                        <h1 className='text-2xl text-left text-gray-200 '>Profile Settings</h1>
                        {/* <input type="text" className='w-1/2 px-2 py-1 border-2 border-gray-400 rounded-md' placeholder='First Name' />
                    <input type="text" className='w-1/2 px-2 py-1 border-2 border-gray-400 rounded-md' placeholder='Last Name' /> */}
                        <label htmlFor="firstName" className='text-sm font-semibold text-gray-200'>First Name</label>
                        <input id="firstName" defaultValue={user?.firstName} type="text" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='First Name' />
                        <label htmlFor="lastName" className='text-sm font-semibold text-gray-200'>Last Name</label>
                        <input id="lastName" defaultValue={user?.lastName} type="text" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Last Name' />

                        <InputPrimary name="birthDay" type="date" label="Birth Day" className="w-full text-gray-200" reduxName="personalInfo" />
                        <label htmlFor='bodyType' className='text-sm font-semibold text-gray-200'>Body Type</label>
                        <SelectInput disabled id='bodyType' name="bodyType" className='w-full border-gray-400 rounded-md ' options={bodyTypes} reduxName={'personalInfo'} />
                        <label htmlFor="gender" className='text-sm font-semibold text-gray-200'>Gender</label>
                        <SelectInput id="gender" name="gender" reduxName="personalInfo" className='w-full border-gray-400 rounded-md ' options={['male', 'female']} />
                        <label htmlFor="email" className='text-sm font-semibold text-gray-200'>Email</label>
                        <input id="email" defaultValue={user.email} type="email" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Email' />
                        <label htmlFor="password" className='text-sm font-semibold text-gray-200'>Password</label>
                        <input id="password" defaultValue=" " type="password" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Password' />
                        <label htmlFor="confirmPassword" className='text-sm font-semibold text-gray-200'>Confirm Password</label>
                        <input id='confirmPassword' type="password" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Confirm Password' />
                    </div>
                    <div className='flex flex-col items-start col-span-1 text-gray-200 sm:p-5'>
                        <h1 className='text-2xl text-left text-gray-200'>SOME HEADING</h1>
                        <img src={user?.data?.personalInfo?.avatar} alt="" className='object-cover w-10 h-10 rounded-xl' />
                        <div>
                            <h3>Some Info Heading</h3>
                            <p>Some Info</p>
                            <p>Some Info</p>
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