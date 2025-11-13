# 🔧 Fix Lỗi "dotnet: command not found" trên Render

## ❌ Vấn Đề

Render vẫn đang detect project là Node.js và không có .NET SDK, dẫn đến lỗi:
```
bash: line 1: dotnet: command not found
```

## ✅ Giải Pháp

Có **2 cách** để fix:

---

## 🐳 Cách 1: Sử dụng Docker (Khuyến nghị)

### Bước 1: Push Dockerfile lên GitHub

File `Project/Dockerfile` đã được tạo. Push lên GitHub:

```bash
git add Project/Dockerfile
git commit -m "Add Dockerfile for .NET deployment"
git push
```

### Bước 2: Cấu hình trên Render

1. Vào Render Dashboard → Service của bạn
2. Vào **Settings** → **Environment**
3. Tìm field **"Docker"** hoặc **"Use Docker"**
4. **Bật Docker** (Enable Docker)
5. Hoặc trong form tạo service mới:
   - **Language:** Chọn **"Docker"**
   - **Dockerfile Path:** `Project/Dockerfile` (hoặc để mặc định nếu Dockerfile ở root của Root Directory)
6. **Root Directory:** `Project`
7. **Build Command:** Để trống (Docker sẽ tự build)
8. **Start Command:** Để trống (Docker sẽ tự start)

### Bước 3: Environment Variables

Vẫn cần thêm:
- `ConnectionStrings__DefaultConnection` = [NeonDB connection string]
- `ASPNETCORE_ENVIRONMENT` = `Production`

### Bước 4: Redeploy

Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## ⚙️ Cách 2: Force .NET Runtime (Thử nghiệm)

### Bước 1: Tạo file để force .NET

Đã tạo các file:
- `Project/runtime.txt` (chỉ định .NET 8.0)
- `Project/.buildpacks` (chỉ định .NET buildpack)

### Bước 2: Push lên GitHub

```bash
git add Project/runtime.txt Project/.buildpacks
git commit -m "Add .NET runtime configuration"
git push
```

### Bước 3: Cấu hình trên Render

1. Vào Render Dashboard → Service
2. **Settings** → **Environment**
3. Thêm Environment Variable:
   - Key: `RUNTIME`
   - Value: `dotnet`
4. Hoặc thêm:
   - Key: `DOTNET_VERSION`
   - Value: `8.0`
5. **Redeploy**

---

## 🎯 Khuyến Nghị

**Sử dụng Cách 1 (Docker)** vì:
- ✅ Đảm bảo 100% có .NET SDK
- ✅ Dễ debug và maintain
- ✅ Render hỗ trợ Docker tốt
- ✅ Không phụ thuộc vào auto-detection

---

## 📋 Checklist Sau Khi Fix

- [ ] Đã push Dockerfile lên GitHub
- [ ] Đã bật Docker trên Render
- [ ] Root Directory = `Project`
- [ ] Environment Variables đã được set
- [ ] Đã redeploy
- [ ] Build thành công (không còn lỗi "dotnet: command not found")

---

## 🐛 Nếu Vẫn Lỗi

1. **Kiểm tra Logs:**
   - Vào Render Dashboard → Service → Logs
   - Xem lỗi cụ thể

2. **Kiểm tra Dockerfile:**
   - Đảm bảo Dockerfile ở đúng vị trí: `Project/Dockerfile`
   - Kiểm tra syntax Dockerfile

3. **Kiểm tra Root Directory:**
   - Phải là `Project` (folder chứa Dockerfile và .csproj)

4. **Thử cách khác:**
   - Tạo service mới với Docker từ đầu
   - Hoặc liên hệ Render support

---

**Sau khi fix, service sẽ build thành công với .NET!** 🎉


