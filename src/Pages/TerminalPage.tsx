import Block from "../components/Block";
import Terminal from "../components/Terminal";
import { BlockProps, TabProps } from "../types/Tabs";


interface TabPageProps extends TabProps {
    addBlock: (newBlock: BlockProps) => void
}

export default function TerminalPage({ tabId, addBlock, blocks, type }: TabPageProps) {


    if (type == 'chatbot')
        return null;

    return (
        <div>
            <div>
                {blocks.map(item => (
                    <Block key={item.id} {...item} />
                ))}
            </div>
            <Terminal location={"~/code/mern/react-terminal/src"} addBlock={addBlock} tabId={tabId} />
        </div>
    );
}
