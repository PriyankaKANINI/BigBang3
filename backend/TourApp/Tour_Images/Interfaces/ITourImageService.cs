using Tour_Images.Models; 

namespace Tour_Images.Interfaces 
{
    public interface ITourImageService 
    {
        public Task<TourImage> AddTourImage(int packageId, IFormFile image, string name); 
        public Task<ICollection<TourImage>> GetAllTourImage(); 
        public Task<TourImage> GetTourImage(int id); 
    }
}
