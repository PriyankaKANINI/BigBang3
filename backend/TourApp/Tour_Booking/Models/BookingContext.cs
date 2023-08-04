using Microsoft.EntityFrameworkCore;

namespace Tour_Booking.Models
{
    public class BookingContext : DbContext
    {
        public BookingContext(DbContextOptions options) : base(options) 
        {
        
        }
        public DbSet<Booking>? Bookings { get; set; }
        public DbSet<AdditionalTraveler>? AdditionalTravelers { get; set;}
    }
}
