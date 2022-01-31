namespace Server.Domain.dto;

public record PostDTO(int Id, string Title, string Content, DateTime Created, DateTime Updated, UserDTO User);