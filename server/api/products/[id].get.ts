import {
  productIdParamsSchema,
  type ProductIdParamsInput,
} from "~~/shared/schemas";
import { getProductById } from "~~/server/services";

export default defineEventHandler(
  async (event): Promise<GetProductResponse> => {
    const { id }: ProductIdParamsInput = await getValidatedRouterParams(
      event,
      productIdParamsSchema.parse
    );

    return await getProductById(id);
  }
);
