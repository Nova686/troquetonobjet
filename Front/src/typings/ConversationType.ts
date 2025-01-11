import { SimpleUserType } from "./SimpleUserType";

export type ConversationType = {
    id: number;
    buyer: SimpleUserType;
    seller: SimpleUserType;
}