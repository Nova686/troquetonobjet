export interface SubCategory
{
    id: number;
    name: string;
    languageId: number;
    categoryId: number;
}

export interface Category {
    id: number;
    name: string;
    languageId: number;
    subCategories: SubCategory[];
}