using Server.Domain.dto;

namespace Server.Domain.services;

public interface IUserService
{
    public Task<UserDTO> CreateUser(CreateAccountDTO createAccountDto);
    public Task<bool> IsUsernameTaken(string username);
    public Task<UserDTO> LoginUser(string username, string password);
    public Task<UserDTO> AuthUser(string token);
    public IEnumerable<UserSearchItemDTO> GetUsersMatchingQuery(string searchQuery);
    public Task AddFriend(int userId, int userIdToFriend);
    public Task RemoveFriend(int userId, int userIdToUnfriend);
    public bool IsFriend(int userId, int secondUserId);
}