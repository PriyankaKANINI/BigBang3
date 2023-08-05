using Tour_Feedback.Interfaces;
using Tour_Feedback.Models;

namespace Tour_Feedback.Services
{
    public class FeedbackService : IFeedback
    {
        private readonly IRepo<int, Feedback> _repo;
        public FeedbackService(IRepo<int, Feedback> repo)
        {
            _repo = repo;
        }
        public async Task<Feedback?> AddReview(Feedback item)
        {
            try
            {
                var FB = await _repo.Add(item);
                if (FB != null)
                {
                    return FB;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Feedback?> DeleteReview(int id)
        {
            try
            {
                var fb = await _repo.Delete(id);
                if (fb != null)
                {
                    return fb;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<ICollection<Feedback>?> GetAllReviews()
        {
            try
            {
                var reviews = await _repo.GetAll();
                if (reviews != null)
                {
                    return reviews;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Feedback?> GetReview(int id)
        {
            try
            {
                var review = await _repo.Get(id);
                if (review != null)
                {
                    return review;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
    }
}
