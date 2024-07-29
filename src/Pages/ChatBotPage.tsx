import { useEffect, useRef, useState } from "react";
import ChatBlock from "../components/chatBot/chatBlock";
import ChatInput from "../components/chatBot/chatInput";
import { updateType } from "../types/app";
import { BlockProps, TabProps } from "../types/Tabs";
import Splits from "../components/Split";

interface ChatBotScreenProps extends TabProps {
    addChats: (newChats: BlockProps) => void
    addChild: (Tab: TabProps, type: updateType) => void
}
export default function ChatbotPage({ blocks, addChats, addChild }: ChatBotScreenProps) {

    const [dragover, setDragover] = useState<boolean>(false);
    const pageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log('useeffect')
        pageRef.current?.scrollTo({
            top: pageRef.current.scrollHeight,
            behavior: 'smooth'
        });
    })

    function handleDragOver() {
        setDragover(true);
    }

    function handleDragLeave() {
        setDragover(false);
    }

    return (
        <div className="h-[96vh] w-full overflow-hidden relative" onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
            <div className="flex flex-col bg-white dark:bg-black h-full rounded py-2 px-4 overflow-scroll" ref={pageRef}>

                <div className="text-2xl font-semibold mb-2">
                    Chat Bot
                </div>

                <div className="flex flex-col gap-8">
                    {blocks.map(chat => (
                        <ChatBlock {...chat} key={chat.id} />
                    ))}
                </div>

                <ChatInput addChats={addChats} />
            </div>
            <Splits dragover={dragover} setDragover={setDragover} addChild={addChild} />

        </div>
    )
}