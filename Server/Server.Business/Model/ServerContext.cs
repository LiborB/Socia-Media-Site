using Microsoft.EntityFrameworkCore;

namespace Server.Business.Model;

public class ServerContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(
            "Server=127.0.0.1;Port=5432;Database=postgres;User Id=postgres;Password=postgres;");
    }
}