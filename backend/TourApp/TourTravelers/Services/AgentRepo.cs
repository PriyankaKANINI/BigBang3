using Microsoft.EntityFrameworkCore;
using Tour_LoginRegister.Interfaces;
using Tour_LoginRegister.Models;

namespace Tour_LoginRegister.Services
{
    public class AgentRepo : IRepo<int, Agent>
    {
        private readonly Context _context;
        private readonly ILogger<AgentRepo> _logger;

        public AgentRepo(Context context, ILogger<AgentRepo> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<Agent?> Add(Agent item)
        {
            try
            {
                _context.Agents.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Agent?> Delete(int key)
        {
            try
            {
                var agent = await Get(key);
                if (agent != null)
                {
                    _context.Agents.Remove(agent);
                    await _context.SaveChangesAsync();
                    return agent;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Agent?> Get(int key)
        {
            try
            {
                var doctor = await _context.Agents.FirstOrDefaultAsync(s => s.AgentID == key);
                return doctor;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Agent>?> GetAll()
        {
            try
            {
                var agentList = await _context.Agents.ToListAsync();
                if (agentList.Count > 0)
                    return agentList;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Agent?> Update(Agent item)
        {
            try
            {
                var agent = await Get(item.AgentID);
                if (agent != null)
                {
                    agent.AgentName = item.AgentName;
                    agent.CompanyRegistrationNumber = item.CompanyRegistrationNumber;
                    agent.CompanyName = item.CompanyName;
                    agent.Address = item.Address;
                    agent.PhoneNumber = item.PhoneNumber;
                    agent.Email = item.Email;
                    agent.IsVerified = item.IsVerified;
                    await _context.SaveChangesAsync();
                    return agent;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }
    }
}
