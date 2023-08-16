import React from "react"
import ContentLoader from "react-content-loader"

const UserInfoLoader = (props) => (
    <ContentLoader
        className={`${props.className} h-full w-full`}
        speed={2}
        // width={740}
        // height={142}
        viewBox="0 0 740 142"
        backgroundColor="#f3f4f6"
        foregroundColor="#dbeafe"
        {...props}
    >
        <rect x="163" y="8" rx="5" ry="5" width="220" height="20" />
        <rect x="13" y="46" rx="5" ry="5" width="220" height="20" />
        <rect x="13" y="78" rx="5" ry="5" width="220" height="20" />
        <rect x="13" y="111" rx="5" ry="5" width="220" height="20" />
        <rect x="352" y="141" rx="0" ry="0" width="0" height="1" />
        <rect x="359" y="99" rx="0" ry="0" width="0" height="1" />
        <rect x="312" y="46" rx="5" ry="5" width="220" height="20" />
        <rect x="312" y="78" rx="5" ry="5" width="220" height="20" />
        <rect x="312" y="111" rx="5" ry="5" width="220" height="20" />
    </ContentLoader>
)

export default UserInfoLoader