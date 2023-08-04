using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Tour_Image.Models
{
    public class TourImageContext : DbContext
    {
        public TourImageContext(DbContextOptions<TourImageContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<TourImages> ImageModels { get; set; }

    }

}
