using System.ComponentModel.DataAnnotations;

namespace Tour_Booking.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; } 
        public string? CustomerName { get; set; }
        public string? CustomerEmail { get; set; }
        public string? CustomerPhone { get; set; }
    }
}
