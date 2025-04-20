import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSearchTermChange: (searchTerm: string) => void;
  value: string;
}

export function SearchInput({ onSearchTermChange, value }: Props) {
  const handleClickReset = () => {
    onSearchTermChange("");
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        className="border-2 border-gray-300 rounded-md p-2"
        onChange={(e) => onSearchTermChange(e.target.value)}
        value={value}
      />
      <Button onClick={handleClickReset}>Reset Search</Button>
    </div>
  );
}
