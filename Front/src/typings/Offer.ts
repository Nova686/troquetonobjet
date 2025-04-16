export type Category = {
    id: number;
    label: string;
}

export type OfferFormCreate = {
    title: string;
    description: string;
    subCategoryId: null|number;
    isVisible: boolean;
    isDonation: boolean;
    cityName: string;
    placeId: string;
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