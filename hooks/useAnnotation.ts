import useSWRImmutable from "swr";

export const useAnnotation = (id: string | string[] | undefined) => {
  const fetcher = async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => await fetch(input, init).then((res) => res.json());

  const { data, error, isValidating, mutate } = useSWRImmutable(
    `${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}/find-by-alias-or-id`,
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
