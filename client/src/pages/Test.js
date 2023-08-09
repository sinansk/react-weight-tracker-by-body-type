import React from "react";
import SelectInput from "../components/CommonComponents/SelectInput";
import { activityLevels, ages, bodyGoals, bodyTypes, heights, weights } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../redux/userRedux";
import PhotoUploadComponent from "../components/MembershipComponents/PhotoUploadComponent";
import ButtonPrimary from "../components/CommonComponents/ButtonPrimary";
import useUpdateUserInfo from "../utils/useUpdateUserInfo";

const Test = () => {
    const dispatch = useDispatch()
    const userPersonalInfo = useSelector((state) => state.user.data.personalInfo)
    const measurements = Object.keys(userPersonalInfo).filter((key) =>
        ["arm", "calve", "chest", "forearm", "wrist", "hip", "neck", "shoulder", "thigh", "waist"].includes(key)
    ).sort()

    const updateUserInfo = useUpdateUserInfo()
    const handleUpdate = () => {
        // Burada güncelleme işlemlerini gerçekleştirebilirsiniz
        updateUserInfo()
    };

    return (
        <div>
            <div className="flex flex-col w-full h-full min-h-full gap-2 p-2 min-wfull lg:grid lg:grid-cols-6 lg:grid-rows-2">
                <div className="relative col-span-3 col-start-1 row-span-2 row-start-1 p-2 font-mono rounded-lg shadow-md bg-opacity-30 backdrop-filter backdrop-blur-md">
                    <div className="m-auto h-4/5 sm:w-80">
                        <h2 className="mb-2 text-xl font-semibold">Personal Info</h2>
                        <div className=""><SelectInput options={ages} label="Age" name="age" className="min-w-full" /></div>
                        <div className=""><SelectInput options={bodyTypes} label="My fingers are," name="bodyType" className="min-w-full" /></div>
                        <div className=""><SelectInput options={heights} label="Height" name="height" className="min-w-full" /></div>
                        <div className=""><SelectInput options={weights} label="Weight" name="weight" className="min-w-full" /> </div>
                        <div className=""><SelectInput options={activityLevels} label="Activity Level:" name="activityLevel" className="min-w-full" /></div>
                        <div className=""><SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" className="min-w-full" /></div>
                        <PhotoUploadComponent />
                    </div>

                </div>
                <div className="relative col-span-3 col-start-4 row-span-2 row-start-1 p-2 font-mono rounded-lg shadow-md bg-opacity-30 backdrop-filter backdrop-blur-md">
                    <div className="m-auto h-4/5 sm:w-80">
                        <h2 className="mb-2 text-xl font-semibold">Measurements</h2>
                        {userPersonalInfo &&
                            <div className=''>
                                <ul className="grid">
                                    {measurements?.map((key) => (
                                        <li key={key}>
                                            <span>{key}: </span>
                                            <input className="w-full px-4 font-thin transition-all duration-200 ease-in-out border-gray-500/20 rounded-md outline-none h-[38px] border-[1px] focus:ring-2 focus:ring-blue-400" type="number" defaultValue={userPersonalInfo[key]} name={key} onChange={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))} />

                                        </li>
                                    ))}
                                </ul>
                            </div>}
                    </div>
                </div>
            </div>
            <div className="flex">
                <ButtonPrimary className="mx-auto" text="UPDATE" onClick={handleUpdate} />
            </div>
        </div>
    );
};

export default Test;
