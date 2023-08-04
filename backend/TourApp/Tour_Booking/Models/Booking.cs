using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
//using Tour_packages.Models;
//using Tour_LoginRegister.Models;

namespace Tour_Booking.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        public int PackageId { get; set; }
        public int AddTravelerCount { get;set; }
        public int AgentID { get; set; }
        public int TravelerID { get; set; }
        public double Amount{ get; set; }
        public double TotalAmount { get; set; }
        public ICollection<AdditionalTraveler>? AdditionalTravelers { get; set;}
    }
}
