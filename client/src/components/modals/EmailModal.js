import React, { useState } from 'react'
import ButtonPrimary from '../CommonComponents/ButtonPrimary'
import { useSelector } from 'react-redux'
import { resetPassword } from '../../firebase'

const EmailModal = () => {
    const [form, setForm] = useState({})
    const email = useSelector((state) => state.user?.currentUser?.email) || ''
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        console.log(form.email)
        e.preventDefault()
        await resetPassword(form.email)
    }
    return (
        <div className='w-full p-5 m-5 text-gray-900 rounded-xl sm:m-auto'>
            <form className='flex flex-col items-start gap-4' onSubmit={handleSubmit}>
                <label className='w-full text-lg text-left text-gray-900'>Please enter your e-mail</label>
                <input type="email" defaultValue={email} onChange={handleInputChange} className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Email' name="email" />
                <ButtonPrimary type="submit" className='w-full'>Confirm</ButtonPrimary>
            </form>
        </div>
    )
}

export default EmailModal