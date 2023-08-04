//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace Tour_Feedback.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class FeedBackController : ControllerBase
//    {
//        private readonly IFeedback _feedbackrepo;

//        public FeedBackController(IFeedback feedbackrepo)
//        {
//            _feedbackrepo = feedbackrepo;
//        }

//        [HttpPost]
//        [ProducesResponseType(typeof(feedback), StatusCodes.Status201Created)]//Success Response
//        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
//        public async Task<ActionResult<feedback?>> AddFeedback(feedback review)
//        {
//            try
//            {
//                var FB = await _feedbackrepo.AddReview(review);
//                if (FB != null)
//                {
//                    return Created("Added!", FB);
//                }
//                return BadRequest("Unable to add");
//            }
//            catch (Exception)
//            {
//                return BadRequest("Backend error :(");
//            }
//        }
//        [HttpGet]
//        [ProducesResponseType(typeof(List<feedback>), StatusCodes.Status200OK)]//Success Response
//        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
//        [ProducesResponseType(StatusCodes.Status400BadRequest)]

//        public async Task<ActionResult<ICollection<feedback>>> GetAllReviews()
//        {
//            try
//            {
//                var reviews = await _feedbackrepo.GetAllReviews();
//                if (reviews != null)
//                {
//                    return Ok(reviews);
//                }
//                return BadRequest("No reviews available :(");
//            }
//            catch (Exception)
//            {
//                return BadRequest("Database error");
//            }
//        }

//        [HttpGet]
//        [ProducesResponseType(typeof(feedback), StatusCodes.Status200OK)]//Success Response
//        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
//        [ProducesResponseType(StatusCodes.Status400BadRequest)]

//        public async Task<ActionResult<feedback>> GetReview(int id)
//        {
//            try
//            {
//                var review = await _feedbackrepo.GetReview(id);
//                if (review != null)
//                {
//                    return Ok(review);
//                }
//                return BadRequest("No agent found :(");
//            }
//            catch (Exception)
//            {
//                return BadRequest("Database error");
//            }
//        }

//        [HttpDelete]
//        [ProducesResponseType(typeof(feedback), StatusCodes.Status200OK)]//Success Response
//        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
//        [ProducesResponseType(StatusCodes.Status400BadRequest)]

//        public async Task<ActionResult<feedback>> DeleteReview(int id)
//        {
//            try
//            {
//                var review = await _feedbackrepo.DeleteReview(id);
//                if (review != null)
//                {
//                    return Ok(review);
//                }
//                return BadRequest("Not deleted");
//            }
//            catch (Exception)
//            {
//                return BadRequest("Backend error");
//            }
//        }
//    }
//}
