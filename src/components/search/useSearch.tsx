import { useQuery } from "@tanstack/react-query";
import useDebouncedValue from "@/utilities/useDebouncedValue";
import { useState } from "react";
import { SearchResponse } from "@/app/api/search/route";

export default function useSearch() {
  const [searchQueryValue, setSearchQueryValue] = useState<string>("");

  const searchQueryDebouncedValue = useDebouncedValue(searchQueryValue, 500, {
    debounceFalsy: false,
    debounceOldValues: false,
  });

  const showQuery = useQuery({
    queryKey: ["search", searchQueryDebouncedValue],
    queryFn: async () => {
      const response = await fetch(`/api/search?q=${searchQueryDebouncedValue}`);
      const data: SearchResponse = await response.json();
      if ("error" in data) throw new Error(data.error);
      return data.results;
    },
    enabled: searchQueryDebouncedValue !== "",
    staleTime: 1000 * 60 * 60,
  });
  return { searchQueryValue, setSearchQueryValue, showQuery, searchQueryDebouncedValue };
}
