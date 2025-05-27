import { SimpleUserType } from "./SimpleUserType"

export type MessageType = {
    id: number
    content: string
    sender: SimpleUserType
    createdAt: string
    isUpdated: boolean
}

export type wsMessageResponseType = {
    message: MessageType;
}

export type wsDeleteMessageResponseType = {
	messageId: number;
}