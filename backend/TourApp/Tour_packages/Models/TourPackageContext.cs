using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace Tour_packages.Models
{
    public class TourPackageContext : DbContext
    {
        public TourPackageContext(DbContextOptions options) : base(options) 
        {
            
        }
        public DbSet<Itinerary> Itineraries { get; set; }
        public DbSet<Package> Packages { get; set; }
        //public DbSet<Image> Images { get; set; }
        public DbSet<ContactDetails> Contacts { get; set; }
    }
}
