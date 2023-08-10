using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Tour_Feedback.Controllers;
using Tour_Feedback.Interfaces;
using Tour_Feedback.Models;
using Tour_Feedback.Services;
using Xunit;

namespace Tour_Feedback.Tests
{
    public class FeedbackRepoTests
    {

        [Fact]
        public async Task GetAllFeedbacks_ValidInput_ReturnsOkResponseWithFeedbackList()
        {
            var serviceMock = new Mock<IFeedbackService>();
            serviceMock.Setup(service => service.GetAllFeedback()).ReturnsAsync(new List<Feedback>());

            var controller = new FeedBackController(serviceMock.Object);
            var result = await controller.GetAllFeedbacks();

            Assert.IsType<OkObjectResult>(result.Result);
        }


        [Fact]
        public async Task AddFeedbacks_ServiceReturnsNull_ReturnsBadRequestResponse()
        {
            var serviceMock = new Mock<IFeedbackService>();
            serviceMock.Setup(service => service.AddFeedback(It.IsAny<Feedback>())).ReturnsAsync((Feedback)null);

            var controller = new FeedBackController(serviceMock.Object);
            var result = await controller.AddFeedbacks(new Feedback());

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

    }
}
