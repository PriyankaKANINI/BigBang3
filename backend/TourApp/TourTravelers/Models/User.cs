using System.ComponentModel.DataAnnotations;

namespace TourUsers.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string? UserEmail { get; set; }
        public string? UserRole { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordKey { get; set; }
    }
}
