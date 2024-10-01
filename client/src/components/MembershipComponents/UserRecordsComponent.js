import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { deletePhoto, deleteRecord, getUserInfoForMonth } from "../../firebase";
import { motion, AnimatePresence, usePresence } from "framer-motion";
import { RiWaterPercentFill } from "react-icons/ri";
import { ImSpoonKnife } from "react-icons/im";
import { FaWeightScale } from "react-icons/fa6";
import { LuActivity } from "react-icons/lu";
import { GiStairsGoal, GiMuscleFat, GiMuscleUp } from "react-icons/gi";
import DeleteButton from "../CommonComponents/DeleteButton";
import CollapseButton from "../CommonComponents/CollapseButton";
import PhotoDisplayComponent from "./PhotoDisplayComponent";
import { setRecordsPerPage, usePageSize } from "../../redux/userRecords";
import PaginationComponent from "../CommonComponents/PaginationComponent";
import { fetchUserInfo } from "../../redux/userRecordsThunk";
import LoadingComponent from "../CommonComponents/Loaders/LoadingComponent";
import { createModal } from "../../utils/modalHooks";
import ItemsPerPageComponent from "../CommonComponents/ItemsPerPageComponent";
import SelectButton from "../CommonComponents/SelectButton";
const UserRecordsComponent = () => {
  const isLoading = useSelector((state) => state.userRecords.status);
  const [deletedRowIds, setDeletedRowIds] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const userRecords = useSelector((state) => state.userRecords?.records);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isPresent, safeToRemove] = usePresence();
  const totalPages = useSelector((state) => state.userRecords?.totalPages);
  const itemsPerPage = useSelector(
    (state) => state.userRecords?.recordsPerPage
  );
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await deleteRecord(currentUser.uid, id);
    setDeletedRowIds([...deletedRowIds, id]);
  };
  const calorieDiary = useSelector((state) => state.userDiary.calorieDiary);
  const handleToggleRow = (id) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const transformedData = userRecords?.map((item) => {
    return {
      id: item.id,
      data: {
        date: item.data.date,
        weight: item.data.personalInfo.weight,
        bodyFat: item.data.results.bodyFatUsNavy,
        arm: item.data.measurements.arm,
        calve: item.data.measurements.calve,
        chest: item.data.measurements.chest,
        foreArm: item.data.measurements.forearm,
        hip: item.data.measurements.hip,
        neck: item.data.measurements.neck,
        shoulder: item.data.measurements.shoulder,
        thigh: item.data.measurements.thigh,
        waist: item.data.measurements.waist,
        wrist: item.data.measurements.wrist,
        bodyFatUsNavy: item.data.results.bodyFatUsNavy,
        calorieNeedByBodyGoal: item.data.results.calorieNeedByBodyGoal,
        bmi: item.data.results.bmi,
        activityLevel: item.data.personalInfo.activityLevel,
        bodyGoalStatus: item.data.personalInfo.bodyGoalStatus,
        bodyFatMass: item.data.results.bodyFat["Body Fat Mass"] + `kg`,
        leanBodyMass: item.data.results.bodyFat["Lean Body Mass"] + `kg`,
        bodyFatCategory: item.data.results.bodyFat["Body Fat Category"],
        photo: item.data?.photo,
      },
    };
  });

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
  const currentPageIndex = currentPage - 1;
  const startIndex = currentPageIndex * itemsPerPage;
  const endIndex = (currentPageIndex + 1) * itemsPerPage;
  const paginatedData = transformedData?.slice(startIndex, endIndex);

  const handleSelect = (id) => {
    console.log("ID", id);
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedRowId) => selectedRowId !== id)
        : [...prevSelected, id]
    );
  };

  useEffect(() => {
    console.log(selectedRecords);
  }, [selectedRecords]);
  const TableHeader = ({ columns }) => {
    return (
      <thead className="sticky top-0 left-0 right-0 z-20 mt-4 text-xs shadow-md sm:text-base">
        <tr>
          {columns.map((column) => (
            <th
              key={column.id}
              className={`px-2 py-1 sm:px-6 z-20 sm:py-3 text-xs font-medium tracking-wider text-center bg-slate-200 text-gray-500 uppercase ${
                column.id === "date"
                  ? "records sticky left-0 top-0 bg-slate-300"
                  : ""
              }`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  return (
    <div className="rounded-lg container z-20 h-screen mx-2 sm:mx-auto mt-5 overflow-auto text-xs text-gray-200 sm:text-base no-scrollbar ">
      <table className="min-w-full divide-y divide-gray-200 ">
        {isLoading === "loading" || isLoading === "idle" || !userRecords ? (
          <LoadingComponent />
        ) : (
          <>
            <TableHeader columns={columns} />
            <tbody className="divide-y divide-gray-700 ">
              <AnimatePresence>
                {paginatedData?.map((item, index) => (
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
                          className={`${
                            column.id === "date"
                              ? "sticky left-0 bg-gray-600"
                              : "bg-gray-500/30"
                          } px-2 py-1 sm:px-6 sm:py-4 whitespace-nowrap `}
                          title={column.label}
                        >
                          {column.id !== "actions" ? (
                            item?.data[column.id]
                          ) : (
                            <div className="flex items-center justify-center gap-5 text-white whitespace-nowrap">
                              {/* <SelectButton size={20} handleSelectButton={() => handleSelect(item.id)} /> */}
                              {(index !== 0 ||
                                (index === 0 &&
                                  transformedData.length > 1)) && (
                                <DeleteButton
                                  onClick={() =>
                                    createModal("ConfirmationModal", {
                                      title: "Delete Record",
                                      text: "Are you sure you want to delete this record?",
                                      onConfirm: () => handleDelete(item.id),
                                    })
                                  }
                                  size={20}
                                />
                              )}
                              <CollapseButton
                                onClick={() => handleToggleRow(item.id)}
                                isExpanded={expandedRows.includes(item.id)}
                                size={20}
                                color="white"
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
                        className="text-xs sm:text-base"
                      >
                        <td
                          colSpan={columns.length + 1}
                          className="bg-gray-600 shadow-sm "
                        >
                          <div className="flex items-center flex-1 sm:p-2 justify-evenly">
                            <div className="flex flex-col items-center flex-1 gap-2 p-1 text-xs font-semibold sm:text-base">
                              <RiWaterPercentFill
                                size={34}
                                className="h-5 text-teal-500 sm:h-9"
                              />
                              <p className="">Body Fat Category</p>
                              <p className="">{item.data.bodyFatCategory}</p>
                            </div>
                            <div className="flex flex-col items-center flex-1 gap-2 p-1 text-xs font-semibold sm:text-base">
                              <GiMuscleUp
                                size={34}
                                className="h-5 text-teal-500 sm:h-9"
                              />
                              <p className="">Lean Body Mass</p>
                              <p className="">{item.data.leanBodyMass}</p>
                            </div>
                            <div className="flex flex-col items-center flex-1 gap-2 p-1 text-xs font-semibold sm:text-base">
                              <GiMuscleFat
                                size={34}
                                className="h-5 text-teal-500 sm:h-9"
                              />
                              <p className="">Body Fat Mass</p>
                              <p className="">{item.data.bodyFatMass}</p>
                            </div>
                            <div className="flex flex-col items-center flex-1 gap-2 p-1 text-xs font-semibold sm:text-base">
                              <GiStairsGoal
                                size={34}
                                className="h-5 text-teal-500 sm:h-9"
                              />
                              <p className="">Body Goal</p>
                              <p className="">{item.data.bodyGoalStatus}</p>
                            </div>
                            <div className="flex flex-col items-center flex-1 gap-2 p-1 text-xs font-semibold sm:text-base">
                              <ImSpoonKnife
                                size={34}
                                className="h-5 text-teal-500 sm:h-9"
                              />
                              <p className="">
                                Calorie Need By {item.data.bodyGoalStatus}
                              </p>
                              <p className="">
                                {item.data.calorieNeedByBodyGoal}
                              </p>
                            </div>
                            <div className="flex flex-col items-center flex-1 gap-2 p-1 text-xs font-semibold sm:text-base">
                              <LuActivity
                                size={34}
                                className="h-5 text-teal-500 sm:h-9"
                              />
                              <p className="">Activity Level</p>
                              <p className="">{item.data.activityLevel}</p>
                            </div>
                            <div className="flex flex-col items-center flex-1 gap-2 p-1 text-xs font-semibold sm:text-base">
                              <FaWeightScale
                                size={34}
                                className="h-5 text-teal-500 sm:h-9"
                              />
                              <p className="">BMI</p>
                              <p className="">{item.data.bmi}</p>
                            </div>
                            {item.data?.photo?.url && (
                              <PhotoDisplayComponent
                                item={item}
                                className="order-first w-20 h-20 sm:order-last sm:w-32 sm:h-32"
                                isEditable={true}
                              />
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                ))}
              </AnimatePresence>
            </tbody>
          </>
        )}
      </table>
      {totalPages && (
        <div className="mt-4 ">
          <PaginationComponent
            totalPages={Math.ceil(transformedData?.length / itemsPerPage)}
            totalItems={transformedData?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <ItemsPerPageComponent
            className={`flex flex-col sm:flex-row justify-end sm:-mt-8`}
            onChange={(value) => dispatch(setRecordsPerPage(value))}
          />
        </div>
      )}
    </div>
  );
};

export default UserRecordsComponent;
