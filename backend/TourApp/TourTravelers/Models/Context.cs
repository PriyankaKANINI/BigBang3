using Microsoft.EntityFrameworkCore;

namespace TourUsers.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions options) : base(options) 
        { 
        
        }
        public DbSet<User>? Users { get; set; }
        public DbSet<Traveler>? Travelers { get; set; }
        public DbSet<Agent>? Agents { get; set; }
    }
}
