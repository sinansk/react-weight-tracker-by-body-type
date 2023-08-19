import React from 'react'
import { useSelector } from "react-redux";
const LoadingComponent = () => {
    const user = useSelector((state) => state.user)
    const userRecords = useSelector((state) => state.userRecords?.records)
    const isLoading = user.status
    const userRecordsStatus = useSelector((state) => state.userRecords.status);
    return (
        (isLoading === "loading" || isLoading === "idle" || userRecordsStatus === "loading" || userRecords?.length === 0) &&
        <div className="flex items-center justify-center h-screen">
            <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
    )
}

export default LoadingComponent