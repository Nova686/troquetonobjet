export type Category = {
    id: number;
    label: string;
}

export type Offer = {
    title: string;
    description: string;
    is_visible: boolean;
    is_donation: boolean;
    city_name: string;
    longitude: number;
    latitude: number;
}