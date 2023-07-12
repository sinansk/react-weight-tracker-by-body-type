import React from "react";
import { useSelector } from "react-redux";
import { convertSecondsToDate } from "../utils/convertSecondToDate";
import moment from 'moment';
import { deleteRecord } from "../firebase";
import DeleteButton from "./DeleteButton";
const UserRecordsComponent = () => {
  const userRecords = useSelector((state) => state.userRecords?.records)
  const currentUser = useSelector((state) => state.user.currentUser)
  console.log("userRecords", userRecords)
  const handleDelete = async (id) => {
    await deleteRecord(currentUser.uid, id)
  }
  const transformedData = userRecords?.map(item => {
    return {
      id: item.id, data: {
        date: item.data.date.seconds,
        weight: item.data.personalInfo.weight,
        bodyFat: item.data.results.bodyFat?.["Body Fat (U.S. Navy Method)"],
        arm: item.data.personalInfo.arm,
        calve: item.data.personalInfo.calve,
        chest: item.data.personalInfo.chest,
        foreArm: item.data.personalInfo.forearm,
        hip: item.data.personalInfo.hip,
        neck: item.data.personalInfo.neck,
        shoulder: item.data.personalInfo.shoulder,
        thigh: item.data.personalInfo.thigh,
        waist: item.data.personalInfo.waist,
        wrist: item.data.personalInfo.wrist
      }
    };
  });

  console.log("transformedData", transformedData);

  const TableHeader = ({ columns }) => {
    return (
      <thead className="mt-4 shadow-md bg-slate-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.id}
              className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
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
    { id: "forearm", label: "Forearm" },
    { id: "hip", label: "Hip" },
    { id: "neck", label: "Neck" },
    { id: "shoulder", label: "Shoulder" },
    { id: "thigh", label: "Thigh" },
    { id: "waist", label: "Waist" },
    { id: "wrist", label: "Wrist" },
    { id: "actions", label: "Actions" },
  ];
  return (

    <div className="container z-20 h-screen mx-auto mt-5 overflow-auto shadow-lg no-scrollbar ">
      <table className="min-w-full divide-y divide-gray-200 ">
        <TableHeader columns={columns} />
        <tbody className="bg-white divide-y divide-gray-200 ">
          {transformedData?.map((item, index) => (
            <tr classNamekey="" key={item.id}>
              {console.log("item.id", item.id)}
              <td className="px-6 py-4 whitespace-nowrap">{moment(item.data.date * 1000).format("DD MMM YYYY")}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.weight}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.bodyFat}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.arm}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.calve}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.chest}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.foreArm}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.hip}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.neck}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.shoulder}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.thigh}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.waist}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.data.wrist}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {(index !== 0 || (index === 0 && transformedData.length > 1)) && (
                  <DeleteButton handleDelete={() => handleDelete(item.id)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRecordsComponent;
