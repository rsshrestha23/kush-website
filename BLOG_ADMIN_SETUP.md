# Blog Admin Panel Setup Guide

This guide will help you set up the blog admin panel with MongoDB integration for Kush Tech Nepal.

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB instance)
- Git repository cloned

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # MongoDB Connection String
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/kushtechnepal?retryWrites=true&w=majority
   
   # JWT Secret for authentication
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # Next.js Environment
   NODE_ENV=development
   ```

3. **MongoDB Setup**
   - Create a MongoDB Atlas cluster or use a local MongoDB instance.
   - Create a database named `kushtechnepal`.
   - You will need to manually create an admin user in the `admin_users` collection. Here is a sample document structure:
     ```json
     {
       "username": "admin",
       "email": "admin@example.com",
       "password": "<bcrypt-hashed-password>",
       "role": "admin",
       "createdAt": "ISODate(...)",
       "updatedAt": "ISODate(...)"
     }
     ```
   - The `blogs` collection will be created automatically.

## Getting Started

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Access Admin Panel**
   - Go to `http://localhost:3000/admin/login`
   - Login with the admin credentials you created in your database.
   - You'll be redirected to the admin dashboard.

## Features

### Admin Panel Features
- **Dashboard**: Overview of blog statistics
- **Blog Management**: Create, edit, delete, and publish blogs
- **User Authentication**: Secure login with JWT tokens
- **Rich Text Editor**: Easy-to-use blog content editor
- **Tag Management**: Add and manage blog tags
- **Publish/Draft**: Toggle between published and draft status
- **SEO-friendly URLs**: Automatic slug generation from titles

### Public Blog Features
- **SSR (Server-Side Rendering)**: Fast loading and SEO optimized
- **Responsive Design**: Works on all devices
- **Tag Filtering**: Browse blogs by tags
- **Author Information**: Display author details
- **Featured Images**: Support for blog cover images
- **Clean URLs**: SEO-friendly blog post URLs

## File Structure

```
src/
├── app/
│   ├── admin/                 
│   │   ├── (main)/           # Protected admin routes with sidebar layout
│   │   └── login/            # Admin login page (no sidebar)
│   ├── blog/                 # Public blog routes
│   │   ├── page.tsx          # Blog listing
│   │   └── [slug]/           # Individual blog posts
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   └── blogs/            # Blog CRUD operations
├── components/
│   └── admin/                # Admin components
│   └── ui/                   # UI components including the new sidebar
├── lib/                      # Utilities
│   ├── mongodb.ts            # Database connection
│   └── auth.ts               # Authentication utilities
└── types/
    └── blog.ts               # TypeScript interfaces
```

## Usage

### Creating a New Blog
1. Login to admin panel.
2. Click "New Blog" or navigate to `/admin/blogs/new`.
3. Fill in the blog details.
4. Click "Create Blog".

### Editing a Blog
1. Go to `/admin/blogs`.
2. Click the edit icon next to any blog.
3. Make your changes.
4. Click "Update Blog".

## Security Features

- **JWT Authentication**: Secure token-based authentication.
- **Password Hashing**: Bcrypt password encryption for user credentials.
- **Protected Routes**: Admin routes are protected and require a valid login.
- **Input Validation**: Basic form validation is in place.
- **CSRF Protection**: Relies on Next.js's built-in protections. 