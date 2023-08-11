import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useUpdateUserInfo from "../../utils/useUpdateUserInfo"
import ButtonPrimary from "../CommonComponents/ButtonPrimary";
import SelectInput from "../CommonComponents/SelectInput";
import { activityLevels, ages, bodyGoals, bodyTypes, heights, weights } from "../../data";
import PhotoUploadComponent from "../MembershipComponents/PhotoUploadComponent";
import { setInput } from "../../redux/userRedux";

const UpdateProfileModal = () => {
    const dispatch = useDispatch()
    const userPersonalInfo = useSelector((state) => state.user.data.personalInfo)
    const measurements = ["arm", "calve", "chest", "forearm", "wrist", "hip", "neck", "shoulder", "thigh", "waist"]

    const updateUserInfo = useUpdateUserInfo()
    const handleUpdate = () => {
        // Burada güncelleme işlemlerini gerçekleştirebilirsiniz
        updateUserInfo()
    };

    return (
        <div>
            <div className="flex flex-col w-full h-full min-w-full min-h-full gap-2 p-2 divide-x lg:grid lg:grid-cols-6 lg:grid-rows-2">
                <div className="relative col-span-3 col-start-1 row-span-2 row-start-1 p-2 mx-auto font-mono rounded-lg bg-opacity-30 backdrop-filter backdrop-blur-md">
                    <div className="flex flex-col h-full sm:w-80">
                        <h2 className="text-xl font-semibold ">Personal Info</h2>
                        <PhotoUploadComponent />
                        <div className="mt-auto">
                            <SelectInput options={ages} label="Age" name="age" className="min-w-full" />
                            <SelectInput options={heights} label="Height" name="height" className="min-w-full" />
                            <SelectInput options={weights} label="Weight" name="weight" className="min-w-full" />
                            <SelectInput options={bodyTypes} label="My fingers are," name="bodyType" className="min-w-full" />
                            <SelectInput options={activityLevels} label="Activity Level:" name="activityLevel" className="min-w-full" />
                            <SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" className="min-w-full" />
                        </div>

                    </div>
                </div>
                <div className="relative col-span-3 col-start-4 row-span-2 row-start-1 p-2 mx-auto font-mono rounded-lg bg-opacity-30 backdrop-filter backdrop-blur-md">
                    <div className="h-full m-auto sm:w-80">
                        <h2 className="mb-2 text-xl font-semibold">Measurements</h2>
                        {userPersonalInfo &&
                            <div className=''>
                                <ul className="grid">
                                    {measurements?.map((key) => (
                                        <li key={key}>
                                            <span>{key}: </span>
                                            <input className="w-full px-4 font-thin border-gray-500/20 rounded-sm outline-none h-[38px] border-[1px]  focus:border-2 focus:border-blue-400" type="number" defaultValue={userPersonalInfo[key]} name={key} onChange={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))} />

                                        </li>
                                    ))}
                                </ul>
                            </div>}
                    </div>
                </div>
            </div>
            <div className="flex mt-5">
                <ButtonPrimary className="mx-auto" text="UPDATE" onClick={handleUpdate} />
            </div>
        </div>
    );
};

export default UpdateProfileModal