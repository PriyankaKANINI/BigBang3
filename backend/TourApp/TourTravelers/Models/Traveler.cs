using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tour_LoginRegister.Models
{
    public class Traveler
    {
        [Key]
        public int TravelerID { get; set; }
        public string? TravelerName { get; set; }
        public int Age { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? Nationality { get; set; }
        [ForeignKey("TravelerID")]
        public User? User { get; set; }
    }
}
