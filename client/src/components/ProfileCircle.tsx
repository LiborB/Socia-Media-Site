import axios from "axios";
import { useQuery } from "react-query";

interface Props {
  userId?: number;
  onClick: () => void;
}

export default function ProfileCircle(props: Props) {
  return (
    <div
      onClick={props.onClick}
      className="w-12 h-12 rounded-full overflow-hidden cursor-pointer"
    >
      {!!!props.userId ? (
        <img
          className="rounded-full"
          src={`https://localhost:7052/api/user/profile-picture/${props.userId}`}
        />
      ) : (
        <img
          src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
          className="h-full w-auto"
        />
      )}
    </div>
  );
}
