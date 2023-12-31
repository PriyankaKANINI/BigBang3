﻿using Tour_Feedback.Models;

namespace Tour_Feedback.Interfaces
{
    public interface IFeedbackService
    {
        public Task<Feedback?> AddFeedback(Feedback item);
        public Task<Feedback?> GetFeedback(int id);
        public Task<ICollection<Feedback>?> GetAllFeedback();
    }
}
