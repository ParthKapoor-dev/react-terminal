
export interface ChatProps {
    chatId : number,
    chatBlocks : ChatBlockProps[]
} 

export interface ChatBlockProps{
    id : number,
    input : string,
    output : string,
}