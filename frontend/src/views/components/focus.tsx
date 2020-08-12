import React from "react"


interface FocusProps {
    children: React.ReactChild
}

const Focus: React.FC<FocusProps> = (props) => {
    const { children } = props


    return (
        <div style={{ borderWidth: 2, borderColor: "yellow" }}>
            {children}
        </div>
    )
}

export default Focus