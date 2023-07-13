import React from 'react'
import { useDispatch, useSelector } from "react-redux";
const CardComponent = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const userGender = user.data.personalInfo.gender;
    return (
        <div

            className={`h-60 md:h-72 lg:h-96 lg:min-h-96 lg:w-1/2 lg:min-w-1/2 p-4 mx-4 mb-2 lg:mb-0 flex flex-col items-center 1 border-2 rounded-xl ${props.gender === "female"
                ? `border-rose-500 text-rose-500 bg-rose-50`
                : `border-cyan-500 text-cyan-500 bg-cyan-50`
                }
        `}
        >
            {!userGender ? (
                <div className="w-full h-full cursor-pointer">
                    <img
                        className="h-40 m-auto md:h-68 lg:h-96 xl:h-72"
                        src={require(`../assets/${props.gender}.png`)}
                        alt="gender"
                    />
                    <h2 className="mt-2 text-5xl sm:mt-4">{props.gender}</h2>
                </div>
            ) : (
                props.children
            )}
        </div>
    );
};

export default CardComponent