import { useGetProductsQuery } from "@/redux/features/admin/products";

export const useSubCategoryProducts = (
  subCategoryId: number,
  limit: number = 5,
) => {
  // Query object-ta dynamic vabe banano holo
  const queryParams = {
    subCategory: subCategoryId,
    limit: limit,
    // Apni chaile ekhane default 'sort' ba 'page' o diye dite paren
  };

  const { data, isLoading, isError, refetch } = useGetProductsQuery(
    queryParams,
    {
      // Jodi subCategoryId na thake, tobe call korbe na (Skip logic)
      skip: !subCategoryId,
    },
  );

  return {
    // @ts-ignore
    products: data?.data || [],
    totalCount: data?.totalCount || 0,
    isLoading,
    isError,
    refetch,
  };
};
