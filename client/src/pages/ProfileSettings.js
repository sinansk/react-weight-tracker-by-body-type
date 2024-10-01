import React from "react";
import ButtonPrimary from "../components/CommonComponents/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { createModal } from "../utils/modalHooks";
import {
  deleteAccount,
  reAuth,
  updateEmail,
  updatePasswordHandle,
  updateProfileHandle,
} from "../firebase";
import { bodyTypes } from "../data";
import { setInput } from "../redux/userRedux";
import { BiSolidHide, BiSolidRightArrow, BiSolidShow } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useUpdateUserInfo from "../utils/useUpdateUserInfo";
import { useAuth } from "../context/AuthContext";
const ProfileSetting = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const updateUserInfo = useUpdateUserInfo();
  const handleSubmit = async ({ values }) => {
    const userChanges = {
      displayName: values.displayName !== user.currentUser.displayName,
      email: values.email !== user.currentUser.email,
      password:
        values.password.length >= 6 &&
        values.password === values.confirmPassword,
      birthDay: values.birthDay !== user.data.personalInfo.birthDay,
      bodyType: values.bodyType !== user.data.personalInfo.bodyType,
      gender: values.gender !== user.data.personalInfo.gender,
    };
    console.log(userChanges, "userChanges");
    console.log(
      values.birthDay,
      "values.birthDay",
      user.data.personalInfo.birthDay,
      "user.data.personalInfo.birthDay"
    );
    // Check if any of the fields that trigger updateUserInfo have changed
    if (userChanges.displayName) {
      createModal("ReAuthModal", {
        onConfirm: async (password) => {
          await updateProfileHandle(password, {
            displayName: values.displayName,
          });
        },
      });
    }

    if (userChanges.email) {
      createModal("ReAuthModal", {
        onConfirm: async (password) => {
          await updateEmail(values.email, password);
        },
      });
    }

    if (userChanges.password) {
      createModal("ReAuthModal", {
        onConfirm: async (password) => {
          await updatePasswordHandle(password, values.password);
        },
      });
    }

    if (userChanges.birthDay || userChanges.bodyType || userChanges.gender) {
      createModal("ReAuthModal", {
        onConfirm: async (password) => {
          const result = await reAuth(password);
          if (result === true) {
            await dispatch(
              setInput({
                name: "birthDay",
                value: values.birthDay,
                reduxName: "personalInfo",
              })
            );
            await dispatch(
              setInput({
                name: "bodyType",
                value: values.bodyType,
                reduxName: "personalInfo",
              })
            );
            await dispatch(
              setInput({
                name: "gender",
                value: values.gender,
                reduxName: "personalInfo",
              })
            );
            await updateUserInfo();
          }
        },
      });
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    birthDay: Yup.date().required("Please enter your birthday"),
    bodyType: Yup.string().required("Please select your body type"),
    gender: Yup.string().required("Please select a gender"),
    email: Yup.string().email().required("Please enter a valid email"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <div className="flex flex-col w-full h-full min-h-full sm:mt-20 ">
      <Formik
        initialValues={{
          displayName: user?.currentUser?.displayName || "",
          birthDay: user?.data?.personalInfo?.birthDay || "",
          bodyType: user?.data?.personalInfo?.bodyType || "",
          gender: user?.data?.personalInfo?.gender,
          email: user?.currentUser?.email,
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => handleSubmit({ values })}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div className="w-screen grid-cols-2 row-span-2 p-2 text-gray-700 shadow-lg sm:grid sm:p-10 bg-gray-800/60 md:w-1/2 lg:h-full sm:m-auto rounded-xl ">
              <div className="flex flex-col items-start justify-center col-span-1 gap-2 sm:p-5">
                <h1 className="text-2xl text-left text-gray-200 ">
                  Profile Settings
                </h1>
                <div className="flex items-center justify-between">
                  <span className={`capitalize text-slate-200`}>Username </span>
                  <ErrorMessage
                    name="displayName"
                    component="div"
                    className="text-red-500 "
                  />
                </div>
                <Field
                  value={values.displayName}
                  name="displayName"
                  type="text"
                  label="Display Name"
                  className="w-full px-2 rounded-md h-9"
                  placeHolder="John Doe"
                />

                <label htmlFor="birthDay" className="text-gray-200">
                  {" "}
                  Birthday
                </label>
                <input
                  type="date"
                  id="birthDay"
                  className="border rounded-md h-9 border-[hsl(0,0%,80%)] text-black"
                  name="birthDay"
                  onChange={handleChange}
                  value={values.birthDay}
                />

                <label htmlFor="bodyType" className="text-gray-200 ">
                  Body Type
                </label>
                <div className="flex items-center justify-between w-full gap-3">
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
                <label
                  htmlFor="gender"
                  className="text-sm font-semibold text-gray-200"
                >
                  Gender
                </label>
                <select
                  className="w-full text-center bg-white border-2 rounded-md h-9 border-slate-400 outline-slate-500"
                  id="gender"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={"female"}>Female</option>
                  <option value={"male"}>Male</option>
                </select>
                <div className="flex items-center justify-between">
                  <span className={`capitalize text-slate-200`}>Email </span>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 "
                  />
                </div>
                <Field
                  required
                  name="email"
                  type="email"
                  label="Email"
                  className="w-full px-2 rounded-md h-9"
                />
                <div className="flex items-center justify-between">
                  <span className={`capitalize text-slate-200`}>Password </span>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 "
                  />
                </div>
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  className="w-full px-2 rounded-md h-9 "
                />
                <div className="flex items-center justify-between">
                  <span className={`capitalize text-slate-200`}>
                    Confirm Password{" "}
                  </span>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 "
                  />
                </div>
                <div className="relative flex items-center w-full">
                  <Field
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    label="Confirm Password"
                    className="w-full px-2 rounded-md h-9 text-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute my-auto right-3 text-slate-800"
                  >
                    {showPassword ? (
                      <BiSolidHide className="w-6 h-6" />
                    ) : (
                      <BiSolidShow className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col col-span-1 gap-3 p-2 text-gray-200 sm:p-5">
                <h1 className="text-2xl text-center text-gray-200">INFO</h1>
                <div className="">
                  <h3>
                    Changing your gender, birthday and body type will effect
                    your calculations. We will recalculate your results.
                  </h3>
                  <div className="mt-5 border border-teal-500 border-dashed rounded-lg sm:p-4">
                    <h2 className="text-lg font-semibold uppercase ">
                      If you would like to learn your body type again,{" "}
                    </h2>
                    <span className="flex flex-col items-center h-full">
                      <img
                        className="h-20 md:my-3"
                        src={require(`../assets/washing-hands-male.png`)}
                        alt="washing-hands"
                      />
                      <p className="text-xs font-semibold sm:text-base">
                        Please wrap your thumb and forefinger around your wrist
                        in the area you normally wear a watch!
                      </p>
                      <form className="p-3 text-center md:mt-auto xl:mt-auto">
                        <label
                          htmlFor="bodyType"
                          className="text-base font-semibold text-gray-200 underline"
                        >
                          My fingers are
                        </label>
                        <select
                          defaultValue={user?.data?.personalInfo?.bodyType}
                          id="bodyType"
                          name="bodyType"
                          onChange={handleChange}
                          className="w-full text-center bg-white border-2 rounded-lg h-9 text-slate-700 border-slate-400 outline-slate-500"
                        >
                          {bodyTypes.map((bodyType) => (
                            <option key={bodyType.value} value={bodyType.value}>
                              {bodyType.status}
                            </option>
                          ))}
                        </select>
                      </form>
                      <p className="text-base font-semibold">
                        Your body type is{" "}
                        <span className="text-teal-500">{values.bodyType}</span>
                      </p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-start col-span-2 col-start-1 row-start-2 gap-3">
                <ButtonPrimary type="submit" className="w-1/2">
                  Save
                </ButtonPrimary>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                createModal("ReAuthModal", {
                  onConfirm: async (values) => {
                    await deleteAccount(values);
                  },
                })
              }
              className="text-sm font-semibold text-red-500 hover:text-red-400 hover:underline"
            >
              Delete my account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileSetting;
