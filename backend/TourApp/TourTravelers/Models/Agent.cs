using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tour_LoginRegister.Models
{
    public class Agent
    {
        [Key]
        public int AgentID { get; set; }
        public string? AgentName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? IsVerified { get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyRegistrationNumber { get; set; }
        [ForeignKey("AgentID")]
        public User? User { get; set; }   
    }
}
