import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TbSquareRoundedCheckFilled } from 'react-icons/tb';
import * as Yup from 'yup';

const QuickCalorieForm = () => {
    const validationSchema = Yup.object().shape({
        // Define validation rules here
        carbs: Yup.string(),
        fat: Yup.string(),
        protein: Yup.string(),
        calories: Yup.string().required('Required'),
    });

    return (
        <div className=''>
            <Formik
                initialValues={{
                    carbs: '',
                    fat: '',
                    protein: '',
                    calories: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    // Reset the form after submission
                    resetForm();
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>

                        <tr>

                            <td>

                                <Field
                                    type="text"
                                    name="carbs"
                                    placeholder="optional"
                                    className="w-20 px-1 border-[1px] focus:outline-pink-500 rounded-md bg-slate-50"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.carbs}
                                />

                            </td>
                            <td>
                                <Field
                                    type="text"
                                    name="fat"
                                    placeholder="required"
                                    className="w-20 px-1 border-[1px] focus:outline-pink-500 rounded-md bg-slate-50"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fat}
                                />
                            </td>
                            <td>
                                <Field
                                    type="text"
                                    name="protein"
                                    placeholder="optional"
                                    className="w-20 px-1 border-[1px] focus:outline-pink-500 rounded-md bg-slate-50"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.protein}
                                />
                            </td>
                            <td>
                                <Field
                                    type="text"
                                    name="calories"
                                    placeholder="required"
                                    className="w-20 px-1 border-[1px] focus:outline-pink-500 rounded-md bg-slate-50"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.calories}
                                />
                            </td>
                            <td><button type="submit"><TbSquareRoundedCheckFilled size={18} className='cursor-pointer hover:text-pink-500' /></button></td>
                        </tr>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default QuickCalorieForm;
