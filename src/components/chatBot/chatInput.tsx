import { useState } from "react"
import { ChatBlockProps } from "../../types/Chat"
import { dummyChatResponse } from "../../DummyData/dummyChatResponse";

interface ChatInputProps {
    addChats: (newChatBlock: ChatBlockProps) => void
}
export default function ChatInput({ addChats }: ChatInputProps) {

    const [input, setInput] = useState<string>("");

    function handleAddChats() {
        if (input == "") return;
        const output = dummyChatResponse;

        const newBlock = {
            id: Date.now(),
            input,
            output
        };

        addChats(newBlock);
    }


    return (
        <form className=" w-full mt-4" onSubmit={handleAddChats}>
            <input type='text' className="focus-visible:outline-none p-2 border-2 rounded w-full dark:bg-black" placeholder="ask you query here..." value={input} onChange={(e) => setInput(e.target.value)} />
        </form>
    )
}