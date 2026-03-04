import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Shadcn Pagination

export function PaginationComponent() {
  return (
    <Pagination className="mt-12">
      <PaginationContent className="gap-2">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            className="rounded-xl border-gray-100 bg-white hover:bg-[#F1F5F1] transition-colors"
          />
        </PaginationItem>

        {/* Page Numbers */}
        <PaginationItem>
          <PaginationLink href="#" className="rounded-xl border-none font-bold text-gray-400">1</PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationLink href="#" isActive className="rounded-xl bg-[#1F5E3B] text-white hover:bg-[#16432a] font-bold shadow-lg">
            2
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" className="rounded-xl border-none font-bold text-gray-400">3</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis className="text-gray-300" />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" className="rounded-xl border-none font-bold text-gray-400">12</PaginationLink>
        </PaginationItem>

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext 
            href="#" 
            className="rounded-xl border-gray-100 bg-white hover:bg-[#F1F5F1] transition-colors"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}