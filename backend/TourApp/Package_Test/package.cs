using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Tour_packages.Controllers;
using Tour_packages.Interfaces;
using Tour_packages.Models;
using Tour_packages.Services;
using Xunit;

namespace Tour_packages.Tests
{
    public class ContactDetailsRepoTests
    {
        private readonly DbContextOptions<TourPackageContext> _options;
        private readonly Mock<ILogger<ContactDetails>> _loggerMock;

        public ContactDetailsRepoTests()
        {
            _options = new DbContextOptionsBuilder<TourPackageContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            _loggerMock = new Mock<ILogger<ContactDetails>>();
        }

        [Fact]
        public async Task Add_ValidContactDetails_ReturnsAddedItem()
        {
            using (var context = new TourPackageContext(_options))
            {
                var repo = new ContactDetailsRepo(context, _loggerMock.Object);
                var contact = new ContactDetails { /* Initialize contact properties */ };

                var addedContact = await repo.Add(contact);

                Assert.NotNull(addedContact);
            }
        }

        [Fact]
        public async Task AddContactDetails_ValidInput_ReturnsAddedDetails()
        {
            var repoMock = new Mock<IRepo<int, ContactDetails>>();
            var contactDetails = new ContactDetails { /* Initialize contact details properties */ };
            repoMock.Setup(repo => repo.Add(contactDetails)).ReturnsAsync(contactDetails);

            var service = new ContactDetailsService(repoMock.Object);
            var addedDetails = await service.AddContactDetails(contactDetails);

            Assert.NotNull(addedDetails);
        }

        [Fact]
        public async Task DeleteContactDetails_ExistingId_ReturnsDeletedDetails()
        {
            var repoMock = new Mock<IRepo<int, ContactDetails>>();
            var contactDetails = new ContactDetails { /* Initialize contact details properties */ };
            var id = 1;
            repoMock.Setup(repo => repo.Get(id)).ReturnsAsync(contactDetails);
            repoMock.Setup(repo => repo.Delete(id)).ReturnsAsync(contactDetails);

            var service = new ContactDetailsService(repoMock.Object);
            var deletedDetails = await service.DeleteContactDetails(id);

            Assert.NotNull(deletedDetails);
        }


        [Fact]
        public async Task AddContactDetails_ExceptionOccurs_ReturnsNull()
        {
            var repoMock = new Mock<IRepo<int, ContactDetails>>();
            repoMock.Setup(repo => repo.Add(It.IsAny<ContactDetails>())).ThrowsAsync(new Exception("Some error"));

            var service = new ContactDetailsService(repoMock.Object);
            var addedDetails = await service.AddContactDetails(new ContactDetails());

            Assert.Null(addedDetails);
        }

        [Fact]
        public async Task DeleteContactDetails_NonExistingId_ReturnsNull()
        {
            var repoMock = new Mock<IRepo<int, ContactDetails>>();
            var id = 1;
            repoMock.Setup(repo => repo.Get(id)).ReturnsAsync((ContactDetails)null);

            var service = new ContactDetailsService(repoMock.Object);
            var deletedDetails = await service.DeleteContactDetails(id);

            Assert.Null(deletedDetails);
        }

        [Fact]
        public async Task Delete_NonExistingItinerary_ReturnsNullAndLogsError()
        {
            var options = new DbContextOptionsBuilder<TourPackageContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            using (var context = new TourPackageContext(options))
            {
                var repo = new ItineraryRepo(context, Mock.Of<ILogger<Itinerary>>());

                var deletedItinerary = await repo.Delete(1);

                Assert.Null(deletedItinerary);
            }
        }
        [Fact]
        public async Task AddItinerary_ValidInput_ReturnsAddedItinerary()
        {
            var repoMock = new Mock<IRepo<int, Itinerary>>();
            var itinerary = new Itinerary { /* Initialize itinerary properties */ };
            repoMock.Setup(repo => repo.Add(itinerary)).ReturnsAsync(itinerary);

            var service = new ItineraryService(repoMock.Object);
            var addedItinerary = await service.AddItinerary(itinerary);

            Assert.NotNull(addedItinerary);
        }

        [Fact]
        public async Task DeleteItinerary_ExistingId_ReturnsDeletedItinerary()
        {
            var repoMock = new Mock<IRepo<int, Itinerary>>();
            var itinerary = new Itinerary { /* Initialize itinerary properties */ };
            var id = 1;
            repoMock.Setup(repo => repo.Get(id)).ReturnsAsync(itinerary);
            repoMock.Setup(repo => repo.Delete(id)).ReturnsAsync(itinerary);

            var service = new ItineraryService(repoMock.Object);
            var deletedItinerary = await service.DeleteItinerary(id);

            Assert.NotNull(deletedItinerary);
        }

        [Fact]
        public async Task AddItinerary_ExceptionOccurs_ReturnsNull()
        {
            var repoMock = new Mock<IRepo<int, Itinerary>>();
            repoMock.Setup(repo => repo.Add(It.IsAny<Itinerary>())).ThrowsAsync(new Exception("Some error"));

            var service = new ItineraryService(repoMock.Object);
            var addedItinerary = await service.AddItinerary(new Itinerary());

            Assert.Null(addedItinerary);
        }

        [Fact]
        public async Task DeleteItinerary_NonExistingId_ReturnsNull()
        {
            var repoMock = new Mock<IRepo<int, Itinerary>>();
            var id = 1;
            repoMock.Setup(repo => repo.Get(id)).ReturnsAsync((Itinerary)null);

            var service = new ItineraryService(repoMock.Object);
            var deletedItinerary = await service.DeleteItinerary(id);

            Assert.Null(deletedItinerary);
        }

        [Fact]
        public async Task Delete_NonExistingPackage_ReturnsNull()
        {
            var options = new DbContextOptionsBuilder<TourPackageContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            using (var context = new TourPackageContext(options))
            {
                var repo = new PackageRepo(context, Mock.Of<ILogger<Package>>());

                var deletedPackage = await repo.Delete(1);

                Assert.Null(deletedPackage);
            }
        }
        [Fact]
        public async Task AddPackage_ValidInput_ReturnsAddedPackage()
        {
            var repoMock = new Mock<IRepo<int, Package>>();
            var package = new Package { /* Initialize package properties */ };
            repoMock.Setup(repo => repo.Add(package)).ReturnsAsync(package);

            var service = new PackageService(repoMock.Object);
            var addedPackage = await service.AddPackage(package);

            Assert.NotNull(addedPackage);
        }

        [Fact]
        public async Task DeletePackage_ExistingId_ReturnsDeletedPackage()
        {
            var repoMock = new Mock<IRepo<int, Package>>();
            var package = new Package { /* Initialize package properties */ };
            var id = 1;
            repoMock.Setup(repo => repo.Get(id)).ReturnsAsync(package);
            repoMock.Setup(repo => repo.Delete(id)).ReturnsAsync(package);

            var service = new PackageService(repoMock.Object);
            var deletedPackage = await service.DeletePackage(id);

            Assert.NotNull(deletedPackage);
        }


        [Fact]
        public async Task AddPackage_ExceptionOccurs_ReturnsNull()
        {
            var repoMock = new Mock<IRepo<int, Package>>();
            repoMock.Setup(repo => repo.Add(It.IsAny<Package>())).ThrowsAsync(new Exception("Some error"));

            var service = new PackageService(repoMock.Object);
            var addedPackage = await service.AddPackage(new Package());

            Assert.Null(addedPackage);
        }

        [Fact]
        public async Task DeletePackage_NonExistingId_ReturnsNull()
        {
            var repoMock = new Mock<IRepo<int, Package>>();
            var id = 1;
            repoMock.Setup(repo => repo.Get(id)).ReturnsAsync((Package)null);

            var service = new PackageService(repoMock.Object);
            var deletedPackage = await service.DeletePackage(id);

            Assert.Null(deletedPackage);
        }

        [Fact]
        public async Task AddContactDetails_ValidInput_ReturnsOkResult()
        {
            var serviceMock = new Mock<IContactService>();
            serviceMock.Setup(service => service.AddContactDetails(It.IsAny<ContactDetails>())).ReturnsAsync(new ContactDetails());

            var controller = new ContactDetailsController(serviceMock.Object);
            var result = await controller.AddContactDetails(new ContactDetails());

            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateContactDetails_ValidInput_ReturnsOkResult()
        {
            var serviceMock = new Mock<IContactService>();
            serviceMock.Setup(service => service.UpdateContactDetails(It.IsAny<ContactDetails>())).ReturnsAsync(new ContactDetails());

            var controller = new ContactDetailsController(serviceMock.Object);
            var result = await controller.UpdateContactDetails(1, new ContactDetails { ContactId = 1 });

            Assert.IsType<OkObjectResult>(result.Result);
        }


        [Fact]
        public async Task AddContactDetails_ServiceReturnsNull_ReturnsBadRequest()
        {
            var serviceMock = new Mock<IContactService>();
            serviceMock.Setup(service => service.AddContactDetails(It.IsAny<ContactDetails>())).ReturnsAsync((ContactDetails)null);

            var controller = new ContactDetailsController(serviceMock.Object);
            var result = await controller.AddContactDetails(new ContactDetails());

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetContactDetails_ServiceReturnsNull_ReturnsNotFound()
        {
            var serviceMock = new Mock<IContactService>();
            serviceMock.Setup(service => service.GetContactDetailsById(It.IsAny<int>())).ReturnsAsync((ContactDetails)null);

            var controller = new ContactDetailsController(serviceMock.Object);
            var result = await controller.GetContactDetails(1);

            Assert.IsType<NotFoundObjectResult>(result.Result);
        }
        [Fact]
        public async Task AddTourPackage_ValidInput_ReturnsOkResult()
        {
            var serviceMock = new Mock<IPackageService>();
            serviceMock.Setup(service => service.AddPackage(It.IsAny<Package>())).ReturnsAsync(new Package());

            var controller = new PackageController(serviceMock.Object);
            var result = await controller.AddTourPackage(new Package());

            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateTourPackage_ValidInput_ReturnsOkResult()
        {
            var serviceMock = new Mock<IPackageService>();
            serviceMock.Setup(service => service.UpdatePackage(It.IsAny<Package>())).ReturnsAsync(new Package());

            var controller = new PackageController(serviceMock.Object);
            var result = await controller.UpdateTourPackage(1, new Package { PackageId = 1 });

            Assert.IsType<OkObjectResult>(result.Result);
        }


        [Fact]
        public async Task AddTourPackage_ServiceReturnsNull_ReturnsBadRequest()
        {
            var serviceMock = new Mock<IPackageService>();
            serviceMock.Setup(service => service.AddPackage(It.IsAny<Package>())).ReturnsAsync((Package)null);

            var controller = new PackageController(serviceMock.Object);
            var result = await controller.AddTourPackage(new Package());

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetTourPackage_ServiceReturnsNull_ReturnsNotFound()
        {
            var serviceMock = new Mock<IPackageService>();
            serviceMock.Setup(service => service.GetPackageById(It.IsAny<int>())).ReturnsAsync((Package)null);

            var controller = new PackageController(serviceMock.Object);
            var result = await controller.GetTourPackage(1);

            Assert.IsType<NotFoundObjectResult>(result.Result);
        }
    }
}

