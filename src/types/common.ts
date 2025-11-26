// src/types/common.ts
export interface PaginationParams {
  currentPage: number;
  pageSize: number;
}

export interface PackageDetailParams {
  packageId: string;
}

export interface Course {
  _id: string;
  name?: string;
  title:string;
  status:number;
  src: string;
  sort_id?: number;
}

export interface Package {
    _id: string;
  name: string;
  price: string;         // match type expected
  description: string;   // ✅ add this field
}
