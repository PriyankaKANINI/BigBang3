using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tour_packages.Models
{
    public class Image
    {
        [Key]
        public int ImageId { get; set; }

        [ForeignKey("Package")]
        public int PackageId { get; set; }
        public Package Package { get; set; }
        public string? ImageUrl { get; set; }
    }
}
