using Tour_Feedback.Models;

namespace Tour_Feedback.Interfaces
{
    public interface IFeedback
    {
        public Task<Feedback?> AddReview(Feedback item);
        public Task<Feedback?> DeleteReview(int id);
        public Task<Feedback?> GetReview(int id);
        public Task<ICollection<Feedback>?> GetAllReviews();
    }
}
