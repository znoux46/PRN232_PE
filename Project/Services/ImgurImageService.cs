using System.Text.Json;

namespace Project.Services
{
    public class ImgurImageService : IImageUploadService
    {
        private readonly HttpClient _httpClient;
        private readonly string _clientId;
        private readonly ILogger<ImgurImageService> _logger;

        public ImgurImageService(
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration,
            ILogger<ImgurImageService> logger)
        {
            _httpClient = httpClientFactory.CreateClient();
            _clientId = configuration["Imgur:ClientId"] ?? throw new InvalidOperationException("Imgur:ClientId is not configured");
            _logger = logger;

            _httpClient.BaseAddress = new Uri("https://api.imgur.com/3/");
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Client-ID {_clientId}");
        }

        public async Task<string> UploadImageAsync(Stream imageStream, string fileName, CancellationToken cancellationToken = default)
        {
            try
            {
                // Convert stream to base64
                byte[] imageBytes;
                using (var memoryStream = new MemoryStream())
                {
                    await imageStream.CopyToAsync(memoryStream, cancellationToken);
                    imageBytes = memoryStream.ToArray();
                }

                var base64Image = Convert.ToBase64String(imageBytes);

                // Imgur API accepts form data with image as base64
                using var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("image", base64Image),
                    new KeyValuePair<string, string>("type", "base64")
                });

                var response = await _httpClient.PostAsync("image", content, cancellationToken);
                var responseContent = await response.Content.ReadAsStringAsync(cancellationToken);
                
                _logger.LogInformation("Imgur API Response Status: {Status}, Content: {Content}", 
                    response.StatusCode, responseContent);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("Imgur API Error: Status {Status}, Response: {Response}", 
                        response.StatusCode, responseContent);
                    throw new HttpRequestException($"Imgur API returned {response.StatusCode}: {responseContent}");
                }

                var jsonDoc = JsonDocument.Parse(responseContent);
                
                if (jsonDoc.RootElement.TryGetProperty("data", out var data) &&
                    data.TryGetProperty("link", out var link))
                {
                    var imageUrl = link.GetString();
                    _logger.LogInformation("Image uploaded successfully to Imgur: {ImageUrl}", imageUrl);
                    return imageUrl ?? throw new Exception("Failed to get image URL from Imgur response");
                }

                // Check for errors
                if (jsonDoc.RootElement.TryGetProperty("data", out var errorData) &&
                    errorData.TryGetProperty("error", out var error))
                {
                    var errorMessage = error.GetString();
                    throw new Exception($"Imgur API Error: {errorMessage}");
                }

                throw new Exception("Invalid response from Imgur API");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading image to Imgur: {Message}", ex.Message);
                throw;
            }
        }

        public async Task<bool> DeleteImageAsync(string imageId, CancellationToken cancellationToken = default)
        {
            try
            {
                // Extract image hash from URL if full URL is provided
                // Imgur URLs format: https://i.imgur.com/{hash}.{ext}
                if (imageId.Contains("imgur.com/"))
                {
                    var parts = imageId.Split('/');
                    imageId = parts[^1].Split('.')[0]; // Get the hash part before extension
                }

                var response = await _httpClient.DeleteAsync($"image/{imageId}", cancellationToken);
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting image from Imgur: {Message}", ex.Message);
                return false;
            }
        }
    }
}

