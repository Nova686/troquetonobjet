import {Offer} from "./Offer";

export interface Report {
    id: number,
    user_id: number,
    offer_id: number,
    reason: string,
    created_at: string | null,
    updated_at: string | null,
    offer: Offer
}