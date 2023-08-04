using System.ComponentModel.DataAnnotations;

namespace Tour_Feedback.Models
{
    public class Feedback
    {

        [Key]
        public int FeedbackID { get; set; }
        public int? TravelerID { get; set; }
        public int? TourPackageId { get; set; }
        public string? Comment { get; set; }
        public int? Ratings { get; set; }
    }
}
