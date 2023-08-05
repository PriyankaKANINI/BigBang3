using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tour_packages.Interfaces;
using Tour_packages.Models;

namespace Tour_packages.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItineraryController : ControllerBase
    {
        private readonly IRepo<int, Itinerary> _itineraryRepo;

        public ItineraryController(IRepo<int, Itinerary> itineraryRepo)
        {
            _itineraryRepo = itineraryRepo;
        }
        [HttpPost("createItinerary")]
        public async Task<ActionResult<Itinerary>> AddItinerary(Itinerary itinerary)
        {
            var addedItinerary = await _itineraryRepo.Add(itinerary);
            if (addedItinerary != null)
            {
                return Ok(addedItinerary);
            }
            return BadRequest("Failed to add itinerary.");
        }
        [HttpPut("updateItinerary")]
        public async Task<ActionResult<Itinerary>> UpdateItinerary(int id, Itinerary itinerary)
        {
            if (id != itinerary.ItineraryId)
            {
                return BadRequest("Itinerary ID mismatch.");
            }

            var updatedItinerary = await _itineraryRepo.Update(itinerary);
            if (updatedItinerary != null)
            {
                return Ok(updatedItinerary);
            }
            return NotFound("Itinerary not found.");
        }
        [HttpDelete("deleteItinerary")]
        public async Task<ActionResult<Itinerary>> DeleteItinerary(int id)
        {
            var deletedItinerary = await _itineraryRepo.Delete(id);
            if (deletedItinerary != null)
            {
                return Ok(deletedItinerary);
            }
            return NotFound("Itinerary not found.");
        }

        [HttpGet("getItineraryById")]
        public async Task<ActionResult<Itinerary>> GetItinerary(int id)
        {
            var itinerary = await _itineraryRepo.Get(id);
            if (itinerary != null)
            {
                return Ok(itinerary);
            }
            return NotFound("Itinerary not found.");
        }

        [HttpGet("getAllItinerary")]
        public async Task<ActionResult<IEnumerable<Itinerary>>> GetAllItineraries()
        {
            var itineraries = await _itineraryRepo.GetAll();
            if (itineraries != null && itineraries.Count > 0)
            {
                return Ok(itineraries);
            }
            return NotFound("No itineraries found.");
        }
    }
}
