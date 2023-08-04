using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tour_packages.Models
{
    public class ContactDetails
    {
        [Key]
        public int ContactId { get; set; }

        [ForeignKey("Package")]
        public int PackageId { get; set; }
        public Package? Package { get; set; }
        public string? TravelAgentName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
    }
}
