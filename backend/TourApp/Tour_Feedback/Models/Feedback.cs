using System.ComponentModel.DataAnnotations;

namespace Tour_Feedback.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackID { get; set; }
        public int TravelerID { get; set; }
        public int PackageId { get; set; }
        [Required]
        public string Comment { get; set; }
        [Required]
        public double Ratings { get; set; }
    }
}
