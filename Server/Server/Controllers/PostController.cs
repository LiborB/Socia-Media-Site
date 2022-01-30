using Microsoft.AspNetCore.Mvc;
using Server.Domain.dto;
using Server.Domain.services;

namespace Server.Controllers;

[ApiController]
[Route("post")]
public class PostController : BaseController
{
    private readonly IPostService _service;

    public PostController(IPostService service)
    {
        _service = service;
    }

    [HttpPost]
    [Route("")]
    [TypeFilter(typeof(AuthFilter))]
    public async Task<ActionResult> CreatePost([FromBody] CreatePostDTO createPostDto)
    {
        await _service.CreatePost(createPostDto);

        return Ok();
    }

    [HttpGet]
    [Route("{userId}")]
    [TypeFilter(typeof(AuthFilter))]
    public ActionResult<IEnumerable<PostDTO>> PostsForUser([FromRoute] int userId)
    {
        var posts = _service.GetPostsForUser(userId);

        return Ok(posts);
    }

    [HttpGet]
    [Route("wall")]
    [TypeFilter(typeof(AuthFilter))]
    public ActionResult<IEnumerable<PostDTO>> WallPosts()
    {
        var user = GetCurrentUser();

        var posts = _service.GetWallPosts(user.Id);

        return Ok(posts);
    }
}