import {
  productIdsQuerySchema,
  type ProductIdsQueryInput,
} from "~~/shared/schemas";
import { getProductsByIds } from "~~/server/services/products";

export default defineEventHandler(
  async (event): Promise<GetProductsResponse> => {
    const { ids } = await getValidatedQuery<ProductIdsQueryInput>(
      event,
      productIdsQuerySchema.parse
    );

    const products = await getProductsByIds(ids);

    return { products };
  }
);
