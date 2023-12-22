export interface PaginatedResult<T> {
    count: number;
    result: T[];
}