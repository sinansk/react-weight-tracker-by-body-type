import React from "react"
import ContentLoader from "react-content-loader"

const ProfileLoader = (props) => (

    <ContentLoader
        className={`${props.className} w-full h-full`}
        speed={2}
        // width={240}
        // height={290}
        viewBox="0 0 240 290"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="109" cy="52" r="52" />
        <rect x="-18" y="112" rx="2" ry="2" width="280" height="174" />
    </ContentLoader>
)

export default ProfileLoader
