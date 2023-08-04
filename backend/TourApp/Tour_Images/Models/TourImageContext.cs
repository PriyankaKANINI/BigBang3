using Microsoft.EntityFrameworkCore;

namespace Tour_Images.Models
{
    public class TourImageContext : DbContext
    {
        public TourImageContext(DbContextOptions<TourImageContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<TourImage> TourImages { get; set; }
    }
}
