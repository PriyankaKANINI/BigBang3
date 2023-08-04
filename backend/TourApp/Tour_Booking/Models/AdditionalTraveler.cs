using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tour_Booking.Models
{
    public class AdditionalTraveler
    {
        public int AdditionalTravelerId { get; set; }
        public int PackageId { get; set; } 
        public int TravelerId { get; set; }
        public int BookingId { get; set; }
        [ForeignKey("BookingId")]
        [JsonIgnore]
        public Booking? Booking { get; set; }
        public string? AdditionalTravelerName { get; set;}
        public int AdditionalTravelerAge { get; set; }
        public string? AdditionalTravelerPhone { get; set;}
    }
}