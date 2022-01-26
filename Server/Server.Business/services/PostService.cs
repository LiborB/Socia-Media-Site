using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Business.Model;
using Server.Domain.dto;
using Server.Domain.services;

namespace Server.Business.services;

public class PostService : IPostService
{
    private readonly ServerContext _context;
    private readonly IMapper _mapper;

    public PostService(ServerContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public IEnumerable<PostDTO> GetPostsForUser(int userId)
    {
        var posts = _context.Posts.Where(x => x.User.Id == userId).Include(x => x.User);

        return _mapper.Map<IEnumerable<PostDTO>>(posts);
    }

    public async Task CreatePost(CreatePostDTO createPostDto)
    {
        _context.Posts.Add(new Post()
        {
            Title = createPostDto.Title,
            Content = createPostDto.Content,
            UserId = createPostDto.UserId,
            Created = DateTime.UtcNow,
            Updated = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();
    }
}