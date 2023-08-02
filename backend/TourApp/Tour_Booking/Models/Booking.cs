using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Tour_packages.Models;
using TourUsers.Models;

namespace Tour_Booking.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        [Required]
        public int PackageId { get; set; }
        [ForeignKey("TourPackageId")]
        public Package Package { get; set; }

        [Required]
        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }

        public List<Customer> Guests { get; set; }

        [Required]
        public int AgentId { get; set; }
        [ForeignKey("AgentId")]
        public Agent Agent { get; set; }

        [Required]
        public int TravelerId { get; set; }
        [ForeignKey("TravelerId")]
        public Traveler Traveler { get; set; }

        public DateTime BookingDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double TotalAmount { get; set; }
        public string PaymentMethod { get; set; }
        public string BookingStatus { get; set; }
        public string AdditionalDetails { get; set; }

        public Booking()
        {
            BookingDate = DateTime.Now;
            StartDate = DateTime.Now.Date;
            EndDate = DateTime.Now.Date.AddDays(7);
        }

        public void CalculateTotalAmount()
        {
            double packageRate = Package?.Rate ?? 0;
            int numberOfGuests = Guests?.Count ?? 0;

            TotalAmount = packageRate * numberOfGuests;
        }
    }
}
