using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tour_Images.Models
{
    public class TourImage
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? ImagePath { get; set; }

        [NotMapped]
        public IFormFile Image { get; set; }
    }
}
