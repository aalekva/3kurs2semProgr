using Microsoft.EntityFrameworkCore;
using laba89.Models;
using Microsoft.AspNetCore.Hosting.Server;

namespace laba89.DataAccess;

public class NotesDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public NotesDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public DbSet<Note> Notes => Set<Note>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server =.\\SQLEXPRESS; Database = NotesDb; Trusted_Connection = True;TrustServerCertificate=True;");
    }
}