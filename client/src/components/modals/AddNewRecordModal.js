import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useUpdateUserInfo from "../../utils/useUpdateUserInfo"
import ButtonPrimary from "../CommonComponents/ButtonPrimary";
import SelectInput from "../CommonComponents/SelectInput";
import { activityLevels, bodyGoals } from "../../data";
import { setInput, setMeasurements } from "../../redux/userRedux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import PhotoUploadComponent from "../MembershipComponents/PhotoUploadComponent";

const AddNewRecordModal = () => {
    const dispatch = useDispatch()
    const userPersonalInfo = useSelector((state) => state.user.data.personalInfo)
    const userRecords = useSelector((state) => state.userRecords?.records)
    const userData = userRecords?.[0].data?.personalInfo ?? userPersonalInfo
    const measure = userRecords[0].data?.measurements
    const updateUserInfo = useUpdateUserInfo()
    const handleUpdate = async ({ values }) => {
        const { height, weight, ...measurements } = values
        await dispatch(setInput({ reduxName: 'personalInfo', name: 'height', value: height }))
        await dispatch(setInput({ reduxName: 'personalInfo', name: 'weight', value: weight }))
        await dispatch(setMeasurements(measurements))
        updateUserInfo()
    };

    const measurementValidationSchema = Yup.object().shape({
        weight: Yup.number().required("Please enter weight").positive("Value must be positive").integer("Value must be an integer"),
        height: Yup.number().required("Please enter height").positive("Value must be positive").integer("Value must be an integer"),
        ...Object.keys(measure).reduce((schema, key) => {
            return {
                ...schema,
                [key]: Yup.number()
                    .required(`Please enter ${key}`)
                    .positive("Value must be positive")
                    .integer("Value must be an integer"),
            };
        }, {})
    });

    return (
        <Formik initialValues={{
            // date: new Date(),
            weight: userData.weight,
            height: userData.height,
            ...Object.fromEntries(
                Object.entries(measure).map(([key, value]) => [key, value || ""])
            )
        }} onSubmit={(values) => handleUpdate({ values })} validationSchema={measurementValidationSchema} >
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form className="p-2 sm:p-5 bg-gradient-to-t from-teal-900 via-slate-700 to-slate-800 step7">
                    <div className="flex flex-col w-full h-full min-w-full min-h-full gap-2 lg:divide-x lg:grid lg:grid-cols-6 lg:grid-rows-2">
                        <div className="relative w-full col-span-3 col-start-1 row-span-2 row-start-1 p-2 mx-auto font-mono rounded-lg">
                            <div className="flex flex-col h-full sm:w-80">
                                <h2 className="text-xl font-semibold text-gray-200">Personal Info</h2>
                                <PhotoUploadComponent />
                                <div className="mt-auto text-gray-200">
                                    <div className='flex items-center justify-between'>
                                        <span className={`capitalize text-slate-200`}>Height: </span>
                                        <ErrorMessage
                                            name="height"
                                            component="div"
                                            className="text-red-500 "
                                        />
                                    </div>
                                    <Field
                                        required
                                        className={`${errors.height && touched.height ? 'border-red-500' : 'border-[hsl(0,0%,80%)] '} text-black w-full px-4 font-thin rounded outline-none lg:h-[38px] border-[1px] focus:border-2 focus:border-blue-400`}
                                        type="number"
                                        name="height"
                                        onChange={handleChange}
                                        value={values.height}
                                        reduxName='personalInfo'
                                    />
                                    <div className='flex items-center justify-between'>
                                        <span className={`capitalize text-slate-200`}>Weight: </span>
                                        <ErrorMessage
                                            name="weight"
                                            component="div"
                                            className="text-red-500 "
                                        />
                                    </div>
                                    <Field
                                        required
                                        className={`${errors.weight && touched.weight ? 'border-red-500' : 'border-[hsl(0,0%,80%)] '} text-black w-full px-4 font-thin rounded outline-none lg:h-[38px] border-[1px] focus:border-2 focus:border-blue-400`}
                                        type="number"
                                        name="weight"
                                        onChange={handleChange}
                                        value={values.weight}
                                        reduxName='personalInfo'
                                    />
                                    <SelectInput options={activityLevels} label="Activity Level:" name="activityLevel" className="min-w-full" reduxName='personalInfo' />
                                    <SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" className="min-w-full" reduxName='personalInfo' />
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full col-span-3 col-start-4 row-span-2 row-start-1 p-2 mx-auto font-mono rounded-lg ">
                            <div className="h-full m-auto sm:w-80">
                                <h2 className="mb-2 text-xl font-semibold text-gray-200">Measurements</h2>
                                {userData &&
                                    <div className=''>
                                        <ul className="grid">
                                            {Object.entries(measure).map(([key, value]) => (
                                                <li key={key}>
                                                    <div className='flex items-center justify-between'>
                                                        <span className={`capitalize text-slate-200`}>{key}: </span>
                                                        <ErrorMessage
                                                            name={key}
                                                            component="div"
                                                            className="text-red-500 "
                                                        />
                                                    </div>
                                                    <Field
                                                        required
                                                        className={`${errors[key] && touched[key] ? 'border-red-500' : 'border-[hsl(0,0%,80%)] '} w-full px-4 font-thin rounded outline-none lg:h-[38px] border-[1px] focus:border-2 focus:border-blue-400`}
                                                        type="number"
                                                        name={key}
                                                        onChange={handleChange}
                                                        value={values[key]}
                                                        reduxName='measurements'
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <ButtonPrimary type="submit" className="mx-auto " >CONFIRM</ButtonPrimary>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddNewRecordModal