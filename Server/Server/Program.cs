using Microsoft.Net.Http.Headers;
using Server.Business.Model;
using Server.Business.services;
using Server.Domain.services;

var builder = WebApplication.CreateBuilder(args);
var frontendOrigins = "_reactOrigin";

// Add services to the container.
builder.Services.AddCors(options => options.AddPolicy(name: frontendOrigins, policyBuilder =>

    policyBuilder.WithOrigins("http://localhost:3002").AllowAnyHeader()
));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddDbContext<ServerContext>();
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(frontendOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();