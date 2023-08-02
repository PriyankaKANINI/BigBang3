using TourUsers.Models.DTOs;

namespace TourUsers.Interfaces
{
    public interface ITokenGenerate
    {
        public string TokenGenerate(UserDTO user);
    }
}
