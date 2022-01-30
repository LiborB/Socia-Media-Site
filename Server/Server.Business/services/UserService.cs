using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Business.Model;
using Server.Domain;
using Server.Domain.dto;
using Server.Domain.services;

namespace Server.Business.services;

public class UserService : IUserService
{
    private readonly ServerContext _context;
    private readonly IMapper _mapper;

    public UserService(ServerContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<UserDTO> CreateUser(CreateAccountDTO createAccountDto)
    {
        var user = new User()
        {
            FirstName = createAccountDto.FirstName,
            LastName = createAccountDto.LastName,
            Username = createAccountDto.Username,
            Created = DateTime.UtcNow,
            Updated = DateTime.UtcNow,
            Token = Guid.NewGuid().ToString(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(createAccountDto.Password)
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return _mapper.Map<UserDTO>(user);
    }

    public Task<bool> IsUsernameTaken(string username)
    {
        return _context.Users.AnyAsync(x => x.Username == username);
    }

    public async Task<UserDTO> LoginUser(string username, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

        if (user == null)
        {
            throw new LoginException();
        }

        var isPasswordMatch = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

        if (!isPasswordMatch)
        {
            throw new LoginException();
        }

        return _mapper.Map<UserDTO>(user);
    }

    public async Task<UserDTO> AuthUser(string token)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Token == token);

        if (user == null)
        {
            throw new LoginException();
        }

        return _mapper.Map<UserDTO>(user);
    }

    public IEnumerable<UserSearchItemDTO> GetUsersMatchingQuery(string searchQuery)
    {
        var upperQuery = searchQuery.ToUpper();
        var users = _context.Users.Where(x =>
            x.Username.ToUpper().Contains(upperQuery) || x.FirstName.ToUpper().Contains(upperQuery)
                                                      || x.LastName.ToUpper().Contains(upperQuery));
        return _mapper.Map<IEnumerable<UserSearchItemDTO>>(users);
    }

    public async Task AddFriend(int userId, int userIdToFriend)
    {
        if (await _context.Friends.AnyAsync(x =>
                x.FirstUserId == userId && x.SecondUserId == userIdToFriend ||
                x.SecondUserId == userId && x.FirstUserId == userIdToFriend))
        {
            return;
        }

        _context.Friends.Add(new Friend()
        {
            FirstUserId = userId,
            SecondUserId = userIdToFriend
        });

        await _context.SaveChangesAsync();
    }

    public async Task RemoveFriend(int userId, int userIdToUnfriend)
    {
        var friend = await _context.Friends.FirstOrDefaultAsync(x =>
            x.FirstUserId == userId && x.SecondUserId == userIdToUnfriend ||
            x.SecondUserId == userId && x.FirstUserId == userIdToUnfriend);
        
        if (friend != null)
        {
            _context.Friends.Remove(friend);
            await _context.SaveChangesAsync();
        }
    }

    public bool IsFriend(int userId, int secondUserId)
    {
        return _context.Friends.Any(x =>
            x.FirstUserId == userId && x.SecondUserId == secondUserId ||
            x.SecondUserId == userId && x.FirstUserId == secondUserId);
    }
}