using Microsoft.AspNetCore.Mvc;
using Project.Services;

namespace Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UploadController : ControllerBase
    {
        private readonly IImageUploadService _imageUploadService;
        private readonly ILogger<UploadController> _logger;

        public UploadController(
            IImageUploadService imageUploadService,
            ILogger<UploadController> logger)
        {
            _imageUploadService = imageUploadService;
            _logger = logger;
        }

        /// <summary>
        /// Upload an image to Cloudinary
        /// </summary>
        [HttpPost("image")]
        [ProducesResponseType(typeof(UploadImageResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UploadImageResponse>> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest(new { message = "No file uploaded" });
                }

                // Validate file type
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
                var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest(new { message = "Invalid file type. Allowed types: JPG, PNG, GIF, WEBP" });
                }

                // Validate file size (max 10MB)
                const long maxFileSize = 10 * 1024 * 1024; // 10MB
                if (file.Length > maxFileSize)
                {
                    return BadRequest(new { message = "File size exceeds 10MB limit" });
                }

                using var stream = file.OpenReadStream();
                var imageUrl = await _imageUploadService.UploadImageAsync(stream, file.FileName);

                return Ok(new UploadImageResponse
                {
                    ImageUrl = imageUrl,
                    Message = "Image uploaded successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading image: {Message}", ex.Message);
                return StatusCode(500, new { message = "An error occurred while uploading the image", error = ex.Message });
            }
        }
    }

    public class UploadImageResponse
    {
        public string ImageUrl { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}

