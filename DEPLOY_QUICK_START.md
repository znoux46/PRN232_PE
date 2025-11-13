# ⚡ Deploy Quick Start Guide

## 🎯 Tóm Tắt Nhanh

### 1️⃣ Database (NeonDB) - 5 phút
```
1. Tạo account: https://neon.tech
2. Create Project → Copy Connection String
3. Lưu connection string
```

### 2️⃣ Backend (Render) - 10 phút
```
1. Tạo account: https://render.com
2. New → Web Service → Connect GitHub
3. Cấu hình (CHỌN 1 TRONG 2):
   
   CÁCH 1 (Khuyến nghị - Dùng YAML):
   - Chọn "Apply Render YAML" hoặc "From YAML"
   - Render tự đọc file render.yaml
   
   CÁCH 2 (Manual):
   - Root Directory: Project
   - Runtime: CHỌN .NET (không để mặc định!)
   - Build: dotnet publish -c Release -o ./publish
   - Start: dotnet ./publish/Project.dll
   
4. Environment Variables:
   - ConnectionStrings__DefaultConnection = [NeonDB connection string]
   - ASPNETCORE_ENVIRONMENT = Production
5. Deploy → Copy Backend URL
```

### 3️⃣ Frontend (Vercel) - 5 phút
```
1. Tạo account: https://vercel.com
2. Add New → Project → Import GitHub
3. Cấu hình:
   - Root Directory: Project/frontend
4. Environment Variables:
   - NEXT_PUBLIC_API_URL = https://your-backend-url.onrender.com/api
5. Deploy → Copy Frontend URL
```

### 4️⃣ Cập Nhật CORS - 2 phút
```
1. Vào Render → Backend Service → Environment
2. Thêm: Cors__AllowedOrigins__0 = https://your-frontend-url.vercel.app
3. Save → Auto redeploy
```

## 📋 Checklist

- [ ] NeonDB: Database đã tạo, có connection string
- [ ] Render: Backend đã deploy, có URL
- [ ] Vercel: Frontend đã deploy, có URL
- [ ] CORS: Đã cấu hình đúng
- [ ] Test: API hoạt động (Swagger)
- [ ] Test: Frontend hoạt động (tạo/sửa/xóa post)

## 🔗 Links Cần Lưu

```
GitHub:     https://github.com/your-username/repo-name
Backend:    https://your-backend.onrender.com
Frontend:   https://your-frontend.vercel.app
Swagger:    https://your-backend.onrender.com/swagger
```

## ⚠️ Lưu Ý Quan Trọng

1. **Root Directory trên Render:** `Project` (không phải root)
2. **Root Directory trên Vercel:** `Project/frontend` (không phải root)
3. **Environment Variable CORS:** Format `Cors__AllowedOrigins__0` (2 dấu gạch dưới)
4. **Frontend API URL:** Phải có `/api` ở cuối
5. **Render Free Tier:** Service sẽ sleep sau 15 phút không dùng

## 🐛 Lỗi Thường Gặp

| Lỗi | Giải Pháp |
|-----|-----------|
| dotnet: command not found | Chọn Runtime = .NET hoặc dùng render.yaml |
| Build failed | Kiểm tra Root Directory và Runtime |
| CORS error | Thêm frontend URL vào CORS env var |
| Database error | Kiểm tra connection string |
| API not found | Kiểm tra NEXT_PUBLIC_API_URL |

---

**Chi tiết đầy đủ:** Xem file `HUONG_DAN_DEPLOY.md`

