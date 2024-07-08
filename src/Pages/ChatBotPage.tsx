import ChatBlock from "../components/chatBot/chatBlock";
import ChatInput from "../components/chatBot/chatInput";
import { BlockProps, TabProps } from "../types/Tabs";

interface ChatBotScreenProps extends TabProps {
    addChats: (newChats: BlockProps) => void
}
export default function ChatbotPage({  blocks , addChats }: ChatBotScreenProps) {

    return (
        <div className="h-[96vh] w-full overflow-hidden">
            <div className="flex flex-col bg-white dark:bg-black h-full rounded py-2 px-4 overflow-scroll">

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
        </div>
    )
}