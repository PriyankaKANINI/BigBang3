using System.Numerics;
using Tour_LoginRegister.Models;
using Tour_LoginRegister.Models.DTOs;

namespace Tour_LoginRegister.Interfaces
{
    public interface IManageUser
    {
        public Task<UserDTO> Login(UserDTO user);
        public Task<UserDTO> AgentRegister(AgentDTO agent);
        public Task<UserDTO> TravelerRegister(TravelerDTO traveler);
        public Task<AgentDTO> ApprovedAgent(AgentDTO user);
        public Task<AgentDTO> DisapproveAgent(AgentDTO user);
        public Task<ICollection<Agent>> GetAllAgents();
    }
}
