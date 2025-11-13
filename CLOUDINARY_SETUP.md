# Hướng dẫn cấu hình Cloudinary (Miễn phí, không cần thẻ thanh toán)

## Tổng quan

Cloudinary là dịch vụ quản lý và phân phối ảnh/video phổ biến, có **free tier hào phóng** và **không yêu cầu thẻ thanh toán**.

## Ưu điểm của Cloudinary

- ✅ **Hoàn toàn miễn phí** - không cần thẻ thanh toán
- ✅ **Free tier hào phóng**: 25 credits/tháng (tương đương 25GB storage hoặc 25GB bandwidth)
- ✅ **Tự động tối ưu ảnh** - resize, crop, format conversion tự động
- ✅ **CDN nhanh** - ảnh được phục vụ qua CDN toàn cầu
- ✅ **Transformations** - có thể transform ảnh qua URL
- ✅ **SDK đầy đủ** - hỗ trợ nhiều ngôn ngữ

## Các bước cấu hình

### 1. Tạo tài khoản Cloudinary

1. Truy cập [Cloudinary.com](https://cloudinary.com/)
2. Click **Sign Up for Free**
3. Điền thông tin:
   - Email
   - Password
   - Full name
   - Company (có thể để trống)
4. Click **Create Account**
5. Xác nhận email (nếu cần)

### 2. Lấy API Credentials

Sau khi đăng nhập, bạn sẽ thấy **Dashboard** với thông tin:

1. Vào **Dashboard** (hoặc click vào logo Cloudinary ở góc trên)
2. Bạn sẽ thấy:
   - **Cloud name** (ví dụ: `demo`)
   - **API Key** (ví dụ: `123456789012345`)
   - **API Secret** (ví dụ: `abcdefghijklmnopqrstuvwxyz123456`)

**Lưu ý quan trọng**: Copy **API Secret** ngay lập tức vì bạn sẽ không thể xem lại sau khi đóng trang.

### 3. Cấu hình trong Backend

#### Development (appsettings.json)

Mở file `Project/appsettings.json` và thêm/cập nhật:

```json
{
  "Cloudinary": {
    "CloudName": "your-cloud-name",
    "ApiKey": "your-api-key",
    "ApiSecret": "your-api-secret"
  }
}
```

**Ví dụ:**
```json
{
  "Cloudinary": {
    "CloudName": "demo",
    "ApiKey": "123456789012345",
    "ApiSecret": "abcdefghijklmnopqrstuvwxyz123456"
  }
}
```

#### Production (Environment Variables)

Khi deploy lên Render hoặc các platform khác, thêm các environment variables:

- `Cloudinary__CloudName` = your-cloud-name
- `Cloudinary__ApiKey` = your-api-key
- `Cloudinary__ApiSecret` = your-api-secret

**Lưu ý**: Sử dụng dấu `__` (double underscore) để phân tách nested configuration trong .NET.

### 4. Cài đặt Package

Package `CloudinaryDotNet` đã được thêm vào `Project.csproj`. Nếu chưa có, chạy:

```bash
dotnet add package CloudinaryDotNet
```

Hoặc restore packages:

```bash
dotnet restore
```

### 5. Kiểm tra hoạt động

1. Chạy backend: `dotnet run` trong thư mục `Project`
2. Chạy frontend: `npm run dev` trong thư mục `Project/frontend`
3. Tạo post mới và thử upload ảnh
4. Ảnh sẽ được upload lên Cloudinary và URL sẽ được tự động điền vào form

## Giới hạn Free Tier

- **25 Credits/tháng** (reset mỗi tháng)
- **1 Credit = 1,000 transformations** hoặc **1GB storage** hoặc **1GB bandwidth**
- **Storage**: 25GB miễn phí
- **Bandwidth**: 25GB miễn phí/tháng
- **Transformations**: 25,000 transformations/tháng

**Lưu ý**: 
- Upload ảnh không tính credit (chỉ tính storage)
- Transformations (resize, crop, etc.) mới tính credit
- Ứng dụng của bạn chỉ upload ảnh gốc, không transform, nên sẽ chỉ dùng storage

## Tính năng Cloudinary

### Tự động tối ưu
- Tự động convert format (WebP, AVIF)
- Tự động compress
- Responsive images

### Transformations qua URL
Bạn có thể transform ảnh trực tiếp qua URL:
```
https://res.cloudinary.com/{cloud_name}/image/upload/w_500,h_500,c_fill/{public_id}.jpg
```

### Folder organization
Ảnh được tự động lưu vào folder `posts/` (có thể thay đổi trong code)

## So sánh với các dịch vụ khác

| Tính năng | Cloudinary | Imgur | Cloudflare R2 |
|-----------|------------|-------|---------------|
| Miễn phí | ✅ Có (25GB) | ✅ Có | ✅ Có (10GB) |
| Transformations | ✅ Có | ❌ Không | ❌ Không |
| CDN | ✅ Có | ✅ Có | ✅ Có |
| SDK | ✅ Đầy đủ | ⚠️ Cơ bản | ⚠️ S3 API |
| Tối ưu tự động | ✅ Có | ❌ Không | ❌ Không |

## Troubleshooting

### Lỗi: "Cloudinary:CloudName is not configured"
- Kiểm tra lại cấu hình trong `appsettings.json`
- Đảm bảo tất cả các trường đã được điền đầy đủ

### Lỗi: "401 Unauthorized" từ Cloudinary
- Kiểm tra lại Cloud Name, API Key, và API Secret
- Đảm bảo không có khoảng trắng thừa
- Kiểm tra xem credentials có đúng không

### Lỗi: "Invalid API Secret"
- API Secret bị sai hoặc đã bị thay đổi
- Tạo lại API Secret trong Dashboard nếu cần

### Ảnh không hiển thị
- Kiểm tra URL ảnh có đúng không
- Kiểm tra xem ảnh có bị xóa trên Cloudinary không
- Kiểm tra CORS (nếu cần)

### Lỗi: "Credit limit exceeded"
- Bạn đã vượt quá 25 credits/tháng
- Đợi đến tháng sau hoặc upgrade plan
- Hoặc tối ưu code để giảm transformations

## Tài liệu tham khảo

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary .NET SDK](https://cloudinary.com/documentation/dotnet_integration)
- [Cloudinary Pricing](https://cloudinary.com/pricing)
- [Cloudinary Image Transformations](https://cloudinary.com/documentation/image_transformations)

## Lưu ý bảo mật

- ⚠️ **Không commit** `appsettings.json` có chứa API Secret vào Git
- ⚠️ Sử dụng environment variables trong production
- ⚠️ Rotate API Secret định kỳ
- ⚠️ Sử dụng **Signed URLs** cho upload nếu cần bảo mật cao hơn

## Tips

1. **Sử dụng folder**: Tổ chức ảnh vào các folder để dễ quản lý
2. **Public ID**: Sử dụng UUID để tránh conflict
3. **Transformations**: Có thể thêm transformations vào URL để optimize ảnh
4. **Monitoring**: Theo dõi usage trong Dashboard để tránh vượt quota

