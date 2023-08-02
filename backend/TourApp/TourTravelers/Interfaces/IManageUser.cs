﻿using System.Numerics;
using TourUsers.Models;
using TourUsers.Models.DTOs;

namespace Tour_LoginRegister.Interfaces
{
    public interface IManageUser
    {
        public Task<UserDTO> Login(UserDTO user);
        public Task<UserDTO> AgentRegister(AgentDTO agent);
        public Task<UserDTO> TravelerRegister(TravelerDTO traveler);
    }
}
