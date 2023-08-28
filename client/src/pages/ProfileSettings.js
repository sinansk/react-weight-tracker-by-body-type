import React from 'react'
import ButtonPrimary from '../components/CommonComponents/ButtonPrimary'
import { useDispatch, useSelector } from 'react-redux'
import { createModal } from '../utils/modalHooks'
import { deleteAccount, reAuth, updateEmail, updatePassword, updatePasswordHandle, updateProfileHandle } from '../firebase'
import SelectInput from '../components/CommonComponents/SelectInput'
import { bodyTypes } from '../data'
import InputPrimary from '../components/CommonComponents/InputPrimary'
import { setInput } from '../redux/userRedux'
import { BiSolidHide, BiSolidRightArrow, BiSolidShow } from 'react-icons/bi'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import useUpdateUserInfo from '../utils/useUpdateUserInfo'
const ProfileSetting = () => {
    const [showPassword, setShowPassword] = React.useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const updateUserInfo = useUpdateUserInfo()
    const handleSubmit = async ({ values }) => {
        const userChanges = {
            displayName: values.displayName !== user.currentUser.displayName,
            email: values.email !== user.currentUser.email,
            password: values.password === values.confirmPassword,
            birthDay: values.birthDay !== user.data.personalInfo.birthDay,
            bodyType: values.bodyType !== user.data.personalInfo.bodyType,
            gender: values.gender !== user.data.personalInfo.gender,
        };
        console.log(userChanges, "userChanges")
        console.log(values.birthDay, "values.birthDay", user.data.personalInfo.birthDay, "user.data.personalInfo.birthDay")
        // Check if any of the fields that trigger updateUserInfo have changed
        if (userChanges.displayName) {
            createModal('ReAuthModal', {
                onConfirm: async (password) => {
                    await updateProfileHandle(password, { displayName: values.displayName });
                },
            });
        }

        if (userChanges.email) {
            createModal('ReAuthModal', {
                onConfirm: async (password) => {
                    await updateEmail(values.email, password);
                },
            });
        }

        if (userChanges.password) {
            createModal('ReAuthModal', {
                onConfirm: async (password) => {
                    await updatePasswordHandle(password, values.password);
                },
            });
        }

        if (userChanges.birthDay || userChanges.bodyType || userChanges.gender) {

            createModal('ReAuthModal', {
                onConfirm: async (password) => {
                    const result = await reAuth(password);
                    if (result === true) {
                        await dispatch(setInput({ name: 'birthDay', value: values.birthDay, reduxName: 'personalInfo' }))
                        await dispatch(setInput({ name: 'bodyType', value: values.bodyType, reduxName: 'personalInfo' }))
                        await dispatch(setInput({ name: 'gender', value: values.gender, reduxName: 'personalInfo' }))
                        await updateUserInfo();
                    }
                },
            });
        }
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        birthDay: Yup.date().required('Please enter your birthday'),
        bodyType: Yup.string().required('Please select your body type'),
        gender: Yup.string().required('Please select a gender'),
        email: Yup.string().email('Please enter a valid email'),
        password: Yup.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    return (
        <div className='flex flex-col w-full h-full min-h-full'>
            <Formik initialValues={{
                displayName: user?.currentUser?.displayName || '',
                birthDay: user?.data?.personalInfo?.birthDay || '',
                bodyType: user?.data?.personalInfo?.bodyType || '',
                gender: user?.data?.personalInfo?.gender || '',
                email: user?.currentUser?.email || '',
                password: '',
                confirmPassword: '',
            }} onSubmit={(values) => handleSubmit({ values })} validationSchema={validationSchema} >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form >
                        <div className='w-screen grid-cols-2 row-span-2 p-2 text-gray-700 shadow-lg sm:grid sm:p-10 bg-gray-800/60 md:w-1/2 lg:h-full sm:m-auto rounded-xl '>
                            <div className='flex flex-col items-start justify-center col-span-1 gap-2 sm:p-5'>
                                <h1 className='text-2xl text-left text-gray-200 '>Profile Settings</h1>
                                <div className='flex items-center justify-between'>
                                    <span className={`capitalize text-slate-200`}>Display Name: </span>
                                    <ErrorMessage
                                        name='displayName'
                                        component="div"
                                        className="text-red-500 "
                                    />
                                </div>
                                <Field value={values.displayName} name="displayName" type="text" label="Display Name" className="w-full h-9" placeHolder="John Doe" />

                                {/* <label htmlFor="firstName" className='text-sm font-semibold text-gray-200'>First Name</label>
                                <input id="firstName" defaultValue={user?.currentUser.firstName} type="text" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='First Name' />
                                <label htmlFor="lastName" className='text-sm font-semibold text-gray-200'>Last Name</label>
                                <input id="lastName" defaultValue={user?.currentUser.lastName} type="text" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Last Name' /> */}
                                <div className="flex flex-col items-start">
                                    <label htmlFor="birthDay" className="-mb-3 text-gray-200 sm:mb-0"> Birthday</label>
                                    <input type="date"
                                        id='birthDay'
                                        className="border rounded sm:h-[38px] border-[hsl(0,0%,80%)] text-black"
                                        name="birthDay"
                                        onChange={handleChange}
                                        value={values.birthDay}
                                    />
                                </div>
                                {/* <InputPrimary name="birthDay" type="date" label="Birth Day" className="w-full text-gray-200 h-9" /> */}
                                <label htmlFor="bodyType" className="-mb-3 text-gray-200 sm:mb-0">
                                    Body Type
                                </label>
                                <div className='flex items-center justify-between w-full gap-3'>
                                    <select
                                        disabled
                                        className="w-full text-center bg-white border-2 rounded-lg h-9 border-slate-400 outline-slate-500"
                                        id="bodyType"
                                        name="bodyType"
                                        value={values?.bodyType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                <select
                                    className="w-full text-center bg-white border-2 rounded-lg h-9 border-slate-400 outline-slate-500"
                                    id='gender'
                                    name='gender'
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value={'female'}>Female</option>
                                    <option value={'male'}>Male</option>
                                </select>
                                {/* <SelectInput id="gender" name="gender" reduxName="personalInfo" className='w-full border-gray-400 rounded-md ' options={['male', 'female']} /> */}
                                <div className='flex items-center justify-between'>
                                    <span className={`capitalize text-slate-200`}>Email: </span>
                                    <ErrorMessage
                                        name='email'
                                        component="div"
                                        className="text-red-500 "
                                    />
                                </div>
                                <Field name="email" type="email" label="Email" className="w-full h-9" />
                                <div className='flex items-center justify-between'>
                                    <span className={`capitalize text-slate-200`}>Password: </span>
                                    <ErrorMessage
                                        name='password'
                                        component="div"
                                        className="text-red-500 "
                                    />
                                </div>
                                <Field name="password" type='password' label="Password" className="w-full h-9 " />
                                <div className='flex items-center justify-between'>
                                    <span className={`capitalize text-slate-200`}>Confirm Password: </span>
                                    <ErrorMessage
                                        name='confirmPassword'
                                        component="div"
                                        className="text-red-500 "
                                    />
                                </div>
                                <div className='relative flex items-center w-full'>
                                    <Field name="confirmPassword" type={showPassword ? 'text' : 'password'} label="Confirm Password" className="w-full h-9 text-slate-700" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className='absolute my-auto right-3 text-slate-800'>
                                        {showPassword ? <BiSolidHide className='w-6 h-6' /> : <BiSolidShow className='w-6 h-6' />}
                                    </button>
                                </div>
                                {/* <label htmlFor="email" className='text-sm font-semibold text-gray-200'>Email</label>
                                <input id="email" defaultValue={user.currentUser.email} type="email" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Email' />
                                <label htmlFor="password" className='text-sm font-semibold text-gray-200'>Password</label>
                                <input id="password" defaultValue="" type="password" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Password' />
                                <label htmlFor="confirmPassword" className='text-sm font-semibold text-gray-200'>Confirm Password</label>
                                <input id="confirmPassword" defaultValue="" type="password" className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Confirm Password' /> */}
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
                                                {/* <SelectInput options={bodyTypes} label="My Fingers Are," name="bodyType" reduxName='personalInfo' /> */}
                                                <label htmlFor="bodyType" className='text-base font-semibold text-gray-200 '>My fingers are</label>
                                                <select
                                                    defaultValue={user?.data?.personalInfo?.bodyType}
                                                    id="bodyType"
                                                    name="bodyType"
                                                    onChange={handleChange}
                                                    className="w-full text-center bg-white border-2 rounded-lg h-9 text-slate-700 border-slate-400 outline-slate-500">

                                                    {bodyTypes.map((bodyType) => (
                                                        <option key={bodyType.value} value={bodyType.value}>
                                                            {bodyType.status}
                                                        </option>
                                                    ))}
                                                </select>
                                            </form>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-start col-span-2 col-start-1 row-start-2 gap-3'>
                                <ButtonPrimary type='submit' className='w-1/2'>Save</ButtonPrimary>
                            </div>
                        </div>
                        <button type='button'
                            onClick={() => createModal("ReAuthModal", {
                                onConfirm: async (values) => {
                                    await deleteAccount(values)
                                }
                            })}
                            className='text-sm font-semibold text-red-500 hover:text-red-400 hover:underline'>
                            Delete my account
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileSetting