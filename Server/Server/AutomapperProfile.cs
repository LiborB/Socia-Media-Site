using AutoMapper;
using Server.Business.Model;
using Server.Domain.dto;

namespace Server;

public class AutomapperProfile : Profile
{
    public AutomapperProfile()
    {
        CreateMap<User, UserDTO>();
        CreateMap<Post, PostDTO>();
        CreateMap<User, UserSearchItemDTO>();
        CreateMap<User, ProfileDetailDTO>();
    }
}