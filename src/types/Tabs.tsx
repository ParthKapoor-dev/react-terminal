
export interface TabProps{
    tabId : number,
    name : string,
    type : 'terminal' | 'chatbot',
    // blocks : BlockProps[] | ChatBlockProps[]
    blocks : BlockProps[]
}

// export interface TerminalProps {
//     tabId: number;
//     name: string;
//     type: 'terminal',
//     Terminalblocks: BlockProps[]
// }

// export interface ChatBotProps {
//     tabId: number;
//     name: string;
//     type: 'chatbot'
//     ChatbotBlocks: ChatBlockProps[]
// }


export interface BlockProps {
    id: number,
    // type: 'terminal'
    input: string,
    output?: string,
    location?: string
}

export interface ChatBlockProps {
    id: number,
    // type: 'chatbot'
    input: string,
    output?: string,
}