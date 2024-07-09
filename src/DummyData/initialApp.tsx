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
                type: "editor",
                metadata: {
                    id: 1001,
                },
                data: [
                    {
                        tabId: 1,
                        name: "~/code/mern/terminal",
                        type : 'terminal',
                        blocks: [
                            {
                                id: 1,
                                location: "~/code/mern/react-terminal",
                                input: "ls src/",
                                output: "app.tsx   assets   components   index.css   main.tsx   Pages   utils   vite-env.d.ts   xtermTerminal.tsx",
                            },
                            {
                                id: 2,
                                location: "~/code/mern/react-terminal",
                                input: "cd src/",
                            },
                        ]
                    },
                    // {
                    //     tabId : 2,
                    //     name : "ChatBot",
                    //     type : 'chatbot',
                    //     blocks : []
                    // }
                ]
            },
            // {
            //     type: "editor",
            //     metadata: {
            //         id: 1002,
            //     },
            //     data: [
            //         {
            //             tabId: 1,
            //             name: "~/code/mern/terminal",
            //             type : "terminal",
            //             blocks: [
            //                 {
            //                     id: 1,
            //                     location: "~/code/mern/react-terminal",
            //                     input: "ls src/",
            //                     output: "app.tsx   assets   components   index.css   main.tsx   Pages   utils   vite-env.d.ts   xtermTerminal.tsx",
            //                 },
            //                 {
            //                     id: 2,
            //                     location: "~/code/mern/react-terminal",
            //                     input: "cd src/",
            //                 },
            //             ]
            //         }
            //     ]
            // },
        ]
    }
]