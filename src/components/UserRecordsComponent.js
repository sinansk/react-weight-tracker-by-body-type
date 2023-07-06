import React from "react";
import { useSelector } from "react-redux";
import { convertSecondsToDate } from "../utils/convertSecondToDate";
import moment from 'moment';
const UserRecordsComponent = () => {
  const userRecords = useSelector((state) => state.userRecords?.records)
  console.log("userRecords", userRecords)

  const transformedData = userRecords?.map(item => {
    return {
      date: item.date.seconds,
      weight: item.personalInfo.weight,
      bodyFat: item.results.bodyFat?.["Body Fat (U.S. Navy Method)"],
      arm: item.personalInfo.arm,
      calve: item.personalInfo.calve,
      chest: item.personalInfo.chest,
      foreArm: item.personalInfo.foreArm,
      hip: item.personalInfo.hip,
      neck: item.personalInfo.neck,
      shoulder: item.personalInfo.shoulder,
      thigh: item.personalInfo.thigh,
      waist: item.personalInfo.waist,
      wrist: item.personalInfo.wrist
    };
  });

  console.log("transformedData", transformedData);

  const TableHeader = ({ columns }) => {
    return (
      <thead className="sticky top-0 mt-4 bg-gray-50">
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
  ];
  return (

    <div className="container z-20 mx-auto mt-5">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader columns={columns} />
        <tbody className="bg-white divide-y divide-gray-200">
          {transformedData?.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{moment(item.date * 1000).format("DD MMM YYYY")}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.weight}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.bodyFat}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.arm}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.calve}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.chest}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.foreArm}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.hip}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.neck}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.shoulder}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.thigh}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.waist}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.wrist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRecordsComponent;
