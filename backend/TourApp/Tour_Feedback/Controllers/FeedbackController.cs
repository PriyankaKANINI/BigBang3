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
        private readonly IFeedback _feedbackrepo;

        public FeedBackController(IFeedback feedbackrepo)
        {
            _feedbackrepo = feedbackrepo;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Feedback), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Feedback?>> AddFeedback(Feedback review)
        {
            try
            {
                var FB = await _feedbackrepo.AddReview(review);
                if (FB != null)
                {
                    return Created("Added!", FB);
                }
                return BadRequest("Unable to add");
            }
            catch (Exception)
            {
                return BadRequest("Backend error :(");
            }
        }
        [HttpGet("GetAll")]
        [ProducesResponseType(typeof(List<Feedback>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<ICollection<Feedback>>> GetAllReviews()
        {
            try
            {
                var reviews = await _feedbackrepo.GetAllReviews();
                if (reviews != null)
                {
                    return Ok(reviews);
                }
                return BadRequest("No reviews available :(");
            }
            catch (Exception)
            {
                return BadRequest("Database error");
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(Feedback), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<Feedback>> GetReview(int id)
        {
            try
            {
                var review = await _feedbackrepo.GetReview(id);
                if (review != null)
                {
                    return Ok(review);
                }
                return BadRequest("No agent found :(");
            }
            catch (Exception)
            {
                return BadRequest("Database error");
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(Feedback), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<Feedback>> DeleteReview(int id)
        {
            try
            {
                var review = await _feedbackrepo.DeleteReview(id);
                if (review != null)
                {
                    return Ok(review);
                }
                return BadRequest("Not deleted");
            }
            catch (Exception)
            {
                return BadRequest("Backend error");
            }
        }
    }
}
