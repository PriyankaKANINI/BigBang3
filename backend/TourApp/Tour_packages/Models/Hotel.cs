﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tour_packages.Models
{
    public class Hotel
    {
        [Key]
        public int HotelId { get; set; }
        [ForeignKey("id")]
        public int ItineraryId { get; set; }
        public Itinerary Itinerary { get; set; }
        public string? HotelName { get; set; }
        public int HotelRating { get; set; }

        [Required]
        public string? RoomType { get; set; }

        [Required]
        public string? HotelFood { get; set; }
    }
}
