# 🚀 Hướng Dẫn Deploy - Backend (Render) và Frontend (Vercel)

## 📋 Mục Lục
1. [Chuẩn Bị](#chuẩn-bị)
2. [Deploy Backend lên Render](#deploy-backend-lên-render)
3. [Deploy Frontend lên Vercel](#deploy-frontend-lên-vercel)
4. [Cấu Hình Database (NeonDB)](#cấu-hình-database-neondb)
5. [Kiểm Tra và Troubleshooting](#kiểm-tra-và-troubleshooting)

---

## 🔧 Chuẩn Bị

### Yêu Cầu:
- ✅ Code đã được push lên GitHub (public repository)
- ✅ Tài khoản Render (miễn phí): https://render.com
- ✅ Tài khoản Vercel (miễn phí): https://vercel.com
- ✅ Tài khoản NeonDB (miễn phí): https://neon.tech

### Checklist Trước Khi Deploy:
- [ ] Code đã push lên GitHub
- [ ] Đã tạo tài khoản Render
- [ ] Đã tạo tài khoản Vercel
- [ ] Đã tạo tài khoản NeonDB

---

## 🗄️ Bước 1: Cấu Hình Database (NeonDB)

### 1.1. Tạo Database trên NeonDB

1. Truy cập: https://neon.tech
2. Đăng ký/Đăng nhập
3. Click **"Create Project"**
4. Đặt tên project (ví dụ: `post-management-db`)
5. Chọn region gần nhất (ví dụ: `Singapore` hoặc `US East`)
6. Click **"Create Project"**

### 1.2. Lấy Connection String

1. Sau khi tạo project, bạn sẽ thấy dashboard
2. Click vào tab **"Connection Details"** hoặc **"Connection String"**
3. Copy **Connection String** (sẽ có dạng):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
4. **Lưu lại** connection string này để dùng cho Render backend

### 1.3. Test Connection (Tùy chọn)

Bạn có thể test kết nối bằng cách:
- Sử dụng pgAdmin
- Hoặc dùng command line với `psql`
- Hoặc test trực tiếp khi deploy backend

---

## ⚙️ Bước 2: Deploy Backend lên Render

### 2.1. Tạo Web Service trên Render

1. Truy cập: https://dashboard.render.com
2. Click **"New +"** → Chọn **"Web Service"**
3. Kết nối GitHub repository:
   - Click **"Connect account"** nếu chưa kết nối
   - Chọn repository chứa code của bạn
   - Click **"Connect"**

### 2.2. Cấu Hình Backend Service

⚠️ **QUAN TRỌNG**: Nếu Render detect nhầm là Node.js (lỗi "dotnet: command not found"), làm theo một trong 2 cách sau:

#### **Cách 1: Sử dụng render.yaml (Khuyến nghị)**

1. File `render.yaml` đã được tạo ở root của repository
2. Khi tạo service trên Render:
   - Chọn **"Apply Render YAML"** hoặc **"From YAML"**
   - Render sẽ tự động đọc file `render.yaml` và cấu hình đúng

#### **Cách 2: Cấu hình Manual trong Dashboard**

Điền thông tin:

| Field | Giá Trị | Ghi Chú |
|-------|---------|---------|
| **Name** | `post-management-api` (hoặc tên bạn muốn) | |
| **Region** | Chọn region gần nhất (Singapore, US East, etc.) | |
| **Branch** | `main` (hoặc branch bạn muốn deploy) | |
| **Root Directory** | `Project` | ⚠️ **QUAN TRỌNG**: Folder chứa `.csproj` file |
| **Runtime** | **`.NET`** hoặc **`.NET Core`** | ⚠️ **PHẢI CHỌN .NET**, không để mặc định |
| **Language/Runtime Dropdown** | **Chọn `.NET` hoặc `.NET Core`** | ⚠️ **QUAN TRỌNG**: Phải chọn .NET, không bỏ qua |
| **Build Command** | `dotnet publish -c Release -o ./publish` | ⚠️ **QUAN TRỌNG** |
| **Start Command** | `dotnet ./publish/Project.dll` | ⚠️ **QUAN TRỌNG** |

**Lưu ý về Runtime:**
- ⚠️ **Nếu Render detect nhầm Node.js**, bạn **PHẢI** chọn `.NET` hoặc `.NET Core` trong dropdown
- Render có thể detect nhầm vì có file `package.json` trong folder `frontend`
- Nếu không thấy option `.NET`, thử:
  - Scroll xuống trong dropdown
  - Hoặc tìm "Other" hoặc "Custom"
  - Hoặc sử dụng file `render.yaml` (Cách 1)

### 2.3. Cấu Hình Environment Variables

Trong phần **"Environment Variables"**, thêm:

| Key | Value | Ghi Chú |
|-----|-------|---------|
| `ConnectionStrings__DefaultConnection` | `[Connection String từ NeonDB]` | Paste connection string đã copy |
| `ASPNETCORE_ENVIRONMENT` | `Production` | Môi trường production |
| `ASPNETCORE_URLS` | `http://0.0.0.0:10000` | Port Render sử dụng |

**Lưu ý:** 
- Render tự động set port, nhưng có thể cần set `ASPNETCORE_URLS`
- Connection string từ NeonDB đã bao gồm SSL, không cần chỉnh sửa

### 2.4. Deploy Backend

1. Click **"Create Web Service"**
2. Render sẽ tự động:
   - Clone code từ GitHub
   - Restore packages
   - Build project
   - Deploy service
3. Chờ 5-10 phút để build và deploy xong
4. Khi deploy thành công, bạn sẽ thấy:
   - Status: **"Live"**
   - URL: `https://your-service-name.onrender.com`

### 2.5. Lấy Backend URL

1. Copy URL backend (ví dụ: `https://post-management-api.onrender.com`)
2. **Lưu lại** URL này để cấu hình cho frontend
3. Test API bằng cách truy cập: `https://your-backend-url.onrender.com/swagger`

### 2.6. Cấu Hình CORS (Quan Trọng!)

Sau khi có frontend URL, cần cập nhật CORS:

1. Vào **Environment Variables** của backend service trên Render
2. Thêm biến mới:

| Key | Value |
|-----|-------|
| `Cors__AllowedOrigins__0` | `https://your-frontend-url.vercel.app` |

Hoặc nếu muốn cho phép tất cả (chỉ dùng cho development):
```
Cors__AllowedOrigins__0 = *
```

**Lưu ý:** Bạn có thể cập nhật CORS sau khi deploy frontend.

---

## 🎨 Bước 3: Deploy Frontend lên Vercel

### 3.1. Tạo Project trên Vercel

1. Truy cập: https://vercel.com
2. Đăng ký/Đăng nhập (có thể dùng GitHub account)
3. Click **"Add New..."** → **"Project"**
4. Import GitHub repository:
   - Chọn repository chứa code
   - Click **"Import"**

### 3.2. Cấu Hình Frontend Project

Điền thông tin:

| Field | Giá Trị |
|-------|---------|
| **Project Name** | `post-management-app` (hoặc tên bạn muốn) |
| **Framework Preset** | `Next.js` (Vercel tự động detect) |
| **Root Directory** | `Project/frontend` ⚠️ **QUAN TRỌNG** |
| **Build Command** | `npm run build` (hoặc để mặc định) |
| **Output Directory** | `.next` (hoặc để mặc định) |
| **Install Command** | `npm install` (hoặc để mặc định) |

### 3.3. Cấu Hình Environment Variables

Trong phần **"Environment Variables"**, thêm:

| Key | Value | Ghi Chú |
|-----|-------|---------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.onrender.com/api` | URL backend từ Render |

**Lưu ý:**
- Phải có prefix `NEXT_PUBLIC_` để biến có thể truy cập từ client-side
- Thay `your-backend-url.onrender.com` bằng URL backend thực tế của bạn

### 3.4. Deploy Frontend

1. Click **"Deploy"**
2. Vercel sẽ tự động:
   - Install dependencies
   - Build Next.js app
   - Deploy lên CDN
3. Chờ 2-5 phút để deploy xong
4. Khi deploy thành công, bạn sẽ thấy:
   - Status: **"Ready"**
   - URL: `https://your-project-name.vercel.app`

### 3.5. Lấy Frontend URL

1. Copy URL frontend (ví dụ: `https://post-management-app.vercel.app`)
2. **Lưu lại** URL này
3. Truy cập URL để test ứng dụng

### 3.6. Cập Nhật CORS trên Backend

Sau khi có frontend URL, quay lại Render để cập nhật CORS:

1. Vào backend service trên Render
2. Vào **Environment** → **Environment Variables**
3. Cập nhật hoặc thêm:
   - Key: `Cors__AllowedOrigins__0`
   - Value: `https://your-frontend-url.vercel.app`
4. Click **"Save Changes"**
5. Render sẽ tự động **redeploy** service

---

## ✅ Bước 4: Kiểm Tra và Test

### 4.1. Test Backend API

1. Truy cập Swagger UI:
   ```
   https://your-backend-url.onrender.com/swagger
   ```
2. Test các endpoints:
   - `GET /api/posts` - Lấy danh sách posts
   - `POST /api/posts` - Tạo post mới
   - `PUT /api/posts/{id}` - Cập nhật post
   - `DELETE /api/posts/{id}` - Xóa post

### 4.2. Test Frontend

1. Truy cập frontend URL:
   ```
   https://your-frontend-url.vercel.app
   ```
2. Kiểm tra các tính năng:
   - ✅ Hiển thị danh sách posts
   - ✅ Tìm kiếm posts
   - ✅ Sắp xếp posts
   - ✅ Tạo post mới
   - ✅ Chỉnh sửa post
   - ✅ Xóa post

### 4.3. Kiểm Tra Console (Nếu có lỗi)

1. Mở **Developer Tools** (F12)
2. Xem tab **Console** và **Network**
3. Kiểm tra:
   - CORS errors
   - API connection errors
   - Environment variable issues

---

## 🐛 Troubleshooting

### Lỗi Backend

#### 1. Build Failed - "dotnet: command not found"
**Nguyên nhân:** 
- Render detect nhầm project là Node.js (do có `package.json` trong frontend folder)
- Runtime không được set đúng là .NET

**Giải pháp:**
- **Cách 1 (Khuyến nghị):** Sử dụng file `render.yaml` đã tạo ở root repository
  - Khi tạo service, chọn "Apply Render YAML" hoặc "From YAML"
  - Render sẽ tự động đọc cấu hình từ `render.yaml`
- **Cách 2:** Cấu hình manual:
  - Vào service settings → Environment
  - Tìm field **"Runtime"** hoặc **"Language"**
  - **Chọn `.NET` hoặc `.NET Core`** (không để mặc định)
  - Đảm bảo Root Directory là `Project`
  - Save và redeploy

#### 2. Build Failed - Các lỗi khác
**Nguyên nhân:** 
- Thiếu dependencies
- Build command sai
- Root directory sai

**Giải pháp:**
- Kiểm tra Root Directory: phải là `Project` (folder chứa `.csproj`)
- Kiểm tra Build Command: `dotnet publish -c Release -o ./publish`
- Kiểm tra Start Command: `dotnet ./publish/Project.dll`

#### 2. Database Connection Error
**Nguyên nhân:**
- Connection string sai
- Database chưa được tạo
- SSL mode không đúng

**Giải pháp:**
- Kiểm tra Connection String trong Environment Variables
- Đảm bảo connection string có `?sslmode=require`
- Test connection string bằng pgAdmin hoặc psql

#### 3. CORS Error
**Nguyên nhân:**
- Frontend URL chưa được thêm vào CORS allowed origins

**Giải pháp:**
- Thêm `Cors__AllowedOrigins__0` với giá trị là frontend URL
- Redeploy backend service

### Lỗi Frontend

#### 1. Build Failed trên Vercel
**Nguyên nhân:**
- Root Directory sai
- Thiếu dependencies
- TypeScript errors

**Giải pháp:**
- Kiểm tra Root Directory: phải là `Project/frontend`
- Kiểm tra `package.json` có đầy đủ dependencies
- Fix TypeScript errors nếu có

#### 2. API Connection Error
**Nguyên nhân:**
- `NEXT_PUBLIC_API_URL` chưa được set
- Backend URL sai
- CORS chưa được cấu hình

**Giải pháp:**
- Kiểm tra Environment Variable `NEXT_PUBLIC_API_URL`
- Đảm bảo URL có format: `https://your-backend-url.onrender.com/api`
- Kiểm tra CORS trên backend

#### 3. Environment Variable không hoạt động
**Nguyên nhân:**
- Thiếu prefix `NEXT_PUBLIC_`
- Chưa redeploy sau khi thêm biến

**Giải pháp:**
- Đảm bảo biến có prefix `NEXT_PUBLIC_`
- Redeploy frontend sau khi thêm/sửa biến

### Lỗi Chung

#### 1. Service không hoạt động sau khi deploy
**Giải pháp:**
- Kiểm tra logs trên Render/Vercel dashboard
- Kiểm tra Environment Variables
- Kiểm tra build logs để tìm lỗi

#### 2. Database không có dữ liệu
**Giải pháp:**
- Kiểm tra xem database đã được tạo chưa
- Kiểm tra connection string
- Test tạo post mới qua Swagger UI

---

## 📝 Checklist Sau Khi Deploy

- [ ] Backend đã deploy thành công trên Render
- [ ] Backend URL hoạt động và có thể truy cập Swagger
- [ ] Database đã kết nối thành công
- [ ] Frontend đã deploy thành công trên Vercel
- [ ] Frontend URL hoạt động
- [ ] CORS đã được cấu hình đúng
- [ ] Environment variables đã được set đúng
- [ ] Test tất cả tính năng: Create, Read, Update, Delete
- [ ] Test search và sort
- [ ] Test trên mobile (responsive)

---

## 🔗 Links Cần Lưu Lại

Sau khi deploy xong, lưu lại các links sau:

1. **GitHub Repository:**
   ```
   https://github.com/your-username/your-repo-name
   ```

2. **Backend URL (Render):**
   ```
   https://your-backend-url.onrender.com
   ```

3. **Frontend URL (Vercel):**
   ```
   https://your-frontend-url.vercel.app
   ```

4. **Swagger UI:**
   ```
   https://your-backend-url.onrender.com/swagger
   ```

---

## 💡 Tips

1. **Free Tier Limitations:**
   - Render: Service sẽ "sleep" sau 15 phút không có traffic (free tier)
   - Vercel: Không có giới hạn sleep, nhưng có giới hạn bandwidth
   - NeonDB: Có giới hạn storage và connections

2. **Tối Ưu Performance:**
   - Sử dụng connection pooling cho database
   - Enable caching nếu có thể
   - Optimize images và assets

3. **Monitoring:**
   - Sử dụng Render/Vercel logs để monitor
   - Set up alerts nếu có thể
   - Monitor database usage trên NeonDB

4. **Backup:**
   - Backup database định kỳ
   - Lưu lại environment variables
   - Document các cấu hình quan trọng

---

**Chúc bạn deploy thành công! 🎉**

