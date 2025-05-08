export interface SubCategory
{
    id: number;
    label: string;
    languageId: number;
    categoryId: number;
}

export interface Category {
    id: number;
    label: string;
    languageId: number;
    subCategories: SubCategory[];
}