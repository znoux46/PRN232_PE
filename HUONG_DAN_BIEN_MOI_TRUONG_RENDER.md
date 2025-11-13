# 🔐 Hướng Dẫn Cấu Hình Biến Môi Trường trên Render

## 📋 Tổng Quan

Khi deploy backend lên Render, bạn cần sử dụng **biến môi trường (Environment Variables)** để thay thế các giá trị nhạy cảm trong `appsettings.json`. Điều này giúp:
- ✅ Bảo mật thông tin (không commit secret vào Git)
- ✅ Dễ dàng thay đổi cấu hình giữa các môi trường
- ✅ Tuân thủ best practices

## 🔧 Các Biến Môi Trường Cần Thiết

### 1. **ConnectionStrings__DefaultConnection** ⚠️ BẮT BUỘC
- **Mục đích:** Connection string đến PostgreSQL database (NeonDB)
- **Format trong Render:** `ConnectionStrings__DefaultConnection`
- **Giá trị:** Connection string từ NeonDB
- **Ví dụ:** 
  ```
  Host=ep-xxx-xxx.region.aws.neon.tech;Database=postmanagementdb;Username=username;Password=password;SslMode=Require
  ```
  hoặc
  ```
  postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
  ```

### 2. **ASPNETCORE_ENVIRONMENT** ⚠️ BẮT BUỘC
- **Mục đích:** Xác định môi trường chạy (Production)
- **Format trong Render:** `ASPNETCORE_ENVIRONMENT`
- **Giá trị:** `Production`
- **Ví dụ:** `Production`

### 3. **Cors__AllowedOrigins__0** ⚠️ BẮT BUỘC (sau khi deploy frontend)
- **Mục đích:** URL của frontend để cho phép CORS
- **Format trong Render:** `Cors__AllowedOrigins__0`
- **Giá trị:** URL frontend trên Vercel/Netlify
- **Ví dụ:** `https://your-frontend.vercel.app`
- **Lưu ý:** Nếu có nhiều frontend URLs, thêm `Cors__AllowedOrigins__1`, `Cors__AllowedOrigins__2`, etc.

### 4. **Cloudinary__CloudName** ⚠️ BẮT BUỘC
- **Mục đích:** Cloud name của Cloudinary account
- **Format trong Render:** `Cloudinary__CloudName`
- **Giá trị:** Cloud name từ Cloudinary dashboard
- **Ví dụ:** `dvk2b9nun`

### 5. **Cloudinary__ApiKey** ⚠️ BẮT BUỘC
- **Mục đích:** API Key của Cloudinary account
- **Format trong Render:** `Cloudinary__ApiKey`
- **Giá trị:** API Key từ Cloudinary dashboard
- **Ví dụ:** `144273327795377`

### 6. **Cloudinary__ApiSecret** ⚠️ BẮT BUỘC
- **Mục đích:** API Secret của Cloudinary account
- **Format trong Render:** `Cloudinary__ApiSecret`
- **Giá trị:** API Secret từ Cloudinary dashboard
- **Ví dụ:** `JuVeQWDAwXTPWKxvLE6IqyNgPtI`

---

## 📝 Cách Thêm Biến Môi Trường trên Render

### Bước 1: Vào Render Dashboard
1. Đăng nhập vào [Render Dashboard](https://dashboard.render.com)
2. Chọn Web Service của bạn (ví dụ: `post-management-api`)

### Bước 2: Vào mục Environment
1. Click vào tab **"Environment"** ở menu bên trái
2. Hoặc scroll xuống phần **"Environment Variables"**

### Bước 3: Thêm từng biến môi trường
Click nút **"Add Environment Variable"** và thêm từng biến:

#### Biến 1: Connection String
```
KEY:   ConnectionStrings__DefaultConnection
VALUE: [Paste connection string từ NeonDB]
```

#### Biến 2: Environment
```
KEY:   ASPNETCORE_ENVIRONMENT
VALUE: Production
```

#### Biến 3: CORS (sau khi có frontend URL)
```
KEY:   Cors__AllowedOrigins__0
VALUE: https://your-frontend.vercel.app
```

#### Biến 4: Cloudinary Cloud Name
```
KEY:   Cloudinary__CloudName
VALUE: [Cloud name từ Cloudinary]
```

#### Biến 5: Cloudinary API Key
```
KEY:   Cloudinary__ApiKey
VALUE: [API Key từ Cloudinary]
```

#### Biến 6: Cloudinary API Secret
```
KEY:   Cloudinary__ApiSecret
VALUE: [API Secret từ Cloudinary]
```

### Bước 4: Save và Redeploy
1. Sau khi thêm tất cả biến, click **"Save Changes"**
2. Render sẽ tự động redeploy service
3. Hoặc bạn có thể click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🔍 Lưu Ý Quan Trọng

### 1. Format Biến Môi Trường trong .NET
- Trong .NET, để đọc nested config từ biến môi trường, sử dụng **double underscore** (`__`)
- Ví dụ: `Cloudinary:CloudName` trong JSON → `Cloudinary__CloudName` trong biến môi trường
- Ví dụ: `ConnectionStrings:DefaultConnection` → `ConnectionStrings__DefaultConnection`

### 2. Array/List trong Biến Môi Trường
- Để thêm nhiều CORS origins, sử dụng index:
  - `Cors__AllowedOrigins__0` = URL đầu tiên
  - `Cors__AllowedOrigins__1` = URL thứ hai
  - `Cors__AllowedOrigins__2` = URL thứ ba
  - ...

### 3. Connection String Format
- Nếu NeonDB cung cấp connection string dạng URI: `postgresql://user:pass@host/db?sslmode=require`
- Bạn có thể dùng trực tiếp hoặc convert sang format .NET:
  - `Host=host;Database=db;Username=user;Password=pass;SslMode=Require`

### 4. Bảo Mật
- ⚠️ **KHÔNG BAO GIỜ** commit các giá trị secret vào Git
- ✅ Luôn sử dụng biến môi trường cho production
- ✅ File `appsettings.Production.json` có thể để trống hoặc có giá trị mẫu

---

## ✅ Checklist Trước Khi Deploy

- [ ] Đã thêm `ConnectionStrings__DefaultConnection` với connection string từ NeonDB
- [ ] Đã thêm `ASPNETCORE_ENVIRONMENT` = `Production`
- [ ] Đã thêm `Cloudinary__CloudName` với cloud name từ Cloudinary
- [ ] Đã thêm `Cloudinary__ApiKey` với API key từ Cloudinary
- [ ] Đã thêm `Cloudinary__ApiSecret` với API secret từ Cloudinary
- [ ] Đã thêm `Cors__AllowedOrigins__0` với URL frontend (sau khi deploy frontend)
- [ ] Đã kiểm tra tất cả giá trị không có khoảng trắng thừa
- [ ] Đã save changes và redeploy

---

## 🐛 Troubleshooting

### Lỗi: "Cloudinary:CloudName is not configured"
- **Nguyên nhân:** Chưa thêm biến môi trường `Cloudinary__CloudName`
- **Giải pháp:** Thêm biến môi trường với format đúng (double underscore)

### Lỗi: "Failed to create or connect to database"
- **Nguyên nhân:** Connection string sai hoặc chưa thêm biến môi trường
- **Giải pháp:** 
  - Kiểm tra lại `ConnectionStrings__DefaultConnection`
  - Đảm bảo connection string đúng format
  - Kiểm tra database đã được tạo trên NeonDB

### Lỗi: CORS blocked
- **Nguyên nhân:** Chưa thêm `Cors__AllowedOrigins__0` hoặc URL sai
- **Giải pháp:**
  - Thêm biến môi trường `Cors__AllowedOrigins__0` với URL frontend chính xác
  - Đảm bảo URL không có trailing slash (`/`)
  - Redeploy service

### Lỗi: Biến môi trường không được đọc
- **Nguyên nhân:** Format sai (thiếu double underscore)
- **Giải pháp:**
  - Kiểm tra lại format: `Section__SubSection__Key` (double underscore)
  - Ví dụ: `Cloudinary__ApiKey` (KHÔNG phải `Cloudinary:ApiKey` hoặc `Cloudinary_ApiKey`)

---

## 📚 Tham Khảo

- [.NET Configuration - Environment Variables](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-8.0#environment-variables)
- [Render Environment Variables](https://render.com/docs/environment-variables)

---

**Sau khi cấu hình xong, backend sẽ tự động đọc các giá trị từ biến môi trường thay vì từ `appsettings.json`!** 🎉

