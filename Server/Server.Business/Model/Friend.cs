using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Server.Business.Model;

[Index(nameof(FirstUserId), nameof(SecondUserId), IsUnique = true)]
public class Friend
{
    public int Id { get; set; }
    [ForeignKey("FirstUserId")]
    public int FirstUserId { get; set; }
    public User FirstUser { get; set; }
    public int SecondUserId { get; set; }
    [ForeignKey("SecondUserId")]
    public User SecondUser { get; set; }
    public DateTime Created { get; set; }
    public DateTime Updated { get; set; }
}