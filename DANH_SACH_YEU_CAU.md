# 📋 Danh Sách Yêu Cầu - PRN252 Practical Exam

## 🎯 Mục Tiêu
Phát triển một ứng dụng web cho phép người dùng quản lý các bài đăng (posts). Mỗi bài đăng bao gồm: tên, mô tả và hình ảnh.

---

## ✅ I. Yêu Cầu Chức Năng

### A. Trang Chính (Post List Page)

#### 1. Hiển Thị Danh Sách
- [x] ✅ **ĐẠT** - Hiển thị danh sách tất cả các bài đăng (PostList component với pagination)
- [x] ✅ **ĐẠT** - Mỗi bài đăng hiển thị đầy đủ thông tin:
  - [x] ✅ **Name (Bắt buộc)** - Tên bài đăng (hiển thị trong PostCard)
  - [x] ✅ **Description (Bắt buộc)** - Mô tả bài đăng (hiển thị với line-clamp-3)
  - [x] ✅ **Image (Tùy chọn)** - Hiển thị hình ảnh nếu có (conditional rendering trong PostCard)

#### 2. Tính Năng Hiển Thị
- [x] ✅ **ĐẠT** - **Tìm kiếm bài đăng theo tên** - Có chức năng search (SearchBar component, search cả name và description)
- [x] ✅ **ĐẠT** - **Sắp xếp bài đăng theo tên** - Có thể sắp xếp A-Z / Z-A (SortDropdown component hỗ trợ name, createdAt, updatedAt)

### B. Tạo Bài Đăng Mới (Create a Post)

- [x] ✅ **ĐẠT** - Người dùng có thể thêm bài đăng mới (trang `/posts/new`)
- [x] ✅ **ĐẠT** - Form bao gồm các trường:
  - [x] ✅ **Name (Bắt buộc)** - Trường tên với validation (PostForm component)
  - [x] ✅ **Description (Bắt buộc)** - Trường mô tả với validation
  - [x] ✅ **Image (Tùy chọn)** - Hình ảnh (URL với preview, validation pattern)

### C. Chỉnh Sửa Bài Đăng (Edit a Post)

- [x] ⚠️ **ĐẠT MỘT PHẦN** - Click vào bài đăng sẽ điều hướng đến trang chi tiết (không phải edit), nhưng có button Edit để điều hướng đến trang edit
- [x] ✅ **ĐẠT** - Người dùng có thể chỉnh sửa:
  - [x] ✅ Tên (Name) - Form pre-populated với dữ liệu hiện tại
  - [x] ✅ Mô tả (Description) - Form pre-populated
  - [x] ✅ Hình ảnh (Image) - Form pre-populated với preview
- [x] ✅ **ĐẠT** - Sau khi lưu, tự động chuyển hướng về trang danh sách bài đăng (router.push('/') sau khi update thành công)

### D. Xóa Bài Đăng (Delete a Post)

- [x] ✅ **ĐẠT** - Người dùng có thể xóa bài đăng (có button Delete trong PostCard và PostDetailPage)
- [x] ✅ **ĐẠT** - Hiển thị hộp thoại xác nhận trước khi xóa (window.confirm với message hiển thị tên post)

---

## ✅ II. Triển Khai và Quản Lý Mã Nguồn

### A. GitHub Repository
- [ ] ❌ **CHƯA XÁC ĐỊNH** - Dự án được push lên GitHub repository công khai (public) - Không thấy link GitHub trong README
- [x] ✅ **ĐẠT** - Repository có tên và mô tả phù hợp - Có README.md chi tiết
- [x] ✅ **ĐẠT** - Code được tổ chức rõ ràng, có README.md - Cấu trúc tốt với Controllers, Services, Repositories, Models, DTOs

### B. Triển Khai Ứng Dụng (Deployment)
- [ ] ❌ **CHƯA XÁC ĐỊNH** - Ứng dụng được deploy lên nền tảng hosting miễn phí:
  - [ ] ❌ Frontend: Vercel, Render, hoặc Railway - Không thấy config file hoặc link deploy
  - [ ] ❌ Backend: Render, Railway, hoặc Vercel - Không thấy config file hoặc link deploy
- [x] ✅ **ĐẠT** - Sử dụng database miễn phí nếu cần:
  - [x] ✅ PostgreSQL với NeonDB được đề cập trong README (hướng dẫn deployment)
- [ ] ❌ **CHƯA XÁC ĐỊNH** - Ứng dụng hoạt động ổn định trên môi trường production - Cần kiểm tra thực tế

---

## ✅ III. Báo Cáo (Report)

### A. File Báo Cáo
- [ ] ❌ **CHƯA CÓ** - Tạo file `.doc` hoặc `.docx` - Không thấy file báo cáo trong project
- [ ] ❌ **CHƯA CÓ** - Đặt tên file: `QE123456_Exam.docx` (thay 123456 bằng Student ID thực tế)

### B. Nội Dung Báo Cáo
- [ ] ❌ **CHƯA CÓ** - **GitHub repository link** - Link công khai đến repository
- [ ] ❌ **CHƯA CÓ** - **Deployed website link** - Link đến website đã deploy
- [ ] ❌ **CHƯA CÓ** - **Báo cáo ngắn** - Mô tả các tính năng đã triển khai
- [ ] ❌ **CHƯA CÓ** - **Screenshot** - Ít nhất một ảnh chụp màn hình tính năng đang hoạt động
- [x] ✅ **ĐẠT** - **Hướng dẫn chạy ứng dụng** - Các bước để chạy app trên máy local (có trong README.md)

---

## ✅ IV. Yêu Cầu Kỹ Thuật

### A. Backend
- [x] ✅ **ĐẠT** - API RESTful hoạt động đúng (PostsController với các endpoint chuẩn REST)
- [x] ✅ **ĐẠT** - Xử lý CRUD đầy đủ (Create, Read, Update, Delete) - Đầy đủ 5 endpoints
- [x] ✅ **ĐẠT** - Validation dữ liệu đầu vào (FluentValidation với CreatePostDtoValidator, UpdatePostDtoValidator)
- [x] ✅ **ĐẠT** - Xử lý lỗi (error handling) - Try-catch với logging và error response chuẩn
- [x] ✅ **ĐẠT** - CORS được cấu hình đúng cho frontend (có trong Program.cs, có hướng dẫn trong README)

### B. Frontend
- [x] ✅ **ĐẠT** - Giao diện người dùng (UI) hoàn chỉnh - Modern UI với Tailwind CSS, animations
- [x] ✅ **ĐẠT** - Responsive design (hiển thị tốt trên mobile/tablet/desktop) - Sử dụng Tailwind responsive classes (sm:, md:, lg:)
- [x] ✅ **ĐẠT** - Xử lý trạng thái loading (Loading states với Loader2 icon và skeleton screens)
- [x] ✅ **ĐẠT** - Xử lý lỗi và hiển thị thông báo phù hợp (Error handling với toast notifications và error messages)
- [x] ✅ **ĐẠT** - Form validation phía client (React Hook Form với validation rules, hiển thị lỗi real-time)

### C. Database
- [x] ✅ **ĐẠT** - Database schema được thiết kế phù hợp (Post model với các field đúng yêu cầu, có constraints)
- [x] ✅ **ĐẠT** - Kết nối database ổn định (Entity Framework Core với PostgreSQL, có ApplicationDbContext)
- [x] ✅ **ĐẠT** - Migration/seed data nếu cần (EF Core EnsureCreated, có hướng dẫn trong README)

---

## 📊 Tự Chấm Điểm

### Cách Tính Điểm

| Hạng Mục | Điểm Tối Đa | Điểm Đạt | Ghi Chú |
|----------|-------------|----------|---------|
| **I. Yêu Cầu Chức Năng** | **50 điểm** | **48 điểm** | **96%** |
| A. Trang Chính | 15 điểm | 15 điểm | ✅ Hoàn thành đầy đủ |
| - Hiển thị danh sách đầy đủ | 5 điểm | 5 điểm | ✅ Có pagination, hiển thị đầy đủ thông tin |
| - Tìm kiếm theo tên | 5 điểm | 5 điểm | ✅ Search cả name và description, có debounce |
| - Sắp xếp A-Z/Z-A | 5 điểm | 5 điểm | ✅ Sắp xếp theo name, createdAt, updatedAt |
| B. Tạo Bài Đăng | 10 điểm | 10 điểm | ✅ Hoàn thành đầy đủ |
| - Form tạo bài đăng | 5 điểm | 5 điểm | ✅ Form đầy đủ với image preview |
| - Validation và lưu dữ liệu | 5 điểm | 5 điểm | ✅ Client + server validation |
| C. Chỉnh Sửa Bài Đăng | 10 điểm | 9 điểm | ⚠️ Click vào post đi đến detail, không phải edit |
| - Điều hướng và form chỉnh sửa | 5 điểm | 4 điểm | ⚠️ Có button Edit nhưng không click trực tiếp vào post |
| - Lưu và chuyển hướng | 5 điểm | 5 điểm | ✅ Redirect về list sau khi save |
| D. Xóa Bài Đăng | 5 điểm | 5 điểm | ✅ Hoàn thành đầy đủ |
| - Chức năng xóa | 3 điểm | 3 điểm | ✅ Có trong PostCard và DetailPage |
| - Xác nhận trước khi xóa | 2 điểm | 2 điểm | ✅ window.confirm với message |
| **II. Triển Khai** | **20 điểm** | **10 điểm** | **50%** |
| - GitHub Repository | 5 điểm | 0 điểm | ❌ Không thấy link GitHub |
| - Deploy Frontend | 5 điểm | 0 điểm | ❌ Chưa xác định được |
| - Deploy Backend | 5 điểm | 0 điểm | ❌ Chưa xác định được |
| - Database (nếu cần) | 5 điểm | 5 điểm | ✅ PostgreSQL, có hướng dẫn NeonDB |
| **III. Báo Cáo** | **20 điểm** | **2 điểm** | **10%** |
| - File báo cáo đúng format | 5 điểm | 0 điểm | ❌ Chưa có file báo cáo |
| - GitHub link | 3 điểm | 0 điểm | ❌ Chưa có |
| - Deployed link | 3 điểm | 0 điểm | ❌ Chưa có |
| - Mô tả tính năng | 5 điểm | 0 điểm | ❌ Chưa có |
| - Screenshot | 2 điểm | 0 điểm | ❌ Chưa có |
| - Hướng dẫn chạy local | 2 điểm | 2 điểm | ✅ Có trong README.md |
| **IV. Chất Lượng Code** | **10 điểm** | **9 điểm** | **90%** |
| - Code sạch, có cấu trúc | 3 điểm | 3 điểm | ✅ Repository pattern, Service layer, DTOs |
| - Xử lý lỗi tốt | 2 điểm | 2 điểm | ✅ Try-catch, logging, error responses |
| - UI/UX đẹp, dễ sử dụng | 3 điểm | 3 điểm | ✅ Modern UI, animations, responsive |
| - Performance tốt | 2 điểm | 1 điểm | ✅ Có pagination, debounce search, nhưng chưa test thực tế |
| **TỔNG CỘNG** | **100 điểm** | **69 điểm** | **69%** |

---

## 📝 Ghi Chú Tự Đánh Giá

### Điểm Mạnh:
- ✅ **Code chất lượng cao**: Sử dụng Repository pattern, Service layer, DTOs, AutoMapper, FluentValidation
- ✅ **UI/UX tốt**: Modern design với Tailwind CSS, animations, responsive, loading states
- ✅ **Tính năng đầy đủ**: CRUD hoàn chỉnh, search, sort, pagination, validation
- ✅ **Error handling tốt**: Xử lý lỗi đầy đủ ở cả frontend và backend
- ✅ **Documentation**: README.md chi tiết với hướng dẫn setup và deployment

### Điểm Cần Cải Thiện:
- ❌ **Thiếu GitHub repository link**: Cần push code lên GitHub và thêm link vào README
- ❌ **Chưa deploy**: Cần deploy frontend (Vercel) và backend (Render) và thêm links
- ❌ **Thiếu file báo cáo**: Cần tạo file QE123456_Exam.docx với đầy đủ thông tin
- ⚠️ **Navigation**: Click vào post đi đến detail page thay vì edit page (có thể cải thiện UX)
- ❌ **Thiếu screenshots**: Cần chụp màn hình các tính năng để đưa vào báo cáo

### Tính Năng Bổ Sung (Nếu có):
- ✅ **Pagination**: Không yêu cầu nhưng đã implement (tốt)
- ✅ **Search mở rộng**: Search cả name và description (tốt hơn yêu cầu)
- ✅ **Sort mở rộng**: Sort theo createdAt, updatedAt (ngoài yêu cầu)
- ✅ **Image preview**: Preview hình ảnh khi nhập URL (UX tốt)
- ✅ **Toast notifications**: Thông báo thành công/lỗi (UX tốt)
- ✅ **Post detail page**: Trang chi tiết bài đăng (không yêu cầu nhưng hữu ích)

### Vấn Đề Gặp Phải:
- ⚠️ **Yêu cầu "Click vào post điều hướng đến edit"**: Hiện tại click vào post đi đến detail page, cần click button Edit mới vào edit page. Có thể cải thiện bằng cách thêm option click vào card để edit trực tiếp.
- ❌ **Chưa có deployment**: Cần hoàn thành deployment để có link demo
- ❌ **Chưa có báo cáo**: Cần tạo file báo cáo theo format yêu cầu 

---

## ✅ Checklist Hoàn Thành

- [x] ✅ Đã hoàn thành tất cả yêu cầu chức năng (96% - thiếu navigation click vào post để edit)
- [ ] ❌ Đã deploy frontend lên hosting - **CẦN LÀM**
- [ ] ❌ Đã deploy backend lên hosting - **CẦN LÀM**
- [ ] ❌ Đã push code lên GitHub (public) - **CẦN LÀM**
- [ ] ❌ Đã tạo file báo cáo với đầy đủ thông tin - **CẦN LÀM**
- [x] ✅ Đã test toàn bộ tính năng (có thể test thêm trên production)
- [x] ✅ Đã kiểm tra responsive design (code có responsive classes)
- [x] ✅ Đã kiểm tra xử lý lỗi (có error handling đầy đủ)

---

**Ngày Đánh Giá:** 29/10/2025

**Tổng Điểm Tự Chấm:** **69 điểm** / 100 điểm (69%)

---

## 📌 Tóm Tắt Đánh Giá

### ✅ Đã Hoàn Thành (69 điểm):
- **Yêu cầu chức năng**: 48/50 điểm (96%) - Gần như hoàn hảo
- **Chất lượng code**: 9/10 điểm (90%) - Code rất tốt
- **Database**: 5/5 điểm (100%) - Setup đúng

### ❌ Cần Hoàn Thành (31 điểm):
- **GitHub Repository**: 0/5 điểm - **CẦN PUSH CODE LÊN GITHUB**
- **Deploy Frontend**: 0/5 điểm - **CẦN DEPLOY LÊN VERCEL**
- **Deploy Backend**: 0/5 điểm - **CẦN DEPLOY LÊN RENDER**
- **File báo cáo**: 0/5 điểm - **CẦN TẠO FILE BÁO CÁO**
- **Nội dung báo cáo**: 0/13 điểm - **CẦN ĐIỀN ĐẦY ĐỦ THÔNG TIN**

### 🎯 Hành Động Tiếp Theo:
1. **Push code lên GitHub** và thêm link vào README
2. **Deploy frontend** lên Vercel và lấy link
3. **Deploy backend** lên Render và lấy link
4. **Tạo file báo cáo** QE123456_Exam.docx với:
   - GitHub link
   - Deployed website link
   - Mô tả tính năng
   - Screenshots
   - Hướng dẫn chạy local (đã có trong README)
5. **Cải thiện navigation** (tùy chọn): Cho phép click vào post để edit trực tiếp

