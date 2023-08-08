using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tour_Feedback.Interfaces;
using Tour_Feedback.Models;

namespace Tour_Feedback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackservice;

        public FeedBackController(IFeedbackService feedbackservice)
        {
            _feedbackservice = feedbackservice;
        }

        [HttpPost("CreateFeedback")]
        [ProducesResponseType(typeof(Feedback), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Feedback?>> AddFeedbacks(Feedback review)
        {
            try
            {
                var feedback = await _feedbackservice.AddFeedback(review);
                if (feedback != null)
                {
                    return Created("Added!", feedback);
                }
                return BadRequest("Unable to add");
            }
            catch (Exception)
            {
                return BadRequest("Backend error");
            }
        }
        [HttpGet("GetAllFeedback")]
        [ProducesResponseType(typeof(List<Feedback>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<ICollection<Feedback>>> GetAllFeedbacks()
        {
            try
            {
                var feedback = await _feedbackservice.GetAllFeedback();
                if (feedback != null)
                {
                    return Ok(feedback);
                }
                return BadRequest("No reviews available");
            }
            catch (Exception)
            {
                return BadRequest("Database error");
            }
        }

        [HttpGet("GetFeedbackById")]
        [ProducesResponseType(typeof(Feedback), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<Feedback>> GetFeedbacks(int id)
        {
            try
            {
                var feedback = await _feedbackservice.GetFeedback(id);
                if (feedback != null)
                {
                    return Ok(feedback);
                }
                return BadRequest("No agent found");
            }
            catch (Exception)
            {
                return BadRequest("Database error");
            }
        }
    }
}
