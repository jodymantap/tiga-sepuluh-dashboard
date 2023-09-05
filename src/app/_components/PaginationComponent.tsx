import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type filterProps = {
  category?: string;
  brand?: string;
  price?: string;
};

interface PaginationComponentProps {
  skip: number;
  q: string;
  total: number;
  pathname: string;
  filter?: filterProps;
}

export default function PaginationComponent({
  q,
  skip,
  filter,
  total,
  pathname,
}: PaginationComponentProps) {
  const currentPage = skip / 5 + 1;
  return (
    <div className="flex justify-between items-center mt-6">
      <Link
        href={{
          pathname: pathname ? pathname : "/",
          query: {
            skip: skip > 0 ? skip - 5 : 0,
            ...(filter?.category ? { category: filter.category } : {}),
            ...(filter?.brand ? { brand: filter.brand } : {}),
            ...(filter?.price ? { price: filter.price } : {}),
            ...(pathname === "/search" ? { q } : {}),
          },
        }}
      >
        <div className="cursor-pointer">
          <FontAwesomeIcon
            className="h-4 text-secondary"
            icon={faChevronLeft}
          />
          <FontAwesomeIcon className="h-4 text-primary" icon={faChevronLeft} />
        </div>
      </Link>
      <h4 className="text-primary font-medium text-sm">
        Page {currentPage} of {filter?.price ? 1 : Math.ceil(total / 5)}
      </h4>
      <Link
        href={{
          pathname: pathname ? pathname : "/",
          query: {
            skip: skip + 5 < total && !filter?.price ? skip + 5 : skip,
            ...(filter?.category ? { category: filter.category } : {}),
            ...(filter?.brand ? { brand: filter.brand } : {}),
            ...(filter?.price ? { price: filter.price } : {}),
            ...(pathname === "/search" ? { q } : {}),
          },
        }}
      >
        <div className="cursor-pointer">
          <FontAwesomeIcon className="h-4 text-primary" icon={faChevronRight} />
          <FontAwesomeIcon
            className="h-4 text-secondary"
            icon={faChevronRight}
          />
        </div>
      </Link>
    </div>
  );
}
