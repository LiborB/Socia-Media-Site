import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ProfileDetail } from "../models/profile-detail";

export default function ProfilePage() {
  const { username } = useParams();

  const { data: userDetail } = useQuery(["userDetails", username], () =>
    axios.get<ProfileDetail>(`/user/profile/${username}`).then((x) => x.data)
  );

  const { dataUpdatedAt: addFriendUpdated, refetch: refetchAddFriend } =
    useQuery("addFriend", () => axios.post(`/user/friend/${userDetail?.id}`), {
      enabled: false,
    });

  const { refetch: refetchUnfriend, dataUpdatedAt: unfriendUpdated } = useQuery(
    "removeFriend",
    () => axios.post(`/user/unfriend/${userDetail?.id}`),
    {
      enabled: false,
    }
  );

  const { data: isFriend } = useQuery(
    ["isfriend", userDetail?.id, addFriendUpdated, unfriendUpdated],
    () =>
      axios
        .get<boolean>(`/user/isfriend/${userDetail?.id}`)
        .then((x) => x.data),
    {
      enabled: !!userDetail,
    }
  );

  const handleAddFriend = () => {
    refetchAddFriend();
  };

  const handleRemoveFriend = () => {
    refetchUnfriend();
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>profile {username}</div>
        <div>{userDetail?.numberOfFriends} friends</div>
      </div>

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
