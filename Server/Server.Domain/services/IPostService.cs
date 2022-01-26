using Server.Domain.dto;

namespace Server.Domain.services;

public interface IPostService
{
    IEnumerable<PostDTO> GetPostsForUser(int userId);
    Task CreatePost(CreatePostDTO createPostDto);
}