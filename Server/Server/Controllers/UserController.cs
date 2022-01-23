using Microsoft.AspNetCore.Mvc;
using Server.Domain;
using Server.Domain.dto;
using Server.Domain.services;

namespace Server.Controllers;

[ApiController]
[Route("user")]
public class UserController : Controller
{
    private readonly IUserService _service;
    
    public UserController(IUserService service)
    {
        _service = service;
    }
    [HttpPost]
    [Route("")]
    public async Task<ActionResult<UserDTO>> CreateAccount([FromBody] CreateAccountDTO createAccountDto)
    {
        var isUsernameTaken = await _service.IsUsernameTaken(createAccountDto.Username);
        if (isUsernameTaken)
        {
            return BadRequest("Username is already in use");
        }

        var user = await _service.CreateUser(createAccountDto);

        return Ok(user);
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<UserDTO>> Login([FromBody] LoginDTO loginDto)
    {
        try
        {
            var user = await _service.LoginUser(loginDto.Username, loginDto.Password);
            return Ok(user);
        }
        catch (LoginException exception)
        {
            return Unauthorized("Username/password incorrect.");
        }
    }

    [HttpPost]
    [Route("auth")]
    public async Task<ActionResult<UserDTO>> Auth([FromQuery] string token)
    {
        try
        {
            var user = await _service.AuthUser(token);
            return Ok(user);
        }
        catch (LoginException exception)
        {
            return Unauthorized("Invalid token.");
        }
    }
}