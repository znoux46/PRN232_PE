# 🔧 Fix Network Error - Frontend

## ❌ Lỗi

- "Error creating post - Network Error"
- "Error loading posts - Network Error"

## 🔍 Nguyên Nhân Có Thể

1. **CORS chưa được cấu hình** trên backend
2. **Backend URL sai** trong environment variable
3. **Backend chưa hoạt động** hoặc đang sleep
4. **Environment variable chưa được set** trên Vercel

---

## ✅ Giải Pháp

### Bước 1: Kiểm Tra Environment Variable trên Vercel

1. Vào **Vercel Dashboard** → Project của bạn
2. Vào **Settings** → **Environment Variables**
3. Kiểm tra:
   - ✅ `NEXT_PUBLIC_API_URL` đã được set
   - ✅ Value có format: `https://prn232-pe.onrender.com/api` (có `/api` ở cuối)
   - ✅ Không có khoảng trắng thừa

### Bước 2: Kiểm Tra Backend Hoạt Động

1. Truy cập backend URL trực tiếp:
   ```
   https://prn232-pe.onrender.com/api/posts
   ```
2. Nếu thấy:
   - ✅ JSON response (có thể là `[]` nếu chưa có data) → Backend hoạt động
   - ❌ Timeout hoặc lỗi → Backend đang sleep (free tier)

### Bước 3: Cấu Hình CORS trên Backend

⚠️ **QUAN TRỌNG:** Phải cấu hình CORS để frontend có thể gọi API.

1. Vào **Render Dashboard** → Service `PRN232_PE`
2. Vào **Environment** → **Environment Variables**
3. Thêm hoặc kiểm tra biến:

| Key | Value |
|-----|-------|
| `Cors__AllowedOrigins__0` | `https://your-frontend-url.vercel.app` |

⚠️ **Lưu ý:**
- Format: `Cors__AllowedOrigins__0` (2 dấu gạch dưới `__`)
- Value: Frontend URL từ Vercel (có `https://`)
- Thay `your-frontend-url.vercel.app` bằng URL thực tế

4. **Save Changes**
5. Render sẽ tự động **redeploy** (đợi 2-5 phút)

### Bước 4: Kiểm Tra Backend Logs

1. Vào **Render Dashboard** → Service → **Logs**
2. Kiểm tra:
   - ✅ Không có CORS errors
   - ✅ API requests được nhận
   - ✅ Database connection thành công

### Bước 5: Test Lại Frontend

Sau khi CORS đã được cấu hình và backend redeploy xong:

1. **Refresh** frontend page
2. **Mở Developer Tools** (F12) → Tab **Network**
3. Thử các thao tác:
   - Load posts
   - Tạo post mới
   - Edit post
   - Delete post

4. Kiểm tra:
   - ✅ Requests thành công (status 200, 201)
   - ✅ Không còn CORS errors trong console
   - ✅ Data hiển thị đúng

---

## 🐛 Troubleshooting

### Nếu Vẫn Lỗi Network Error

#### 1. Kiểm Tra Console (F12)

Mở Developer Tools → Console, tìm:
- ❌ `CORS policy: No 'Access-Control-Allow-Origin' header`
  → **Giải pháp:** CORS chưa được cấu hình đúng, kiểm tra lại Bước 3

- ❌ `Failed to fetch` hoặc `Network request failed`
  → **Giải pháp:** Backend có thể đang sleep, thử truy cập backend URL trực tiếp để wake up

- ❌ `404 Not Found` cho API calls
  → **Giải pháp:** Kiểm tra `NEXT_PUBLIC_API_URL` có đúng không

#### 2. Kiểm Tra Network Tab (F12)

1. Mở Developer Tools → **Network**
2. Thử tạo post hoặc load posts
3. Xem request:
   - **URL:** Phải là `https://prn232-pe.onrender.com/api/posts`
   - **Status:** 
     - ✅ 200, 201 = Thành công
     - ❌ 404 = URL sai
     - ❌ CORS error = CORS chưa cấu hình
     - ❌ Timeout = Backend đang sleep

#### 3. Wake Up Backend (Nếu Free Tier)

Nếu backend đang sleep (free tier sleep sau 15 phút không dùng):

1. Truy cập backend URL trực tiếp:
   ```
   https://prn232-pe.onrender.com/api/posts
   ```
2. Đợi 30-60 giây để backend wake up
3. Thử lại frontend

#### 4. Kiểm Tra Environment Variable

Đảm bảo trên Vercel:
- ✅ `NEXT_PUBLIC_API_URL` = `https://prn232-pe.onrender.com/api`
- ✅ Không có trailing slash: `/api` (không phải `/api/`)
- ✅ Có `https://` ở đầu
- ✅ Có `/api` ở cuối

---

## 📋 Checklist Fix Network Error

- [ ] Đã kiểm tra `NEXT_PUBLIC_API_URL` trên Vercel
- [ ] Backend URL hoạt động (test trực tiếp)
- [ ] Đã thêm `Cors__AllowedOrigins__0` trên Render
- [ ] Backend đã redeploy sau khi thêm CORS
- [ ] Đã test lại frontend
- [ ] Không còn CORS errors trong console
- [ ] API calls thành công (status 200/201)

---

## ✅ Sau Khi Fix

Bạn sẽ có:
- ✅ Frontend có thể load posts
- ✅ Frontend có thể tạo post mới
- ✅ Frontend có thể edit/delete posts
- ✅ Không còn Network errors
- ✅ Ứng dụng hoạt động đầy đủ

---

## 🎯 Tóm Tắt Nhanh

**Vấn đề:** Network Error khi gọi API từ frontend

**Nguyên nhân chính:** CORS chưa được cấu hình

**Giải pháp:**
1. Thêm `Cors__AllowedOrigins__0` = `https://your-frontend-url.vercel.app` trên Render
2. Đợi backend redeploy
3. Test lại frontend

**Kiểm tra:**
- Backend URL: `https://prn232-pe.onrender.com/api/posts` (phải hoạt động)
- Frontend URL: `https://your-frontend-url.vercel.app` (phải được thêm vào CORS)


