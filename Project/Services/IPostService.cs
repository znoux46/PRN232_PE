using Project.DTOs;

namespace Project.Services
{
    public interface IPostService
    {
        Task<PostDto?> GetByIdAsync(Guid id);
        Task<PagedResultDto<PostDto>> GetAllAsync(PostQueryDto query);
        Task<PostDto> CreateAsync(CreatePostDto createDto);
        Task<PostDto?> UpdateAsync(Guid id, UpdatePostDto updateDto);
        Task<bool> DeleteAsync(Guid id);
    }
}


