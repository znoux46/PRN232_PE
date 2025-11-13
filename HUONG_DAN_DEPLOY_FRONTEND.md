# 🎨 Hướng Dẫn Deploy Frontend lên Vercel

## 📋 Mục Lục
1. [Chuẩn Bị](#chuẩn-bị)
2. [Tạo Project trên Vercel](#tạo-project-trên-vercel)
3. [Cấu Hình Environment Variables](#cấu-hình-environment-variables)
4. [Deploy và Test](#deploy-và-test)
5. [Cập Nhật CORS trên Backend](#cập-nhật-cors-trên-backend)

---

## 🔧 Chuẩn Bị

### Yêu Cầu:
- ✅ Code đã được push lên GitHub
- ✅ Backend đã deploy thành công trên Render
- ✅ Backend URL: `https://prn232-pe.onrender.com` (hoặc URL của bạn)
- ✅ Tài khoản Vercel (miễn phí): https://vercel.com

### Checklist:
- [ ] Đã có tài khoản Vercel
- [ ] Đã có Backend URL từ Render
- [ ] Code frontend đã push lên GitHub

---

## 🚀 Bước 1: Tạo Project trên Vercel

### 1.1. Đăng Nhập Vercel

1. Truy cập: https://vercel.com
2. Đăng nhập bằng GitHub account (khuyến nghị)
3. Cho phép Vercel truy cập GitHub repositories

### 1.2. Import Project

1. Click **"Add New..."** → **"Project"**
2. Tìm và chọn repository: `znoux46/PRN232_PE`
3. Click **"Import"**

### 1.3. Cấu Hình Project

Điền thông tin:

| Field | Giá Trị | Ghi Chú |
|-------|---------|---------|
| **Project Name** | `post-management-app` hoặc `prn232-frontend` | Tên bạn muốn |
| **Framework Preset** | `Next.js` | Vercel tự động detect |
| **Root Directory** | `Project/frontend` | ⚠️ **QUAN TRỌNG!** |
| **Build Command** | `npm run build` | Để mặc định |
| **Output Directory** | `.next` | Để mặc định |
| **Install Command** | `npm install` | Để mặc định |

⚠️ **QUAN TRỌNG:** Root Directory phải là `Project/frontend` (không phải root!)

---

## ⚙️ Bước 2: Cấu Hình Environment Variables

### 2.1. Thêm Environment Variable

Trong phần **"Environment Variables"**, click **"Add"** và thêm:

| Variable Name | Value | Ghi Chú |
|---------------|-------|---------|
| `NEXT_PUBLIC_API_URL` | `https://prn232-pe.onrender.com/api` | ⚠️ **PHẢI CÓ `/api` ở cuối!** |

⚠️ **Lưu ý:**
- Phải có prefix `NEXT_PUBLIC_` để biến có thể truy cập từ client-side
- URL phải có `/api` ở cuối (không phải chỉ domain)
- Thay `prn232-pe.onrender.com` bằng backend URL thực tế của bạn

### 2.2. Kiểm Tra Environment Variables

Đảm bảo:
- ✅ `NEXT_PUBLIC_API_URL` = `https://your-backend-url.onrender.com/api`
- ✅ Không có biến nào khác cần thiết (frontend đã cấu hình đúng)

---

## 🚀 Bước 3: Deploy

### 3.1. Click Deploy

1. Kiểm tra lại tất cả cấu hình
2. Click nút **"Deploy"** ở cuối trang
3. Vercel sẽ bắt đầu:
   - Install dependencies (`npm install`)
   - Build Next.js app (`npm run build`)
   - Deploy lên CDN

### 3.2. Đợi Deploy Hoàn Thành

- Thời gian: 2-5 phút
- Bạn có thể xem logs real-time
- Khi deploy xong, bạn sẽ thấy:
  - Status: **"Ready"**
  - URL: `https://your-project-name.vercel.app`

### 3.3. Lấy Frontend URL

1. Copy URL frontend (ví dụ: `https://post-management-app.vercel.app`)
2. **Lưu lại** URL này để cấu hình CORS trên backend

---

## ✅ Bước 4: Test Frontend

### 4.1. Truy Cập Frontend URL

Mở trình duyệt và truy cập:
```
https://your-frontend-url.vercel.app
```

### 4.2. Kiểm Tra

- ✅ Trang chủ hiển thị
- ✅ Có thể xem danh sách posts (nếu có)
- ✅ Có thể tạo post mới
- ✅ Có thể edit/delete posts

### 4.3. Kiểm Tra Console (Nếu Có Lỗi)

1. Mở **Developer Tools** (F12)
2. Xem tab **Console** và **Network**
3. Kiểm tra:
   - CORS errors
   - API connection errors
   - Environment variable errors

---

## 🔧 Bước 5: Cập Nhật CORS trên Backend

Sau khi có Frontend URL, cần cập nhật CORS trên Render để frontend có thể gọi API.

### 5.1. Vào Render Dashboard

1. Vào **Render Dashboard** → Service `PRN232_PE`
2. Vào **Environment** → **Environment Variables**

### 5.2. Thêm CORS Environment Variable

Thêm biến mới:

| Key | Value |
|-----|-------|
| `Cors__AllowedOrigins__0` | `https://your-frontend-url.vercel.app` |

⚠️ **Lưu ý:**
- Format: `Cors__AllowedOrigins__0` (2 dấu gạch dưới `__`)
- Value: Frontend URL từ Vercel (có `https://`)
- Nếu có nhiều frontend URLs, thêm `Cors__AllowedOrigins__1`, `Cors__AllowedOrigins__2`, etc.

### 5.3. Save và Redeploy

1. Click **"Save Changes"**
2. Render sẽ tự động **redeploy** service
3. Đợi 2-5 phút để redeploy xong

### 5.4. Test CORS

Sau khi redeploy, test lại frontend:
- ✅ Không còn CORS errors trong console
- ✅ API calls thành công
- ✅ Có thể CRUD posts

---

## 📋 Checklist Hoàn Thành

### Frontend:
- [ ] Đã tạo project trên Vercel
- [ ] Root Directory = `Project/frontend`
- [ ] Environment Variable `NEXT_PUBLIC_API_URL` đã được set
- [ ] Deploy thành công
- [ ] Frontend URL hoạt động

### Backend CORS:
- [ ] Đã thêm `Cors__AllowedOrigins__0` với frontend URL
- [ ] Backend đã redeploy
- [ ] Không còn CORS errors

### Test:
- [ ] Frontend hiển thị đúng
- [ ] Có thể xem danh sách posts
- [ ] Có thể tạo post mới
- [ ] Có thể edit post
- [ ] Có thể delete post
- [ ] Search và Sort hoạt động

---

## 🐛 Troubleshooting

### Lỗi Frontend

#### 1. Build Failed
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
- URL sai format (thiếu `/api`)
- Backend chưa hoạt động

**Giải pháp:**
- Kiểm tra Environment Variable `NEXT_PUBLIC_API_URL`
- Đảm bảo URL có format: `https://backend-url.onrender.com/api`
- Kiểm tra backend có hoạt động không

#### 3. CORS Error
**Nguyên nhân:**
- Frontend URL chưa được thêm vào CORS trên backend

**Giải pháp:**
- Thêm `Cors__AllowedOrigins__0` với frontend URL trên Render
- Redeploy backend

### Lỗi Backend CORS

#### 1. CORS Vẫn Lỗi Sau Khi Thêm
**Giải pháp:**
- Kiểm tra format: `Cors__AllowedOrigins__0` (2 dấu gạch dưới)
- Đảm bảo frontend URL có `https://`
- Kiểm tra backend đã redeploy chưa
- Xem logs trên Render để debug

---

## 🔗 Links Cần Lưu

Sau khi deploy xong, lưu lại:

1. **Frontend URL (Vercel):**
   ```
   https://your-frontend-url.vercel.app
   ```

2. **Backend URL (Render):**
   ```
   https://prn232-pe.onrender.com
   ```

3. **Swagger UI:**
   ```
   https://prn232-pe.onrender.com/swagger
   ```

4. **GitHub Repository:**
   ```
   https://github.com/znoux46/PRN232_PE
   ```

---

## ✅ Sau Khi Hoàn Thành

Bạn sẽ có:
- ✅ **Frontend:** Deploy trên Vercel, hoạt động đầy đủ
- ✅ **Backend:** Deploy trên Render, API hoạt động
- ✅ **Database:** Kết nối NeonDB thành công
- ✅ **CORS:** Đã cấu hình đúng
- ✅ **Sẵn sàng:** Submit project!

**Tiếp theo:** Tạo file báo cáo và submit! 🎉


