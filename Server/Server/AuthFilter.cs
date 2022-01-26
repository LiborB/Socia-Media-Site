using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Server.Domain;
using Server.Domain.dto;
using Server.Domain.services;

namespace Server;

public class AuthFilter : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var userService = context.HttpContext.RequestServices.GetService<IUserService>();
        var mapper = context.HttpContext.RequestServices.GetService<IMapper>();
        var token = context.HttpContext.Request.Headers["Authorization"];

        try
        {
            var user = await userService.AuthUser(token);
            context.HttpContext.Items["user"] = mapper.Map<UserDTO>(user);
            await next();
        }
        catch (LoginException e)
        {
            context.Result = new UnauthorizedResult();
        }
    }
}