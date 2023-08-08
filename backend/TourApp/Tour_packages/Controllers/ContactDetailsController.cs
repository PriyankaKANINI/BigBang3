using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tour_packages.Interfaces;
using Tour_packages.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Tour_packages.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactDetailsController : ControllerBase
    {
        private readonly IContactService _contactDetailsService;

        public ContactDetailsController(IContactService contactDetailsService)
        {
            _contactDetailsService = contactDetailsService;
        }

        [HttpPost("createContact")]
        public async Task<ActionResult<ContactDetails>> AddContactDetails(ContactDetails contactDetails)
        {
            var result = await _contactDetailsService.AddContactDetails(contactDetails);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Failed to add contact details.");
        }

        [HttpPut("updateContact")]
        public async Task<ActionResult<ContactDetails>> UpdateContactDetails(int id, ContactDetails contactDetails)
        {
            if (id != contactDetails.ContactId)
            {
                return BadRequest("ContactDetails ID mismatch.");
            }

            var result = await _contactDetailsService.UpdateContactDetails(contactDetails);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("ContactDetails not found.");
        }

        [HttpDelete("deleteContact")]
        public async Task<ActionResult<ContactDetails>> DeleteContactDetails(int id)
        {
            var result = await _contactDetailsService.DeleteContactDetails(id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("ContactDetails not found.");
        }

        [HttpGet("getContactById")]
        public async Task<ActionResult<ContactDetails>> GetContactDetails(int id)
        {
            var result = await _contactDetailsService.GetContactDetailsById(id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("ContactDetails not found.");
        }

        [HttpGet("getAllContact")]
        public async Task<ActionResult<IEnumerable<ContactDetails>>> GetAllContactDetails()
        {
            var result = await _contactDetailsService.GetAllContactDetails();
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("No contact details found.");
        }

    }
}
