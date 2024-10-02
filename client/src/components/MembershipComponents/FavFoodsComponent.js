import React, { useEffect, useState } from "react";
import DeleteButton from "../CommonComponents/DeleteButton";
import { IoIosAdd } from "react-icons/io";
import { deleteFavFood, getFavFoods } from "../../firebase";

const FavFoodsComponent = ({ favFoods, className }) => {
  const handleDelete = async (item) => {
    await deleteFavFood(item);
  };

  const headerColumns = [
    {
      id: "amount",
      label: "Amount",
      colSpan: 1,
    },
    {
      id: "food_name",
      label: "Name",
      colSpan: 1,
    },
    {
      id: "carbs",
      label: "Carbs",
      colSpan: 1,
    },
    {
      id: "fat",
      label: "Fat",
      colSpan: 1,
    },
    {
      id: "protein",
      label: "Protein",
      colSpan: 1,
    },
    {
      id: "calories",
      label: "Calories",
      colSpan: 1,
    },
  ];

  const TableHeader = ({ headerColumns }) => {
    return (
      <thead className="left-0 w-full sticky-top-0">
        <tr>
          {headerColumns.map((column) => (
            <th colSpan={column.colSpan} key={column.id}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  return (
    <div
      className={`${className} p-1 sm:p-5 text-xs sm:text-base pt-0 mx-auto shadow-lg rounded-xl text-gray-200  bg-gray-500/50 w-[600px] h-fit overflow-auto  no-scrollbar`}
    >
      <h1>Your Favourite Foods</h1>
      <p>
        Here you can add your favourite foods and see how they compare to your
        daily recommended intake.
      </p>
      <table className="min-w-full p-5 divide-y divide-gray-200">
        <TableHeader headerColumns={headerColumns} />
        <tbody className="text-gray-200 divide-y divide-gray-200">
          {favFoods?.length > 0 &&
            favFoods?.map((item, rowIndex) => (
              <tr key={rowIndex} className="">
                {headerColumns.map((column) => (
                  <td
                    className="px-3 py-2 "
                    key={column.id}
                    colSpan={column.colSpan}
                  >
                    {column.id !== "name" ? (
                      <p className="font-medium text-md">{item[column.id]}</p>
                    ) : (
                      <>
                        <p className="font-medium text-md">{item?.name}</p>
                      </>
                    )}
                  </td>
                ))}
                <td className="py-2 ">
                  <div className="flex items-center h-full">
                    <button className="h-full m-auto" type="button">
                      <IoIosAdd size={18} />
                    </button>
                    <button
                      className="h-full m-auto"
                      type="button"
                      onClick={() => handleDelete(item)}
                    >
                      <DeleteButton className="h-full m-auto" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavFoodsComponent;
