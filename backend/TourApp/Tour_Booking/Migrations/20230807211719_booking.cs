﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tour_Booking.Migrations
{
    public partial class booking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PackageId = table.Column<int>(type: "int", nullable: false),
                    AddTravelerCount = table.Column<int>(type: "int", nullable: true),
                    AgentID = table.Column<int>(type: "int", nullable: false),
                    BookingName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BookingMail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TravelerID = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    TotalAmount = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.BookingId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");
        }
    }
}
