import React from "react";

export default function OButton ({ click, className, children }) {
    return (
        <button
            className={
                `btn-primary
                py-4
                px-14
                rounded-sm ` + className
            }
            onClick={click}
        >
            {children}
        </button>
    )
}