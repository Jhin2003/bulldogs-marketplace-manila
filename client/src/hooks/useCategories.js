import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../service/api';

const useCategories = () => {
  // Using React Query's useQuery with v5 object syntax
  const {
    data: categories = [], // Provide a default empty array for categories
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['categories'], // Unique key for this query
    queryFn: getCategories, // Function to fetch the data
    staleTime: 1000 * 60 * 10, // Data is fresh for 10 minutes
    cacheTime: 1000 * 60 * 15, // Data is cached for 15 minutes
    refetchOnWindowFocus: true, // Refetch when the window regains focus
  });

  return { categories, loading, error };
};

export default useCategories;