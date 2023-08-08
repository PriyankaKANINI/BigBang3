using Tour_packages.Models;

namespace Tour_packages.Interfaces
{
    public interface IItineraryService
    {
        public Task<Itinerary?> AddItinerary(Itinerary itinerary);
        public Task<Itinerary?> DeleteItinerary(int id);
        public Task<Itinerary?> UpdateItinerary(Itinerary itinerary);
        public Task<Itinerary?> GetItineraryById(int id);
        public Task<ICollection<Itinerary>?> GetAllItineraries();
    }
}
