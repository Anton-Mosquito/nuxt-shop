import { defineStore } from "pinia";
import type { IProduct } from "~/interfaces/product.interface";

type SlideItem = Pick<IProduct, "id" | "name" | "price" | "images">;

export const useProductStore = defineStore("product", () => {
  // State
  const products = ref<IProduct[]>([]);
  const loading = ref(false);
  //const error = ref<string | null>(null);

  // Getters
  const featuredSlides = computed<SlideItem[]>(() =>
    products.value.slice(0, 3).map(({ id, name, price, images }) => ({
      id,
      name,
      price,
      images,
    }))
  );

  //   const recentProducts = computed<IProduct[]>(() => {
  //     return products.value.slice(0, 6);
  //   });

  //   // Actions
  //   const fetchProducts = async (limit = 6) => {
  //     loading.value = true;
  //     error.value = null;

  //     try {
  //       const API_URL = useAPI();
  //       const { data: response, error: fetchError } = await useFetch<{
  //         products: IProduct[];
  //       }>(`${API_URL}/products`, {
  //         query: { limit },
  //       });

  //       if (fetchError.value) {
  //         error.value = fetchError.value.message;
  //         return;
  //       }

  //       if (response.value?.products) {
  //         products.value = response.value.products;
  //       }
  //     } catch (err) {
  //       error.value =
  //         err instanceof Error ? err.message : "Failed to fetch products";
  //     } finally {
  //       loading.value = false;
  //     }
  //   };

  const setProducts = (newProducts: IProduct[]) => {
    products.value = newProducts;
  };

  const clearProducts = () => {
    products.value = [];
  };

  return {
    // State
    products,
    loading,
    //error,
    // Getters
    featuredSlides,
    //recentProducts,
    // Actions
    //fetchProducts,
    setProducts,
    clearProducts,
  };
});
