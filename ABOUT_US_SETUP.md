# About Us Page Setup Guide

This guide will help you customize the About Us page with your actual team members and company information.

## 📁 File Structure

```
src/app/about/page.tsx          # Main About Us page
src/components/TeamMemberCard.tsx # Reusable team member card component
public/team/                    # Directory for team member photos
```

## 🖼️ Adding Team Member Photos

1. **Place photos in the `public/team/` directory**
   - Supported formats: JPG, PNG, WebP
   - Recommended size: 400x400 pixels or larger
   - File naming: Use descriptive names (e.g., `ceo.jpg`, `cto.jpg`)

2. **Update the team member data in `src/app/about/page.tsx`**
   ```typescript
   const teamMembers = [
     {
       name: "Your Name",
       position: "Your Position",
       image: "/team/your-photo.jpg", // Update this path
       description: "Your description here...",
       linkedin: "https://linkedin.com/in/yourprofile",
       twitter: "https://twitter.com/yourhandle",
       email: "your.email@company.com"
     },
     // Add more team members...
   ];
   ```

## 👤 Customizing Team Members

### Required Fields:
- `name`: Full name of the team member
- `position`: Job title/role
- `description`: Brief description of their role and expertise

### Optional Fields:
- `image`: Path to photo (if not provided, shows initials)
- `linkedin`: LinkedIn profile URL
- `twitter`: Twitter/X profile URL
- `email`: Email address

### Example:
```typescript
{
  name: "John Smith",
  position: "Chief Technology Officer",
  image: "/team/john-smith.jpg",
  description: "Leading our technology initiatives with 10+ years of experience in software development and system architecture.",
  linkedin: "https://linkedin.com/in/johnsmith",
  twitter: "https://twitter.com/johnsmith",
  email: "john.smith@company.com"
}
```

## 🎯 Customizing Chairman's Message

Update the chairman's message in `src/app/about/page.tsx`:

```typescript
// Find this section and update the content
<p className="text-lg text-gray-300 leading-relaxed mb-6">
  "Your custom message here..."
</p>

// Update the chairman's name and title
<p className="text-xl font-semibold text-blue-400">Your Chairman Name</p>
<p className="text-gray-400">Chairman & Founder</p>
```

## 🎨 Customizing Company Values

Update the company values in the "Our Values" section:

```typescript
{[
  {
    title: "Your Value 1",
    description: "Description of your first value...",
    icon: "🚀" // You can use emojis or custom icons
  },
  {
    title: "Your Value 2", 
    description: "Description of your second value...",
    icon: "⭐"
  },
  // Add more values...
]}
```

## 🌟 Features

### Automatic Fallbacks
- If no photo is provided, the component shows initials in a styled avatar
- If a photo fails to load, it automatically falls back to initials
- Social media links are optional and only show if provided

### Responsive Design
- Mobile-first design that works on all screen sizes
- Grid layout adjusts from 1 column (mobile) to 3 columns (desktop)
- Smooth animations and hover effects

### Accessibility
- Proper alt text for images
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

## 🚀 Getting Started

1. **Add your team photos** to `public/team/`
2. **Update team member data** in `src/app/about/page.tsx`
3. **Customize the chairman's message**
4. **Update company values** if needed
5. **Test the page** by navigating to `/about`

## 📝 Notes

- The page uses placeholder data by default
- All social media links open in new tabs
- Email links use `mailto:` protocol
- The design matches your existing site's dark theme with blue/purple gradients
- Animations use Framer Motion for smooth transitions

## 🔧 Troubleshooting

**Photos not showing?**
- Check the file path in the `image` field
- Ensure the photo is in the `public/team/` directory
- Verify the file extension matches the path

**Page not loading?**
- Make sure all imports are correct
- Check that the `TeamMemberCard` component is properly imported
- Verify that the `motion` library is installed

**Styling issues?**
- Ensure Tailwind CSS is properly configured
- Check that all CSS classes are valid
- Verify responsive breakpoints are working 