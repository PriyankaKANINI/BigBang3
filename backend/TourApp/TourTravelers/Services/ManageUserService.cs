using System.Numerics;
using System.Security.Cryptography;
using System.Text;
using Tour_LoginRegister.Interfaces;
using TourUsers.Interfaces;
using TourUsers.Models;
using TourUsers.Models.DTOs;
using TourUsers.Services;

namespace Tour_LoginRegister.Services
{
    public class ManageUserService : IManageUser
    {
        private readonly IRepo<string, User> _userRepo;
        private readonly IRepo<int, Agent> _agentRepo;
        private readonly IRepo<int, Traveler> _travelerRepo;
        private readonly ITokenGenerate _tokenService;
        public ManageUserService(IRepo<string, User> userRepo, IRepo<int, Agent> agentRepo, IRepo<int, Traveler> travelerRepo,
            ITokenGenerate tokenService)
        {
            _userRepo = userRepo;
            _agentRepo = agentRepo;
            _travelerRepo = travelerRepo;
            _tokenService = tokenService;
        }

        public async Task<UserDTO> AgentRegister(AgentDTO agent)
        {
            UserDTO user = null;
            var hmac = new HMACSHA512();

            agent.User = new User(); 

            agent.User.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(agent.PasswordClear));
            agent.User.PasswordKey = hmac.Key;
            agent.User.UserEmail = agent.Email;
            agent.User.UserRole = "Admin";
            agent.IsVerified = "Not Approved";

            var userResult = await _userRepo.Add(agent.User);
            var travelAgentResult = await _agentRepo.Add(agent);

            if (userResult != null && travelAgentResult != null)
            {
                user = new UserDTO();
                user.UserID = travelAgentResult.AgentID;
                user.UserEmail = travelAgentResult.Email;
                user.UserID = userResult.UserID;
                user.UserEmail = userResult.UserEmail;
                user.UserRole = userResult.UserRole;
                user.Token = _tokenService.TokenGenerate(user);
            }

            return user;
        }

        public async Task<UserDTO> Login(UserDTO user)
        {
            string? userEmail = user.UserEmail;
            var userData = await _userRepo.Get(user.UserEmail);

            if (userData != null)
            {
                user = new UserDTO();
                user.UserID = userData.UserID;
                user.UserEmail = userData.UserEmail;
                user.UserRole = userData.UserRole;
                user.Token = _tokenService.TokenGenerate(user);
            }
            return user;
        }

        public async Task<UserDTO> TravelerRegister(TravelerDTO traveler)
        {
            UserDTO user = null;
            var hmac = new HMACSHA512();

            traveler.User = new User(); 

            traveler.User.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(traveler.PasswordClear));
            traveler.User.PasswordKey = hmac.Key;
            traveler.User.UserEmail = traveler.Email;
            traveler.User.UserRole = "Traveler";

            var userResult = await _userRepo.Add(traveler.User);
            var travelAgentResult = await _travelerRepo.Add(traveler);

            if (userResult != null && travelAgentResult != null)
            {
                user = new UserDTO();
                user.UserID = travelAgentResult.TravelerID;
                user.UserEmail = travelAgentResult.Email;
                user.UserID = userResult.UserID;
                user.UserEmail = userResult.UserEmail;
                user.UserRole = userResult.UserRole;
                user.Token = _tokenService.TokenGenerate(user);
            }

            return user;
        }
    }
}
