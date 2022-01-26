using Microsoft.AspNetCore.Mvc;
using Server.Business.Model;
using Server.Domain.dto;

namespace Server.Controllers;

public class BaseController : Controller
{
    protected UserDTO GetCurrentUser()
    {
        return HttpContext.Items["user"] as UserDTO;
    }
}