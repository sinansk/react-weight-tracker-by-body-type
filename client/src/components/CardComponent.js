import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectGender } from '../redux/userRedux';
const CardComponent = ({ children, gender, className }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const userGender = user.data.personalInfo.gender;
    const handleGender = () => {
        !userGender && dispatch(selectGender(gender));
    };
    return (
        <div
            onClick={handleGender}
            className={`${className} card ${gender === "female"
                ? `card-primary`
                : `card-secondary`
                }
          `}
        >{children}
        </div>
    );
};

export default CardComponent