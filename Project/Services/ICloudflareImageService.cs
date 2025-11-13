namespace Project.Services
{
    public interface IImageUploadService
    {
        Task<string> UploadImageAsync(Stream imageStream, string fileName, CancellationToken cancellationToken = default);
        Task<bool> DeleteImageAsync(string imageId, CancellationToken cancellationToken = default);
    }
}

