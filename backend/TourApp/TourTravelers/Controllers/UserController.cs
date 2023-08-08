using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tour_LoginRegister.Interfaces;
using Tour_LoginRegister.Models;
using Tour_LoginRegister.Models.DTOs;

namespace Tour_LoginRegister.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IManageUser _manageUser;
        private readonly IRepo<int, Traveler> _travelerRepo;
        private readonly IRepo<int, Agent> _agentRepo;

        public UserController(IManageUser manageUser, IRepo<int, Traveler> travelerRepo, IRepo<int, Agent> agentRepo)
        {
            _manageUser = manageUser;
            _agentRepo = agentRepo;
            _agentRepo = agentRepo;
        }
        [HttpPost("register", Name = "AgentRegister")]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> AgentRegister(AgentDTO agent)
        {
            try
            {
                var result = await _manageUser.AgentRegister(agent);

                if (result != null)
                    return Ok(result);

                return BadRequest("Unable to register at this moment");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred during patient registration: {ex.Message}");
            }
        }

        [HttpPost("register", Name = "TravelerRegister")]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> TravelerRegister(TravelerDTO traveler)
        {
            try
            {
                var result = await _manageUser.TravelerRegister(traveler);

                if (result != null)
                    return Ok(result);

                return BadRequest("Unable to register at this moment");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred during doctor registration: {ex.Message}");
            }
        }


        [HttpPost("Login")]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> Login(UserDTO user)
        {
            try
            {
                var result = await _manageUser.Login(user);

                if (result != null)
                    return Ok(result);

                return BadRequest("Unable to login");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred during login: {ex.Message}");
            }
        }
        [HttpPut("approve")]
        [ProducesResponseType(typeof(ActionResult<AgentDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AgentDTO>> ApproveAgent(AgentDTO agentStatus)
        {
            try
            {
                var result = await _manageUser.ApprovedAgent(agentStatus);

                if (result != null)
                    return Ok(result);

                return BadRequest("Unable to approve agent");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred during agent approval: {ex.Message}");
            }
        }

        [HttpPut("disapprove")]
        [ProducesResponseType(typeof(ActionResult<AgentDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AgentDTO>> DisapproveAgent(AgentDTO agentStatus)
        {
            try
            {
                var result = await _manageUser.DisapproveAgent(agentStatus);

                if (result != null)
                    return Ok(result);

                return BadRequest("Unable to disapprove agent");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred during agent disapproval: {ex.Message}");
            }
        }
       

        [HttpGet("allAgents")]
        [ProducesResponseType(typeof(ICollection<Agent>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ICollection<Agent>>> GetAllAgents()
        {
            try
            {
                var agents = await _manageUser.GetAllAgents();

                if (agents != null && agents.Count > 0)
                    return Ok(agents);

                return BadRequest("No agents found");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while fetching agents: {ex.Message}");
            }
        }
    }
}
