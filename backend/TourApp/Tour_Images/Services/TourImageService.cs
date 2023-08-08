using Tour_Images.Interfaces;
using Tour_Images.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using System;

namespace Tour_Images.Services
{
    public class TourImageService : ITourImageService
    {
        private readonly IRepo<int, TourImage> _tourImageRepo;  

        public TourImageService(IRepo<int, TourImage> tourImageRepo)
        {
            _tourImageRepo = tourImageRepo;
        }

        public async Task<TourImage> AddTourImage(int packageId, IFormFile image, string name)  
        {
            // Connect to Azurite Blob Storage
            string connectionString = "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:8888/devstoreaccount1;"; 
            BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);

            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient("samples-workitems");

            // Create the container if it doesn't exist
            containerClient.CreateIfNotExists();

            // Generate a unique blob name
            string uniqueBlobName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(image.FileName);

            // Upload the image to Azure Blob Storage
            BlobClient blobClient = containerClient.GetBlobClient(uniqueBlobName);
            using (var stream = image.OpenReadStream())
            {
                await blobClient.UploadAsync(stream, true);
            }

            // Add the current image information to the database
            TourImage tourImage = new TourImage
            {
                Name = name,
                ImagePath = blobClient.Uri.ToString(),
                PackageId = packageId
            };

            return await _tourImageRepo.Add(tourImage);
        }

        public async Task<ICollection<TourImage>> GetAllTourImage()
        {
            return await _tourImageRepo.GetAll();
        }
        public async Task<TourImage> GetTourImage(int packageId)
        {
            TourImage tourImage = await _tourImageRepo.Get(packageId);

            // Return the retrieved tour image
            return tourImage;
        }

    }
}
