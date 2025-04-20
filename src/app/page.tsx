"use client";

import { useEffect, useState } from "react";
import { AdvocatesTable } from "@/components/AdvocatesTable";
import { SearchInput } from "@/components/SearchInput";
import { AdvocateResultsT } from "@/app/api/advocates/route";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "use-debounce";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [advocateData, setAdvocateData] = useState<
    AdvocateResultsT["data"] | undefined
  >();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await fetch(
          `/api/advocates?search=${debouncedSearchTerm}&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch advocates");
        }
        const jsonResponse = (await response.json()) as AdvocateResultsT;
        setAdvocateData(jsonResponse.data);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch advocates",
          variant: "destructive",
        });
      }
    };

    fetchAdvocates();
  }, [debouncedSearchTerm, currentPage, toast]);

  const handleSearchTermChange = (updatedSearchTerm: string) => {
    setSearchTerm(updatedSearchTerm);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Solace Advocates</h1>
      <div className="max-w-md">
        <SearchInput
          onSearchTermChange={handleSearchTermChange}
          value={searchTerm}
        />
      </div>
      {advocateData ? (
        <AdvocatesTable
          advocateData={advocateData}
          onPageChange={setCurrentPage}
        />
      ) : (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
}
