import React from "react";


interface IButtonProp {
    text: string,
    clickFun: () => void
}

export function Button({text, clickFun}: IButtonProp) {
    return (
        <button className="border py-2 px-4 w-full h-[42px] mb-2 cursor-pointer transition-colors hover:bg-gray-500 hover:text-white"
                onClick={clickFun}
        >{text}</button>
    )
}