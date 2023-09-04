import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <div>
      <FontAwesomeIcon
        className="h-4 text-primary animate-spin"
        icon={faSpinner}
      />
    </div>
  );
}
