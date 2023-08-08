using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Tour_Booking.Models;
using System;
using System.Collections.Generic;
using Tour_Booking.Interfaces;

namespace Tour_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageBookingController : ControllerBase
    {
        private readonly IManageBooking _manageBookingService;
        private readonly ILogger<ManageBookingController> _logger;

        public ManageBookingController(IManageBooking manageBookingService, ILogger<ManageBookingController> logger)
        {
            _manageBookingService = manageBookingService;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Booking))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult CalculateTotal([FromBody] Booking booking)
        {
            try
            {
                double totalAmount = _manageBookingService.CalculateTotalAmount(booking.Amount, booking.AddTravelerCount);

                return Ok(new { TotalAmount = totalAmount });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while calculating total amount.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error.");
            }
        }
    }
}
