using Tour_LoginRegister.Models.DTOs;

namespace Tour_LoginRegister.Interfaces
{
    public interface ITokenGenerate
    {
        public string TokenGenerate(UserDTO user);
    }
}
