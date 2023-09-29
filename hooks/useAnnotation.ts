import useSWRImmutable from 'swr/immutable';
import { findByAliasOrId } from '../services/dontWannaLogin';

export const useAnnotation = (id: string | string[] | undefined) => {
  const fetcher = async () => await findByAliasOrId(id);

  const { data, error, isValidating, mutate } = useSWRImmutable(
    [`/annotations/${id}/find-by-alias-or-id`],
    fetcher
  );

  return {
    fetchedAnnotation: data,
    isAnnotationError: error,
    isAnnotationLoading: !error && !data,
    isValidating,
    mutate,
  };
};
