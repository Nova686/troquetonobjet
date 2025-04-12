export type Pagination<T> = {
    list: T[];
    page: number;
    nbPerPage: number;
    total: number;
    totalPage: number;
    hasNextPage: boolean;
}