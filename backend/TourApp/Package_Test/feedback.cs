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
        public async Task Delete_NonExistingId_ReturnsNull()
        {
            var options = new DbContextOptionsBuilder<FeedbackContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            using (var context = new FeedbackContext(options))
            {
                var repo = new FeedbackRepo(context);

                var deletedFeedback = await repo.Delete(1);

                Assert.Null(deletedFeedback);
            }
        }
        [Fact]
        public async Task AddFeedback_ValidInput_ReturnsAddedFeedback()
        {
            var repoMock = new Mock<IRepo<int, Feedback>>();
            repoMock.Setup(repo => repo.Add(It.IsAny<Feedback>())).ReturnsAsync(new Feedback());

            var service = new FeedbackService(repoMock.Object);
            var addedFeedback = await service.AddFeedback(new Feedback());

            Assert.NotNull(addedFeedback);
        }

        [Fact]
        public async Task DeleteFeedback_ValidId_ReturnsDeletedFeedback()
        {
            var repoMock = new Mock<IRepo<int, Feedback>>();
            repoMock.Setup(repo => repo.Delete(It.IsAny<int>())).ReturnsAsync(new Feedback());

            var service = new FeedbackService(repoMock.Object);
            var deletedFeedback = await service.DeleteFeedback(1);

            Assert.NotNull(deletedFeedback);
        }
      

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

        [Fact]
        public async Task DeleteFeedbacks_ServiceReturnsNull_ReturnsBadRequestResponse()
        {
            var serviceMock = new Mock<IFeedbackService>();
            serviceMock.Setup(service => service.GetFeedback(It.IsAny<int>())).ReturnsAsync((Feedback)null);

            var controller = new FeedBackController(serviceMock.Object);
            var result = await controller.DeleteFeedbacks(1);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

    }
}
