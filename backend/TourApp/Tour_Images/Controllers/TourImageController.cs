using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs;
using Microsoft.EntityFrameworkCore;
using Tour_Images.Models;

namespace Tour_Images.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourImageController : ControllerBase
    {
        private readonly TourImageContext _context;

        public TourImageController(TourImageContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TourImage>>> GetTourImages()
        {
            return await _context.TourImages.ToListAsync();
        }

        [HttpPost]
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
                        // Connect to Azurite Blob Storage
                        string connectionString = "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:8888/devstoreaccount1;";
                        BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);

                        BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient("samples-workitems");

                        // Create the container if it doesn't exist
                        containerClient.CreateIfNotExists();

                        // Generate a unique blob name
                        string uniqueBlobName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

                        // Upload the image to Azure Blob Storage
                        BlobClient blobClient = containerClient.GetBlobClient(uniqueBlobName);
                        using (var stream = image.OpenReadStream())
                        {
                            await blobClient.UploadAsync(stream, true);
                        }

                        // Add the current image information to the database
                        TourImage tourImage = new TourImage
                        {
                            Name = model.Name, // assuming you want to copy the name for each image
                            ImagePath = blobClient.Uri.ToString(),
                            PackageId = packageId // set the PackageId based on the provided value
                        };

                        _context.TourImages.Add(tourImage);
                        await _context.SaveChangesAsync();
                    }
                }
            }

            return Ok();
        }

    }
}
