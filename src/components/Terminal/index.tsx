import { useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { TabProps, BlockProps } from "../../types/Tabs";


interface TerminalProps {
    location: string;
    tabId: number;
    addBlock: (newBlock: BlockProps) => void;
    // setShowBlocks: React.Dispatch<React.SetStateAction<BlockProps[]>>;
}

export default function Terminal({ location, addBlock }: TerminalProps) {
    const [input, setInput] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ left: 0 });
    const inputRef = useRef<HTMLInputElement | null>(null);
    const locationRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState<number>(0);

    function handleKeys(event: React.KeyboardEvent<HTMLInputElement>) {
        if (!showDropdown) return;

        const key = event.key;
        if (key === 'ArrowUp') {
            setSelected(prev => Math.max(prev - 1, 0));
        } else if (key === 'ArrowDown') {
            setSelected(prev => Math.min(prev + 1, samplePopup.length - 1));
        } else if (key === 'Enter') {
            event.preventDefault();  // Prevent form submission
            handleSuggestionClicked(samplePopup[selected]);
            setSelected(0);
        } else if (key === 'Escape') {
            setShowDropdown(false);
            setSelected(0);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newBlock: BlockProps = {
            id: Date.now(),
            // type: 'terminal',
            location,
            input: input,
            output: "app.tsx   assets   components   index.css   main.tsx   Pages   utils   vite-env.d.ts   xtermTerminal.tsx",
        };

        addBlock(newBlock);

        setInput("");  // Clear the input field
        setShowDropdown(false);  // Hide dropdown after submission
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newInput = event.target.value;
        setInput(newInput);
        if (newInput === "cd" || newInput === "cd ") {
            setShowDropdown(true);
            updateDropdownPosition();
        } else {
            setShowDropdown(false);
        }
    }

    function updateDropdownPosition() {
        if (inputRef.current && locationRef.current) {
            const inputElement = inputRef.current;
            const inputStyle = getComputedStyle(inputElement);
            const locationStyle = getComputedStyle(locationRef.current);
            const paddingLeft = parseInt(inputStyle.paddingLeft, 10);
            const locationWidth = parseInt(locationStyle.width, 10);
            const cursorPosition = inputElement.selectionStart || 0;
            const cursorOffset = cursorPosition * parseInt(inputStyle.fontSize, 10) * 0.5; // Adjust based on average character width
            setDropdownPosition({ left: paddingLeft + locationWidth + cursorOffset + 8 });
        }
    }

    function handleSuggestionClicked(item: string) {
        setInput(prev => prev + item);
        setShowDropdown(false);
    }

    return (
        <div className="py-4 px-6 border-2 border-neutral-200 dark:border-neutral-800 text-lg rounded-lg m-2 dark:bg-black">
            <form className="flex gap-2 relative" onSubmit={handleSubmit}>
                <div className=" text-purple-700 dark:text-purple-400 font-semibold" ref={locationRef}>
                    {location} $
                </div>
                <input
                    type="text"
                    placeholder="type your command here"
                    className="focus-visible:outline-none w-[20rem] dark:bg-black"
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeys}
                    ref={inputRef}
                />
                {showDropdown && (
                    <div
                        className="absolute bg-white border border-gray-300 mt-1 p-2 rounded shadow-lg z-10 dark:bg-black dark:border-neutral-800"
                        style={{ left: dropdownPosition.left }}
                    >
                        {samplePopup.map((item, index) => (
                            <div key={index} className={cn("py-1 px-4 hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer", selected === index && "bg-gray-200 dark:bg-neutral-800")} onClick={() => handleSuggestionClicked(item)}>
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
}

const samplePopup = [
    "files",
    "desktop",
    "code",
    "client",
    "git repo"
];
