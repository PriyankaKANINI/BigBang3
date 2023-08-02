﻿using System.ComponentModel.DataAnnotations;

namespace Tour_packages.Models
{
    public class Package
    {
        [Key]
        public int PackageId { get; set; }

        [Required]
        public string? TravelAgencyName { get; set; }

        [Required]
        public string? PackageName { get; set; }
        public string? Description { get; set; }

        [Required]
        public double Rate { get; set; }

        [Required]
        public string? DeparturePoint { get; set; }

        [Required]
        public string? ArrivalPoint { get; set; }
        public List<Image>? Images { get; set; }
        public int AvailablityCount { get; set; }
        public int TotalDays { get; set; }

        [Required]
        public string? Transportation { get; set; }
    }
}
