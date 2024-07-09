import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { TabProps } from "../../types/Tabs";
import { updateType } from "../../types/app";

type positions = 'top' | 'bot' | 'left' | 'right';

interface SplitProps {
    dragover: boolean,
    setDragover: React.Dispatch<React.SetStateAction<boolean>>
    addChild: (Tab: TabProps, type: updateType) => void

}
export default function Splits({ dragover, addChild , setDragover}: SplitProps) {

    const [position, setPosition] = useState<positions | null>(null);

    function handleDragOver(event: React.DragEvent<HTMLDivElement>, pos: positions) {

        if(pos == position && dragover) return;

        setDragover(true);
        setPosition(pos);
        console.log(pos);
        event.preventDefault();
    }

    function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
        setDragover(false);
        setPosition(null);
        event.preventDefault();
        
    }

    function handleDrop(event: React.DragEvent<HTMLDivElement>, type: updateType) {
        setDragover(false);
        setPosition(null);
        const tab = JSON.parse(event.dataTransfer.getData('text/plain'));
        addChild(tab, type);
    }

    return (
        <>
            <div className={cn("absolute z-40 inset-0 h-full w-full rounded hidden grid-rows-[1fr_1fr] grid-cols-[1fr_1fr] rotate-45 scale-150 ", dragover && "grid")}>
                <div className="" onDragOver={(e) => handleDragOver(e, 'top')} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, 'addTop')} />
                <div className="" onDragOver={(e) => handleDragOver(e, 'right')} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, 'addRight')} />
                <div className="" onDragOver={(e) => handleDragOver(e, 'left')} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, 'addLeft')} />
                <div className="" onDragOver={(e) => handleDragOver(e, 'bot')} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, 'addBottom')} />
            </div>
            <div className={cn("absolute left-0 bottom-1/2 h-full w-full bg-white opacity-30 hidden z-20 rounded",
                position == 'top' && "flex")}
            />
            <div className={cn("absolute left-1/2 top-0 h-full w-full bg-white opacity-30 hidden z-10 rounded",
                position == 'right' && "flex")}
            />
            <div className={cn("absolute right-1/2 top-0 h-full w-full bg-white opacity-30 hidden z-10 rounded",
                position == 'left' && "flex")}
            />
            <div className={cn("absolute top-1/2 left-0 h-full w-full bg-white opacity-30 hidden z-10 rounded",
                position == 'bot' && "flex")}
            />

        </>

    );
}

// bg-red-500
// bg-green-500
// bg-blue-500
// bg-yellow-500