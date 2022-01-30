import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { userId } = useParams();

  const { dataUpdatedAt: addFriendUpdated, refetch: refetchAddFriend } =
    useQuery("addFriend", () => axios.post(`/user/friend/${userId}`), {
      enabled: false,
    });

  const { refetch: refetchUnfriend, dataUpdatedAt: unfriendUpdated } = useQuery(
    "addFriend",
    () => axios.post(`/user/unfriend/${userId}`),
    {
      enabled: false,
    }
  );

  const { data: isFriend } = useQuery(
    ["isfriend", userId, addFriendUpdated, unfriendUpdated],
    () => axios.get<boolean>(`/user/isfriend/${userId}`).then((x) => x.data)
  );

  const handleAddFriend = () => {
    refetchAddFriend();
  };

  const handleRemoveFriend = () => {
    refetchUnfriend();
  };

  return (
    <div>
      profile {userId}
      <div>
        {isFriend ? (
          <button
            onClick={handleRemoveFriend}
            className="border border-red-400 px-4 py-2 text-lg rounded-md text-red-400"
          >
            Unfriend
          </button>
        ) : (
          <button
            onClick={handleAddFriend}
            className="border border-blue-400 px-4 py-2 text-lg rounded-md text-blue-400"
          >
            Add Friend
          </button>
        )}
      </div>
    </div>
  );
}
