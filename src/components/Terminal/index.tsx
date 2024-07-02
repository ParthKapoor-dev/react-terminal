import { MutableRefObject, useRef } from "react"
import { BlockProps } from "../Block"


interface TermianlProps {
    location: string,
    setPrevBlocks: React.Dispatch<React.SetStateAction<BlockProps[]>>
}

export default function Terminal({ location, setPrevBlocks }: TermianlProps) {

    const inputRef : MutableRefObject<HTMLInputElement| null> = useRef<HTMLInputElement| null>(null);

    function handleSubmit(event : any) {
        event.preventDefault();
        const newBlock : BlockProps = {
            id: 4,
            type: 'terminal',
            location ,
            input: inputRef.current?.value || "" ,
            output: "app.tsx   assets   components   index.css   main.tsx   Pages   utils   vite-env.d.ts   xtermTerminal.tsx",
        }
        setPrevBlocks(prev => {
            prev.push(newBlock);
            localStorage.setItem('blocks' , JSON.stringify(prev));
            return prev;
        })
    }

    return (
        <div className="py-4 px-6 border-2 border-neutral-200 text-lg rounded-lg m-2">
            <form className="flex gap-2" onSubmit={handleSubmit}>

                <div className=" text-purple-800 font-semibold">
                    {location} $
                </div>

                <input type="text" placeholder="type your command here" className=" focus-visible:outline-none w-[60rem]" ref={inputRef}/>
            </form>

        </div>
    )
}