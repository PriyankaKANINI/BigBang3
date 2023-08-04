using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tour_Image.Models
{
    public class TourImages
    {
        [Key]
        public int ImageId { get; set; }

        public string? ImageName { get; set; }
        public string? ImagePath { get; set; }

        [NotMapped]
        public IFormFile ImageToInsert { get; set; }
    }
}
