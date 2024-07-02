import { useState } from "react";
import HeaderTab from "./tab";

export default function Header() {

    const [ selected , setSelected ] = useState(1);

    return (
        <div className="h-fit w-screen flex gap-2  items-center px-4 py-1  ">
            <HeaderTab title={"npm run dev"} selected={selected} setSelected={setSelected} index={1} />
            <HeaderTab title={"../code/mern/react-terminal"} selected={selected} setSelected={setSelected} index={2} />
        </div>
    )
}