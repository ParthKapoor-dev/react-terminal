import { TabProps } from "./Tabs";

export interface AppState {
    windows: Section[]
}

export type Section = EditorSection | ParentSection;

export type updateType = 'addTop' | 'addLeft' | 'addRight' | 'addBottom' | 'delete';

export interface ParentSection {
    type: "parent",
    metadata: {
        id: number;
        split: "hor" | "ver"
    },
    children: Section[]
}

export interface EditorSection {
    type: "editor",
    metadata: {
        id: number;
    },
    data: TabProps[]
}