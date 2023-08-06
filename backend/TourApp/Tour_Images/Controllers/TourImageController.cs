using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tour_Images.Models;
using Tour_Images.Interfaces;

namespace Tour_Images.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourImageController : ControllerBase
    {
        private readonly ITourImageService _tourImageService;

        public TourImageController(ITourImageService tourImageService)
        {
            _tourImageService = tourImageService;
        }

        [HttpGet("GettingImages")]
        public async Task<ActionResult<IEnumerable<TourImage>>> GetTourImages()
        {
            var tourImages = await _tourImageService.GetAllTourImage();
            return Ok(tourImages);
        }

        [HttpPost("PostingImages")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadImages(int packageId, [FromForm] TourImage model)
        {
            if (model.Image != null && model.Image.Count > 0)
            {
                foreach (var image in model.Image)
                {
                    if (image != null)
                    {
                        // Assuming the business logic for uploading and adding the image to the database is handled in the TourImageService.
                        // Pass the packageId and image model to the TourImageService to perform the necessary operations.
                        await _tourImageService.AddTourImage(packageId, image, model.Name);
                    }
                }
            }

            return Ok();
        }
    }
}
