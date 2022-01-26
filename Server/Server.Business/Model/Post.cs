namespace Server.Business.Model;

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime Created { get; set; }
    public DateTime Updated { get; set; }
    public User User { get; set; }
    public int UserId { get; set; }
}