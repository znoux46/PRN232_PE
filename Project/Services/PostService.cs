using AutoMapper;
using Project.DTOs;
using Project.Models;
using Project.Repositories;

namespace Project.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _repository;
        private readonly IMapper _mapper;

        public PostService(IPostRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<PostDto?> GetByIdAsync(Guid id)
        {
            var post = await _repository.GetByIdAsync(id);
            return post == null ? null : _mapper.Map<PostDto>(post);
        }

        public async Task<PagedResultDto<PostDto>> GetAllAsync(PostQueryDto query)
        {
            var result = await _repository.GetAllAsync(query);
            return new PagedResultDto<PostDto>
            {
                Items = _mapper.Map<List<PostDto>>(result.Items),
                TotalCount = result.TotalCount,
                Page = result.Page,
                PageSize = result.PageSize
            };
        }

        public async Task<PostDto> CreateAsync(CreatePostDto createDto)
        {
            var post = _mapper.Map<Post>(createDto);
            var createdPost = await _repository.CreateAsync(post);
            return _mapper.Map<PostDto>(createdPost);
        }

        public async Task<PostDto?> UpdateAsync(Guid id, UpdatePostDto updateDto)
        {
            var existingPost = await _repository.GetByIdAsync(id);
            if (existingPost == null)
                return null;

            existingPost.Name = updateDto.Name;
            existingPost.Description = updateDto.Description;
            existingPost.ImageUrl = updateDto.ImageUrl;

            var updatedPost = await _repository.UpdateAsync(existingPost);
            return _mapper.Map<PostDto>(updatedPost);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}


