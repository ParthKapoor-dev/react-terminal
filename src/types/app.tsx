import { TabProps } from "./Tabs";

export interface AppState {
    windows: Section[]
}

export type Section = TerminalSection | ParentSection

export interface TerminalSection {
    type: "terminal",
    metadata: {
        id: number;
    }
    data: TabProps[]
}

export interface ParentSection {
    type: "parent",
    metadata: {
        id: number;
        split: "hor" | "ver"
    },
    children: Section[]
}
