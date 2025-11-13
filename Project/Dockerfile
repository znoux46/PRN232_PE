# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj file and restore dependencies
COPY ["Project.csproj", "./"]
RUN dotnet restore "Project.csproj"

# Copy everything else and build
COPY . .
RUN dotnet publish "Project.csproj" -c Release -o /app/publish

# Use the official .NET runtime image for running
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Project.dll"]

