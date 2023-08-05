using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tour_packages.Interfaces;
using Tour_packages.Models;

namespace Tour_packages.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactDetailsController : ControllerBase
    {
        private readonly IRepo<int, ContactDetails> _contactDetailsRepo;

        public ContactDetailsController(IRepo<int, ContactDetails> contactDetailsRepo)
        {
            _contactDetailsRepo = contactDetailsRepo;

        }
        [HttpPost("createContact")]
        public async Task<ActionResult<ContactDetails>> AddContactDetails(ContactDetails contactDetails)
        {
            var result = await _contactDetailsRepo.Add(contactDetails);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Failed to add contact details.");
        }

        [HttpPut("updateItinerary")]
        public async Task<ActionResult<ContactDetails>> UpdateContactDetails(int id, ContactDetails contactDetails)
        {
            if (id != contactDetails.ContactId)
            {
                return BadRequest("ContactDetails ID mismatch.");
            }

            var result = await _contactDetailsRepo.Update(contactDetails);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("ContactDetails not found.");
        }

        [HttpDelete("deleteItinerary")]
        public async Task<ActionResult<ContactDetails>> DeleteContactDetails(int id)
        {
            var result = await _contactDetailsRepo.Delete(id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("ContactDetails not found.");
        }

        [HttpGet("getItineraryById")]
        public async Task<ActionResult<ContactDetails>> GetContactDetails(int id)
        {
            var result = await _contactDetailsRepo.Get(id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("ContactDetails not found.");
        }

        [HttpGet("getAllItinerary")]
        public async Task<ActionResult<IEnumerable<ContactDetails>>> GetAllContactDetails()
        {
            var result = await _contactDetailsRepo.GetAll();
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("No contact details found.");
        }

    }
}
