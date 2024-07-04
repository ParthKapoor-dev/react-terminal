import { useState } from "react";
import HeaderTab from "./tab";
export default function Header({ TabTitles } : {TabTitles : string[]}) {

    const [selected, setSelected] = useState(1);

    return (
        <div className="h-fit w-screen px-4 py-1 flex items-center justify-between">
            <div className="flex gap-2  items-center ">
                {TabTitles.map((item , index) => (
                    <HeaderTab title={item} selected={selected} setSelected={setSelected} index={index} />
                ))}
            </div>
        </div>
    )
}