import React, { useState } from 'react'
import ButtonPrimary from '../CommonComponents/ButtonPrimary'
import { useSelector } from 'react-redux'
import { destroyModal } from '../../utils/modalHooks';

const SaveRoutineModal = (data) => {
    const [form, setForm] = useState({ routineName: "" });

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        data.data.onSubmit(form);
        destroyModal();
    };

    return (
        <div className='w-full p-2 m-2 text-gray-900 sm:p-5 rounded-xl sm:m-auto'>
            <form className='flex flex-col items-start gap-4' onSubmit={handleSubmit}>
                <label className='w-full text-lg font-semibold text-left text-gray-900'>Please enter a name for your diary routine</label>
                <input type="text" value={form.routineName} onChange={handleInputChange} className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='E.g Ketogenic' name="routineName" />
                <ButtonPrimary type="submit" className='w-full'>Confirm</ButtonPrimary>
            </form>
        </div>
    );
};

export default SaveRoutineModal;