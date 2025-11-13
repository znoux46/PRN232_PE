using Microsoft.AspNetCore.Mvc;
using Project.DTOs;
using Project.Services;

namespace Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly ILogger<PostsController> _logger;

        public PostsController(IPostService postService, ILogger<PostsController> logger)
        {
            _postService = postService;
            _logger = logger;
        }

        /// <summary>
        /// Get all posts with pagination, search, and sorting
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(PagedResultDto<PostDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedResultDto<PostDto>>> GetAll([FromQuery] PostQueryDto query)
        {
            try
            {
                var result = await _postService.GetAllAsync(query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting posts: {Message}", ex.Message);
                return StatusCode(500, new { message = "An error occurred while retrieving posts", error = ex.Message });
            }
        }

        /// <summary>
        /// Get a post by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PostDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PostDto>> GetById(Guid id)
        {
            try
            {
                var post = await _postService.GetByIdAsync(id);
                if (post == null)
                {
                    return NotFound(new { message = $"Post with ID {id} not found" });
                }
                return Ok(post);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting post {PostId}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the post" });
            }
        }

        /// <summary>
        /// Create a new post
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(PostDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PostDto>> Create([FromBody] CreatePostDto createDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState
                        .Where(x => x.Value?.Errors.Count > 0)
                        .SelectMany(x => x.Value!.Errors.Select(e => new { Field = x.Key, Message = e.ErrorMessage }))
                        .ToList();
                    _logger.LogWarning("Validation failed: {Errors}", string.Join(", ", errors.Select(e => $"{e.Field}: {e.Message}")));
                    return BadRequest(new { message = "Validation failed", errors });
                }

                var post = await _postService.CreateAsync(createDto);
                return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating post: {Message}", ex.Message);
                return StatusCode(500, new { message = "An error occurred while creating the post", error = ex.Message });
            }
        }

        /// <summary>
        /// Update an existing post
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(PostDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PostDto>> Update(Guid id, [FromBody] UpdatePostDto updateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var post = await _postService.UpdateAsync(id, updateDto);
                if (post == null)
                {
                    return NotFound(new { message = $"Post with ID {id} not found" });
                }
                return Ok(post);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating post {PostId}", id);
                return StatusCode(500, new { message = "An error occurred while updating the post" });
            }
        }

        /// <summary>
        /// Delete a post
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var deleted = await _postService.DeleteAsync(id);
                if (!deleted)
                {
                    return NotFound(new { message = $"Post with ID {id} not found" });
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting post {PostId}", id);
                return StatusCode(500, new { message = "An error occurred while deleting the post" });
            }
        }
    }
}




