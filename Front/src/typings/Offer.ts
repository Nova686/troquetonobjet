export type Category = {
    id: number;
    label: string;
}

export type OfferFormCreate = {
    title: string|null;
    description: string|null;
    subCategoryId: number|null;
    isVisible: boolean;
    isDonation: boolean;
    cityName: string|null;
    placeId: string|null;
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
    isVisible : boolean;
    isFavorite: boolean;
    subCategory: {id: number, label: string};
    category: {id: number, label: string};
    wishs: Array<{text: string}>;
    latitude : number;
    longitude : number;
    images : Array<string>;
    mainImage : string;
    isUpdated : boolean;
    createdAt : string;
}