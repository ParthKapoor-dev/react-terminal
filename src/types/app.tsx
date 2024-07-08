import { ChatProps } from "./Chat";
import { TabProps } from "./Tabs";

export interface AppState {
    windows: Section[]
}

export type Section = TerminalSection | ParentSection | ChatBotSection


export interface ParentSection {
    type: "parent",
    metadata: {
        id: number;
        split: "hor" | "ver"
    },
    children: Section[]
}

export interface TerminalSection {
    type: "terminal",
    metadata: {
        id: number;
    },
    data: TabProps[]
}

export interface ChatBotSection {
    type: "chatbot",
    metadata: {
        id: number,
    },
    data : ChatProps
}
