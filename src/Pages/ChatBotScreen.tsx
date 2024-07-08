import ChatBlock from "../components/chatBot/chatBlock";
import ChatInput from "../components/chatBot/chatInput";
import { ChatBlockProps, ChatProps } from "../types/Chat";

interface ChatBotScreenProps {
    Chats: ChatProps,
    setChats: (newChats: ChatProps) => void
}
export default function ChatBotScreen({ Chats, setChats }: ChatBotScreenProps) {

    function addChats(newChatBlock: ChatBlockProps) {
        let updatedChats: ChatProps = Chats;
        updatedChats.chatBlocks = [...Chats.chatBlocks, newChatBlock];
        setChats(updatedChats);
    }

    return (
        <div className="h-[96vh] w-full overflow-hidden">
            <div className="flex flex-col bg-white dark:bg-black h-full rounded py-2 px-4 overflow-scroll">

                <div className="text-2xl font-semibold mb-2">
                    Chat Bot 
                </div>

                <div className="flex flex-col gap-8">
                    {Chats.chatBlocks.map(chat => (
                        <ChatBlock {...chat} />
                    ))}
                </div>

                <ChatInput addChats={addChats} />
            </div>
        </div>
    )
}