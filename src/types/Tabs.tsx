
export interface TabProps {
    tabId: number;
    name: string;
    blocks: BlockProps[];
}

export interface BlockProps {
    id: number,
    type: 'chat ' | 'terminal',
    input: string,
    output?: string,
    location: string
}