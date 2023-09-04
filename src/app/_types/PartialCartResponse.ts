import { PartialProductResponse } from "./PartialProductResponse";

export interface PartialCartResponse {
  id: string;
  userId: string;
  totalProducts: number;
  totalQuantity: number;
  total: number;
  products?: PartialProductResponse[];
}
