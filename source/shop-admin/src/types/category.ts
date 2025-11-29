export interface Category {
    categoryId: number;
    name: string;
    depth: number;
    sortOrder?: number;
    parentId?: number;
    children?: Category[];
}
