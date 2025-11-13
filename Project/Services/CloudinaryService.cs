using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.Security.Cryptography;
using System.Text;

namespace Project.Services
{
    public class CloudinaryService : IImageUploadService
    {
        private readonly CloudinaryDotNet.Cloudinary _cloudinary;
        private readonly ILogger<CloudinaryService> _logger;

        public CloudinaryService(
            IConfiguration configuration,
            ILogger<CloudinaryService> logger)
        {
            _logger = logger;

            var cloudName = configuration["Cloudinary:CloudName"] 
                ?? throw new InvalidOperationException("Cloudinary:CloudName is not configured");
            var apiKey = configuration["Cloudinary:ApiKey"] 
                ?? throw new InvalidOperationException("Cloudinary:ApiKey is not configured");
            var apiSecret = configuration["Cloudinary:ApiSecret"] 
                ?? throw new InvalidOperationException("Cloudinary:ApiSecret is not configured");

            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new CloudinaryDotNet.Cloudinary(account);
        }

        public async Task<string> UploadImageAsync(Stream imageStream, string fileName, CancellationToken cancellationToken = default)
        {
            try
            {
                // Generate unique file name
                var extension = Path.GetExtension(fileName).ToLowerInvariant();
                var publicId = Guid.NewGuid().ToString();

                // Read stream to byte array
                byte[] imageBytes;
                using (var memoryStream = new MemoryStream())
                {
                    await imageStream.CopyToAsync(memoryStream, cancellationToken);
                    imageBytes = memoryStream.ToArray();
                }

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(fileName, new MemoryStream(imageBytes)),
                    PublicId = publicId,
                    Folder = "posts", // Optional: organize images in folders
                    Overwrite = false
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var imageUrl = uploadResult.SecureUrl?.ToString() ?? uploadResult.Url?.ToString();
                    _logger.LogInformation("Image uploaded successfully to Cloudinary: {ImageUrl}", imageUrl);
                    return imageUrl ?? throw new Exception("Failed to get image URL from Cloudinary response");
                }

                throw new Exception($"Failed to upload image. Status: {uploadResult.StatusCode}, Error: {uploadResult.Error?.Message}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading image to Cloudinary: {Message}", ex.Message);
                throw;
            }
        }

        public async Task<bool> DeleteImageAsync(string imageId, CancellationToken cancellationToken = default)
        {
            try
            {
                // Extract public ID from URL if full URL is provided
                // Cloudinary URLs format: https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.{ext}
                string publicId;
                if (imageId.Contains("cloudinary.com"))
                {
                    var parts = imageId.Split('/');
                    var uploadIndex = Array.IndexOf(parts, "upload");
                    if (uploadIndex >= 0 && uploadIndex < parts.Length - 1)
                    {
                        var fileName = parts[uploadIndex + 1];
                        publicId = Path.GetFileNameWithoutExtension(fileName);
                        // Check if there's a folder
                        if (uploadIndex > 0 && parts[uploadIndex - 1] != "image" && parts[uploadIndex - 1] != "video")
                        {
                            publicId = $"{parts[uploadIndex - 1]}/{publicId}";
                        }
                    }
                    else
                    {
                        throw new Exception("Invalid Cloudinary URL format");
                    }
                }
                else
                {
                    publicId = imageId;
                }

                var deleteParams = new DeletionParams(publicId)
                {
                    ResourceType = ResourceType.Image
                };

                var result = await _cloudinary.DestroyAsync(deleteParams);
                return result.StatusCode == System.Net.HttpStatusCode.OK && result.Result == "ok";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting image from Cloudinary: {Message}", ex.Message);
                return false;
            }
        }
    }
}

