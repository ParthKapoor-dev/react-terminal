import { Section } from "../types/app";


export const initialApp: Section[] = [
    {
        type: "parent",
        metadata: {
            id: 101,
            split: "hor"
        },
        children: [
            {
                type: "terminal",
                metadata: {
                    id: 1001,
                },
                data: [
                    {
                        tabId: 1,
                        name: "~/code/mern/terminal",
                        blocks: [
                            {
                                id: 1,
                                type: 'terminal',
                                location: "~/code/mern/react-terminal",
                                input: "ls src/",
                                output: "app.tsx   assets   components   index.css   main.tsx   Pages   utils   vite-env.d.ts   xtermTerminal.tsx",
                            },
                            {
                                id: 2,
                                type: 'terminal',
                                location: "~/code/mern/react-terminal",
                                input: "cd src/",
                            },
                        ]
                    }
                ]
            },
            // {
            //     type: "terminal",
            //     metadata: {
            //         id: 1002,
            //     },
            //     data: [
            //         {
            //             tabId: 1,
            //             name: "~/code/mern/terminal",
            //             blocks: [
            //                 {
            //                     id: 1,
            //                     type: 'terminal',
            //                     location: "~/code/mern/react-terminal",
            //                     input: "ls src/",
            //                     output: "app.tsx   assets   components   index.css   main.tsx   Pages   utils   vite-env.d.ts   xtermTerminal.tsx",
            //                 },
            //                 {
            //                     id: 2,
            //                     type: 'terminal',
            //                     location: "~/code/mern/react-terminal",
            //                     input: "cd src/",
            //                 },
            //             ]
            //         }
            //     ]
            // },
            {
                type: "chatbot",
                metadata: {
                    id: 501,
                },
                data: {
                    chatId : 1001,
                    chatBlocks : []
                }
            }
        ]
    }
]