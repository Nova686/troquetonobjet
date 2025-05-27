import {Offer} from "./Offer";

export interface Report {
    id: number,
    userId: number,
    offerId: number,
    offerTitle: string,
    reason: string,
    username: string,
    created_at: string | null,
    updated_at: string | null,
    offer: Offer
}