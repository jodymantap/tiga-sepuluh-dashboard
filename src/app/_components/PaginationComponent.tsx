import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface PaginationComponentProps {
  skip: number;
  total: number;
}

export default function ({ skip, total }: PaginationComponentProps) {
  const currentPage = skip / 5 + 1;
  return (
    <div className="flex justify-between items-center mt-2">
      <Link
        href={{
          pathname: "/",
          query: {
            skip: skip > 0 ? skip - 5 : 0,
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
      <h4 className="text-primary font-medium text-sm">Page {currentPage}</h4>
      <Link
        href={{
          pathname: "/",
          query: {
            skip: skip + 5 < total ? skip + 5 : skip,
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
