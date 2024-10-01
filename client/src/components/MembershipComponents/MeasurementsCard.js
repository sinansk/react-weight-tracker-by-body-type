import React from "react";
import { createModal } from "../../utils/modalHooks";
import EditButton from "../CommonComponents/EditButton";

const MeasurementsCard = ({ title, data, isEdiTable }) => {
  // const handleEditClick = () => {
  //     createModal("MeasurementsModal", {
  //         willOpenModal: "UserInfoModal"
  //     })
  // }

  return (
    <div className="items-center justify-center flex-1 text-left">
      <div className="flex">
        <h2 className="text-sm font-bold lg:text-base h-1/5 whitespace-nowrap">
          {title}
        </h2>
        {/* {isEdiTable &&
                    <EditButton styleProps={`ml-1 absolute right-1 top-1`} onClick={handleEditClick} size={20} />
                } */}
      </div>
      {data && (
        <ul className="grid text-left uppercase p-2">
          {Object.entries(data)
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
            .map(([key, value]) => (
              <li
                className=" font-semibold normal-case first-letter:uppercase"
                key={key}
              >
                <span>{key}: </span>
                <span className="">{value} cm</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MeasurementsCard;
