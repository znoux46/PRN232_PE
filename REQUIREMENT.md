🚀 Web Application Requirements (Post Management App)
The goal is to develop a web application for managing posts, where each post has a name, description, and image.

I. 💻 Technology Stack
Component	Technology	Hosting/Service
Backend (API)	.NET	Render
Frontend (UI)	Next.js	Vercel
Database	PostgreSQL	NeonDB
II. ✨ Functional Requirements
A. Main Page (Post List Page)
Display: A list of all existing posts must be displayed.

Post Details: For each post, the following details must be shown:

Name (Required)

Description (Required)

Image (Optional – display if available, e.g., via URL or upload)

Display Features: The page must include functionality to:

Search posts by name.

Sort posts by name (A → Z / Z → A).

B. Create a Post
User Action: Users must be able to add a new post.

Required Fields: The form must include fields for:

Name (Required)

Description (Required)

Image (URL or upload/optional)

C. Edit a Post
Navigation: Clicking on a post or an "Edit" button should navigate the user to an edit page.

Modification: Users should be able to modify the post's name, description, and image.

Redirect: After saving the changes, users must be redirected back to the post list page.

D. Delete a Post
User Action: Users must be able to delete a post.

Confirmation: A confirmation prompt must be shown before deletion to prevent accidental loss of data.

III. ⚙️ Deployment and Source Management
Source Control: The project must be pushed to a public GitHub repository.

Hosting: The application must be deployed online using the specified free-tier services:

Next.js Frontend on Vercel.

.NET Backend on Render.

NeonDB for the database.

IV. 📋 Report Requirements
A report document (e.g., .doc or .docx) must be created, named CE123456_Exam.docx (replacing 123456 with your actual Student ID), containing:

Project Documents:

Student ID

Repository link (public GitHub link)

Deployed website link

Short Report:

A brief report describing the features implemented.

At least one screenshot of the working feature.

Steps to run the app locally.
