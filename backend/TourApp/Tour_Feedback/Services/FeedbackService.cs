using Tour_Feedback.Interfaces;
using Tour_Feedback.Models;

namespace Tour_Feedback.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IRepo<int, Feedback> _repo;
        public FeedbackService(IRepo<int, Feedback> repo)
        {
            _repo = repo;
        }

        public async Task<Feedback> AddFeedback(Feedback item)
        { 
            try
            {
                var feedback = await _repo.Add(item);
                if (feedback != null)
                {
                    return feedback;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Feedback> DeleteFeedback(int id)
        {
            try
            {
                var feedback = await _repo.Delete(id);
                if (feedback != null)
                {
                    return feedback;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<ICollection<Feedback>?> GetAllFeedback()
        {
            try
            {
                var feedback = await _repo.GetAll();
                if (feedback != null)
                {
                    return feedback;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Feedback> GetFeedback(int id)
        {
            try
            {
                var feedback = await _repo.Get(id);
                if (feedback != null)
                {
                    return feedback;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public Task<Feedback> UpdateFeedback(Feedback feedback)
        {
            throw new NotImplementedException();
        }
    }
}
