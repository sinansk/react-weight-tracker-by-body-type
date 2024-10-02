import React, { useState } from "react";
import ButtonPrimary from "../CommonComponents/ButtonPrimary";
import { deleteAccount } from "../../firebase";
import { useSelector } from "react-redux";

const ReAuthModal = (data) => {
  const [form, setForm] = useState({});
  const email = useSelector((state) => state.user.currentUser.email);
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    data.data.onConfirm(form.password);
  };
  return (
    <div className="w-full p-5 m-5 text-slate-700 rounded-xl sm:m-auto">
      <form className="flex flex-col items-start gap-4" onSubmit={handleSubmit}>
        <p className="w-full text-lg font-semibold text-center text-gray-900">
          Please re-enter your password!
        </p>
        <p className="w-full text-sm text-center text-gray-900">
          We need to make sure it's you
        </p>
        <p className="text-xs text-center">
          (If you changed your password please write your old password!){" "}
        </p>
        {/* <input type="email" onChange={handleInputChange} className='w-full px-2 py-1 border-2 border-gray-400 rounded-md ' placeholder='Email' name="email" /> */}
        <input
          defaultValue=" "
          onChange={handleInputChange}
          type="password"
          className="w-full px-2 py-1 border-2 border-gray-400 rounded-md"
          name="password"
          placeholder="Password"
        />
        <ButtonPrimary type="submit" className="w-full">
          Confirm
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default ReAuthModal;
