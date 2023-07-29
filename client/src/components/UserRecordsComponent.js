import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from 'moment';
import { deleteRecord } from "../firebase";
import DeleteButton from "./DeleteButton";
import { motion, AnimatePresence } from "framer-motion";
import { RiWaterPercentFill } from "react-icons/ri"
import { ImSpoonKnife } from "react-icons/im"
import { FaWeightScale } from "react-icons/fa6"
import { LuActivity } from "react-icons/lu"
import { GiStairsGoal, GiMuscleFat, GiMuscleUp } from "react-icons/gi"
import CollapseButton from "./CollapseButton";

const UserRecordsComponent = () => {
  const [deletedRowIds, setDeletedRowIds] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const userRecords = useSelector((state) => state.userRecords?.records)
  const currentUser = useSelector((state) => state.user.currentUser)
  const handleDelete = async (id) => {
    await deleteRecord(currentUser.uid, id)
    setDeletedRowIds([...deletedRowIds, id]);
  }

  const handleToggleRow = (id) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };

  const transformedData = userRecords?.map(item => {
    return {
      id: item.id,
      data: {
        date: moment(item.data.date.seconds * 1000).format("DD MMM YYYY"),
        weight: item.data.personalInfo.weight,
        bodyFat: item.data.results.bodyFatUsNavy,
        arm: item.data.personalInfo.arm,
        calve: item.data.personalInfo.calve,
        chest: item.data.personalInfo.chest,
        foreArm: item.data.personalInfo.forearm,
        hip: item.data.personalInfo.hip,
        neck: item.data.personalInfo.neck,
        shoulder: item.data.personalInfo.shoulder,
        thigh: item.data.personalInfo.thigh,
        waist: item.data.personalInfo.waist,
        wrist: item.data.personalInfo.wrist,
        bodyFatUsNavy: item.data.results.bodyFatUsNavy,
        calorieNeedByBodyGoal: item.data.results.calorieNeedByBodyGoal,
        bmi: item.data.results.bmi,
        activityLevel: item.data.personalInfo.activityLevel,
        bodyGoalStatus: item.data.personalInfo.bodyGoalStatus,
        bodyFatMass: item.data.results.bodyFat["Body Fat Mass"],
        leanBodyMass: item.data.results.bodyFat["Lean Body Mass"],
        bodyFatCategory: item.data.results.bodyFat["Body Fat Category"],
      }
    };
  });

  const TableHeader = ({ columns }) => {
    return (
      <thead className="sticky top-0 left-0 right-0 z-40 mt-4 shadow-md bg-slate-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.id}
              className={`px-6 z-20 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase ${column.id === 'date' ? 'sticky left-0 top-0  bg-slate-50' : ''}`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const columns = [
    { id: "date", label: "Date" },
    { id: "weight", label: "Weight" },
    { id: "bodyFat", label: "Body Fat" },
    { id: "arm", label: "Arm" },
    { id: "calve", label: "Calve" },
    { id: "chest", label: "Chest" },
    { id: "foreArm", label: "Forearm" },
    { id: "hip", label: "Hip" },
    { id: "neck", label: "Neck" },
    { id: "shoulder", label: "Shoulder" },
    { id: "thigh", label: "Thigh" },
    { id: "waist", label: "Waist" },
    { id: "wrist", label: "Wrist" },
    { id: "actions", label: "Actions" },
  ];
  return (

    <div className="container z-20 h-screen mx-auto mt-5 overflow-auto no-scrollbar ">
      <table className="min-w-full divide-y divide-gray-200 ">
        <TableHeader columns={columns} />
        <tbody className="bg-white divide-y divide-gray-200 text-slate-700">
          <AnimatePresence>
            {transformedData?.map((item, index) => (
              <React.Fragment key={item.id}>
                <motion.tr
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }} // Slide left effect
                  transition={{ duration: 0.095 }} // Animation duration
                  className="font-medium cursor-pointer"
                  key={item.id}
                  onDoubleClick={() => handleToggleRow(item.id)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={`${column.id === "date" ? "sticky left-0 " : ""
                        }px-6 py-4 whitespace-nowrap bg-slate-50`}
                      title={column.label}
                    >
                      {column.id !== "actions" ? item.data[column.id] : (
                        <div className="flex items-center justify-center gap-5 whitespace-nowrap">
                          {(index !== 0 || (index === 0 && transformedData.length > 1)) && (
                            <DeleteButton onClick={() => handleDelete(item.id)} size={20} />
                          )}
                          <CollapseButton
                            onClick={() => handleToggleRow(item.id)}
                            isExpanded={expandedRows.includes(item.id)}
                            size={20}
                          />
                        </div>
                      )}
                    </td>
                  ))}
                </motion.tr>
                {expandedRows.includes(item.id) && (
                  <motion.tr
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    key={item.id + "-details"}
                    className=""
                  >
                    <td colSpan={columns.length + 1} className="bg-gray-100 shadow-sm">
                      <div className="flex items-center flex-1 p-2 justify-evenly">
                        <div className="flex flex-col items-center flex-1 gap-2 p-1 font-semibold text-md">
                          <RiWaterPercentFill size={34} className="text-cyan-700" />
                          <p className="underline text-slate-600">Body Fat Category</p>
                          <p className="text-cyan-700">{item.data.bodyFatCategory}</p>
                        </div>
                        <div className="flex flex-col items-center flex-1 gap-2 p-1 font-semibold text-md">
                          <GiMuscleUp size={34} className="text-cyan-700" />
                          <p className="underline text-slate-600">Lean Body Mass</p>
                          <p className="text-cyan-700">{item.data.leanBodyMass}</p>
                        </div>
                        <div className="flex flex-col items-center flex-1 gap-2 p-1 font-semibold text-md">
                          <GiMuscleFat size={34} className="text-cyan-700" />
                          <p className="underline text-slate-600">Body Fat Mass</p>
                          <p className="text-cyan-700">{item.data.bodyFatMass}</p>
                        </div>
                        <div className="flex flex-col items-center flex-1 gap-2 p-1 font-semibold text-md">
                          <GiStairsGoal size={34} className="text-cyan-700" />
                          <p className="underline text-slate-600">Body Goal</p>
                          <p className="text-cyan-700">{item.data.bodyGoalStatus}</p>
                        </div>
                        <div className="flex flex-col items-center flex-1 gap-2 p-1 font-semibold text-md">
                          <ImSpoonKnife size={34} className="text-cyan-700" />
                          <p className="underline text-slate-600">Calorie Need By {item.data.bodyGoalStatus}</p>
                          <p className="text-cyan-700">{item.data.calorieNeedByBodyGoal}</p>
                        </div>
                        <div className="flex flex-col items-center flex-1 gap-2 p-1 font-semibold text-md">
                          <LuActivity size={34} className="text-cyan-700" />
                          <p className="underline text-slate-600">Activity Level</p>
                          <p className="text-cyan-700">{item.data.activityLevel}</p>
                        </div>
                        <div className="flex flex-col items-center flex-1 gap-2 p-1 font-semibold text-md">
                          <FaWeightScale size={34} className="text-cyan-700" />
                          <p className="underline text-slate-600">BMI</p>
                          <p className="text-cyan-700">{item.data.bmi}</p>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default UserRecordsComponent;
