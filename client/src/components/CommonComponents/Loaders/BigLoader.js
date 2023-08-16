import React from "react"
import ContentLoader from "react-content-loader"

const BigLoader = (props) => (
    <ContentLoader
        speed={2}
        // width={400}
        // height={460}
        viewBox="0 0 400 460"
        backgroundColor="#f3f4f6"
        foregroundColor="#dbeafe"
        {...props}
    >
        <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
    </ContentLoader>
)

export default BigLoader