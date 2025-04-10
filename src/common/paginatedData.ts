export type PaginatedData<T> = {
    data: T[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
        pageCount: number;
    };
}