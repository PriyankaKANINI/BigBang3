namespace Tour_LoginRegister.Models.DTOs
{
    public class UserDTO
    {
        public int UserID { get; set; }
        public string? UserEmail { get; set; }
        public string? UserRole { get; set; }
        public string? Token { get; set; }
        public string? PasswordClear {get;set;}
    }
}
