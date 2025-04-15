export type Category = {
    id: number;
    label: string;
}

export type OfferFormCreate = {
    title: string;
    description: string;
    is_visible: boolean;
    is_donation: boolean;
    city_name: string;
    longitude: number;
    latitude: number;
    userId?: number;
}

export type Offer = {
    id : number;
    author : {
        id : number;
        username : string;
    }
    title : string
    cityName : string;
    description : string;
    isDonation : boolean;
    isFavorite: boolean;
    latitude : number;
    longitude : number;
    images : Array<string>;
    mainImage : string;
    isUpdated : boolean;
    createdAt : string;
}