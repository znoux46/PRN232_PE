# Hướng dẫn cấu hình Imgur API (Miễn phí, không cần thẻ thanh toán)

## Tổng quan

Imgur là một dịch vụ upload ảnh miễn phí, không yêu cầu thẻ thanh toán. Đây là giải pháp thay thế tốt cho Cloudflare Images nếu bạn không có thẻ Visa.

## Ưu điểm của Imgur

- ✅ **Hoàn toàn miễn phí** - không cần thẻ thanh toán
- ✅ **Dễ dàng đăng ký** - chỉ cần tạo tài khoản Imgur
- ✅ **Không giới hạn** - upload không giới hạn số lượng ảnh
- ✅ **CDN nhanh** - ảnh được phục vụ qua CDN của Imgur
- ✅ **API đơn giản** - dễ tích hợp

## Các bước cấu hình

### 1. Tạo tài khoản Imgur

1. Truy cập [Imgur.com](https://imgur.com/)
2. Click **Sign up** để tạo tài khoản miễn phí
3. Xác nhận email (nếu cần)

### 2. Tạo Imgur Application

1. Đăng nhập vào Imgur
2. Truy cập: [https://api.imgur.com/oauth2/addclient](https://api.imgur.com/oauth2/addclient)
3. Điền thông tin:
   - **Application name**: Tên ứng dụng của bạn (ví dụ: "Post Management App")
   - **Authorization type**: Chọn **Anonymous usage without user authorization**
   - **Authorization callback URL**: Có thể để trống hoặc điền `http://localhost`
   - **App website**: Có thể để trống
   - **Email**: Email của bạn
   - **Description**: Mô tả ngắn về ứng dụng
4. Click **Submit**
5. **Copy Client ID** ngay lập tức (bạn sẽ cần nó)

### 3. Cấu hình trong Backend

#### Development (appsettings.json)

Mở file `Project/appsettings.json` và thêm/cập nhật:

```json
{
  "Imgur": {
    "ClientId": "your-client-id-here"
  }
}
```

**Lưu ý**: Ứng dụng sử dụng Imgur làm dịch vụ upload ảnh mặc định.

#### Production (Environment Variables)

Khi deploy lên Render hoặc các platform khác, thêm environment variable:

- `Imgur__ClientId` = your-client-id

### 4. Kiểm tra hoạt động

1. Chạy backend: `dotnet run` trong thư mục `Project`
2. Chạy frontend: `npm run dev` trong thư mục `Project/frontend`
3. Tạo post mới và thử upload ảnh
4. Ảnh sẽ được upload lên Imgur và URL sẽ được tự động điền vào form

## Giới hạn Imgur API

- **Rate limit**: 1,250 requests/giờ (đủ cho hầu hết ứng dụng)
- **File size**: Tối đa 10MB (đã được cấu hình trong code)
- **Formats**: JPG, PNG, GIF, WEBP, APNG, TIFF, BMP, PDF, XCF (PSD)

## So sánh với Cloudflare Images

| Tính năng | Imgur | Cloudflare Images |
|-----------|-------|-------------------|
| Miễn phí | ✅ Có | ⚠️ Cần thẻ thanh toán |
| Đăng ký | ✅ Dễ dàng | ⚠️ Cần thẻ |
| Rate limit | 1,250/giờ | Cao hơn |
| CDN | ✅ Có | ✅ Có |
| Transformations | ❌ Không | ✅ Có |

## Troubleshooting

### Lỗi: "Imgur:ClientId is not configured"
- Kiểm tra lại cấu hình trong `appsettings.json`
- Đảm bảo key là `Imgur:ClientId` (development) hoặc `Imgur__ClientId` (production)

### Lỗi: "401 Unauthorized" từ Imgur
- Kiểm tra lại Client ID có đúng không
- Đảm bảo Client ID chưa bị revoke
- Kiểm tra xem application có được tạo đúng không

### Lỗi: "Rate limit exceeded"
- Bạn đã vượt quá 1,250 requests/giờ
- Đợi một chút rồi thử lại
- Hoặc nâng cấp lên Imgur Pro (có phí)

### Ảnh không hiển thị
- Kiểm tra URL ảnh có đúng không
- Kiểm tra xem ảnh có bị xóa trên Imgur không
- Kiểm tra CORS (nếu cần)

## Tài liệu tham khảo

- [Imgur API Documentation](https://apidocs.imgur.com/)
- [Imgur API Authentication](https://apidocs.imgur.com/#authorization-and-oauth)
- [Imgur Image Upload](https://apidocs.imgur.com/#c85c9dfc-7487-4de2-9ecd-66f5cf5e7beb)

## Lưu ý

- Imgur là dịch vụ công cộng, ảnh upload có thể được xem bởi người khác nếu họ biết URL
- Nếu cần bảo mật cao, nên sử dụng Cloudflare Images hoặc dịch vụ khác
- Imgur có thể xóa ảnh không được sử dụng trong một khoảng thời gian dài

