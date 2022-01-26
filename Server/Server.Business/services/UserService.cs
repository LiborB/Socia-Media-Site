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
}