using Server.Domain.dto;

namespace Server.Domain.services;

public interface IPostService
{
    IEnumerable<PostDTO> GetPostsForUser(int userId);
    IEnumerable<PostDTO> GetWallPosts(int userId);
    Task CreatePost(CreatePostDTO createPostDto);
}