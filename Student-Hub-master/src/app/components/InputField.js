import React from "react";

export default function InputField({value,onChange,type,placeholder}){
    return (
        <div className="bg-blue-200 p-4 m-1 rounded-md shadow-md border w-[480px]">
            <input type={type}
            className="w-full p-3 bg-white"
            value={value}
            onChange={onChange} placeholder={placeholder}
            />
        </div>
    )
}