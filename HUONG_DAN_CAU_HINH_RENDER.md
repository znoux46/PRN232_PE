# 🔧 Hướng Dẫn Cấu Hình Render - Step by Step

## 📋 Điền Form Tạo Web Service trên Render

### 1. **Source Code**
- ✅ Repository: `znoux46/PRN232_PE` (đã chọn đúng)

### 2. **Service Type**
- ✅ Chọn: **Web Service**

### 3. **Name**
- ✅ Điền: `PRN232_PE` hoặc `post-management-api` (tên bạn muốn)

### 4. **Project** (Optional)
- ⏭️ Có thể bỏ qua hoặc tạo project mới

### 5. **Environment** (Optional)
- ⏭️ Có thể bỏ qua

### 6. **Language** ⚠️ **QUAN TRỌNG!**
- ⚠️ **Nếu dropdown chỉ có: Docker, Elixir, Go, Node, Python 3, Ruby, Rust**
- ✅ **KHÔNG CẦN LO LẮNG!** Render sẽ tự động detect .NET từ file `.csproj`
- ✅ **ĐỂ MẶC ĐỊNH "Node" HOẶC CHỌN BẤT KỲ** - Không ảnh hưởng
- ⚠️ **QUAN TRỌNG:** Render sẽ tự động chuyển sang .NET runtime khi:
  - Root Directory = `Project` (folder chứa `Project.csproj`)
  - Build Command = `dotnet publish ...`
  - Start Command = `dotnet ...`

### 7. **Branch**
- ✅ Điền: `main` (hoặc branch bạn muốn deploy)

### 8. **Region**
- ✅ Chọn: `Oregon (US West)` hoặc region gần bạn nhất

### 9. **Root Directory** ⚠️ **QUAN TRỌNG!**
- ✅ Điền: `Project`
- **KHÔNG** để trống
- **KHÔNG** điền `Project/frontend` (đó là cho frontend)

### 10. **Build Command** ⚠️ **QUAN TRỌNG!**
- ❌ Xóa: `yarn`
- ✅ Điền: `dotnet publish -c Release -o ./publish`

### 11. **Start Command** ⚠️ **QUAN TRỌNG!**
- ❌ Xóa: `yarn start`
- ✅ Điền: `dotnet ./publish/Project.dll`

### 12. **Instance Type**
- ✅ Chọn: **Free** (cho project học tập)

### 13. **Environment Variables**
Click **"Add Environment Variable"** và thêm:

| NAME | VALUE |
|------|-------|
| `ConnectionStrings__DefaultConnection` | `[Paste connection string từ NeonDB]` |
| `ASPNETCORE_ENVIRONMENT` | `Production` |

**Lưu ý:** 
- Connection string từ NeonDB có dạng: `postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require`
- Copy toàn bộ connection string và paste vào VALUE

### 14. **Advanced** (Optional)
- **Health Check Path:** Có thể để `/healthz` hoặc bỏ trống
- **Pre-Deploy Command:** Bỏ trống
- **Auto-Deploy:** ✅ Bật (On Commit)
- **Build Filters:** Có thể bỏ qua

### 15. **Create Web Service**
- Click nút **"Create Web Service"** ở cuối trang
- Render sẽ bắt đầu build và deploy

---

## ✅ Checklist Trước Khi Click "Create"

- [ ] **Language:** Để mặc định hoặc chọn bất kỳ (Render sẽ tự detect .NET)
- [ ] **Root Directory:** Đã điền `Project` ⚠️ **QUAN TRỌNG NHẤT!**
- [ ] **Build Command:** Đã điền `dotnet publish -c Release -o ./publish` ⚠️ **QUAN TRỌNG!**
- [ ] **Start Command:** Đã điền `dotnet ./publish/Project.dll` ⚠️ **QUAN TRỌNG!**
- [ ] **Environment Variables:** Đã thêm `ConnectionStrings__DefaultConnection` và `ASPNETCORE_ENVIRONMENT`

---

## 🎯 Tóm Tắt Các Field Quan Trọng

```
Language:          Để mặc định (Render tự detect .NET từ .csproj)
Root Directory:    Project ⚠️ QUAN TRỌNG NHẤT!
Build Command:     dotnet publish -c Release -o ./publish
Start Command:     dotnet ./publish/Project.dll
```

**Lưu ý:** Language dropdown không có .NET là bình thường. Render sẽ tự động detect khi có file `.csproj` trong Root Directory.

---

## ✅ Giải Thích Về Language Dropdown

**Nếu dropdown chỉ có: Docker, Elixir, Go, Node, Python 3, Ruby, Rust**

👉 **ĐÂY LÀ BÌNH THƯỜNG!** Render không hiển thị .NET trong dropdown này, nhưng sẽ **TỰ ĐỘNG DETECT** khi:

1. ✅ Root Directory = `Project` (folder chứa `Project.csproj`)
2. ✅ Build Command = `dotnet publish -c Release -o ./publish`
3. ✅ Start Command = `dotnet ./publish/Project.dll`

**Render sẽ tự động:**
- Phát hiện file `Project.csproj` trong Root Directory
- Chuyển sang .NET runtime environment
- Cài đặt .NET SDK
- Chạy build command với .NET

**Vì vậy:**
- ✅ Bạn có thể **để mặc định "Node"** hoặc chọn bất kỳ
- ✅ **KHÔNG ẢNH HƯỞNG** đến việc deploy .NET
- ✅ Quan trọng nhất là **Root Directory, Build Command, Start Command** phải đúng

---

## 🐛 Sau Khi Deploy

Nếu vẫn gặp lỗi, kiểm tra:

1. **Logs trên Render Dashboard:**
   - Vào service → Logs
   - Xem lỗi cụ thể

2. **Kiểm tra lại các field:**
   - Root Directory phải là `Project`
   - Build/Start Commands phải đúng
   - Environment Variables phải có connection string

3. **Nếu lỗi "dotnet: command not found":**
   - ⚠️ **Render không tự động detect .NET** như mong đợi
   - ✅ **Giải pháp:** Sử dụng Docker (xem file `HUONG_DAN_FIX_DOTNET_ERROR.md`)
   - Hoặc thử:
     - Kiểm tra **Root Directory** phải là `Project` (folder chứa `Project.csproj`)
     - Thêm Environment Variable: `RUNTIME` = `dotnet`
     - Thêm Environment Variable: `DOTNET_VERSION` = `8.0`
     - Redeploy

---

**Sau khi deploy thành công, bạn sẽ có Backend URL để dùng cho Frontend!** 🎉

