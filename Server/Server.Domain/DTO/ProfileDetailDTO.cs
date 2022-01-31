namespace Server.Domain.dto;

public class ProfileDetailDTO
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int NumberOfFriends { get; set; }
}