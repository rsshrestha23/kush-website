# Contact Us Page Setup Guide

This guide will help you customize the Contact Us page with your actual contact information and form functionality.

## 📁 File Structure

```
src/app/contact/page.tsx    # Main Contact Us page
```

## 📞 Contact Information Sections

The page includes 4 main contact information cards:

### 1. **Location** 📍
- **Details**: Office address and location
- **Link**: Google Maps or custom map link
- **Action**: "View on Map" button

### 2. **Email** 📧
- **Details**: Multiple email addresses for different purposes
- **Link**: Mailto link for primary email
- **Action**: "Send Email" button

### 3. **Phone** 📞
- **Details**: Phone numbers and business hours
- **Link**: Tel link for direct calling
- **Action**: "Call Now" button

### 4. **Social Media** 💬
- **Details**: Social media handles
- **Link**: Primary social media profile
- **Action**: "Connect With Us" button

## 🎯 Customizing Contact Information

Update the `contactInfo` array in `src/app/contact/page.tsx`:

```typescript
const contactInfo = [
  {
    icon: "📍",
    title: "Your Location Title",
    details: [
      "Your Street Address",
      "City, Country Postal Code",
      "Additional Location Info"
    ],
    link: "https://maps.google.com/your-location",
    linkText: "View on Map"
  },
  {
    icon: "📧",
    title: "Email Us",
    details: [
      "primary@yourcompany.com",
      "support@yourcompany.com",
      "sales@yourcompany.com"
    ],
    link: "mailto:primary@yourcompany.com",
    linkText: "Send Email"
  },
  // Add more contact methods...
];
```

## 📝 Contact Form Customization

### Form Fields
The contact form includes:
- **Full Name** (required)
- **Email Address** (required)
- **Phone Number** (optional)
- **Company Name** (optional)
- **Service Interested In** (dropdown)
- **Project Details** (required)

### Service Options
Update the service dropdown options:

```typescript
<select
  id="service"
  name="service"
  value={formData.service}
  onChange={handleInputChange}
  className="..."
>
  <option value="">Select a service</option>
  <option value="web-development">Web Development</option>
  <option value="mobile-development">Mobile Development</option>
  <option value="ui-ux-design">UI/UX Design</option>
  <option value="cloud-services">Cloud Services</option>
  <option value="digital-marketing">Digital Marketing</option>
  <option value="it-consulting">IT Consulting</option>
  <option value="other">Other</option>
</select>
```

### Form Submission
Currently, the form simulates submission. To connect to a real backend:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Replace with your actual API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: ""
      });
    } else {
      setSubmitStatus("error");
    }
  } catch (error) {
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};
```

## 🗺️ Map Integration

### Google Maps Integration
Replace the map placeholder with Google Maps:

```typescript
// Install: npm install @googlemaps/js-api-loader
import { Loader } from '@googlemaps/js-api-loader';

// In your component
useEffect(() => {
  const loader = new Loader({
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    version: 'weekly',
  });

  loader.load().then(() => {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: YOUR_LAT, lng: YOUR_LNG },
      zoom: 15,
    });
    
    new google.maps.Marker({
      position: { lat: YOUR_LAT, lng: YOUR_LNG },
      map: map,
      title: 'Your Company Name',
    });
  });
}, []);
```

### Mapbox Integration
Alternative map solution:

```typescript
// Install: npm install mapbox-gl
import mapboxgl from 'mapbox-gl';

// In your component
useEffect(() => {
  mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [YOUR_LNG, YOUR_LAT],
    zoom: 15
  });
  
  new mapboxgl.Marker()
    .setLngLat([YOUR_LNG, YOUR_LAT])
    .addTo(map);
}, []);
```

## 🕒 Office Hours Customization

Update the office hours in the map section:

```typescript
<div className="space-y-2">
  <div className="flex justify-between">
    <span className="text-gray-300">Monday - Friday</span>
    <span className="text-white">9:00 AM - 6:00 PM</span>
  </div>
  <div className="flex justify-between">
    <span className="text-gray-300">Saturday</span>
    <span className="text-white">10:00 AM - 4:00 PM</span>
  </div>
  <div className="flex justify-between">
    <span className="text-gray-300">Sunday</span>
    <span className="text-white">Closed</span>
  </div>
</div>
```

## ❓ FAQ Customization

Update the FAQ section with your actual questions and answers:

```typescript
const faqs = [
  {
    question: "Your Question Here?",
    answer: "Your detailed answer here. Make it comprehensive and helpful for potential clients."
  },
  {
    question: "Another Common Question?",
    answer: "Another detailed answer that addresses client concerns and showcases your expertise."
  },
  // Add more FAQs...
];
```

## 📧 Email Integration Options

### 1. **Formspree** (Easy Setup)
```typescript
// Add to your form
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  {/* Your form fields */}
</form>
```

### 2. **EmailJS** (Client-side)
```typescript
// Install: npm install @emailjs/browser
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    await emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      e.target as HTMLFormElement,
      'YOUR_PUBLIC_KEY'
    );
    setSubmitStatus("success");
  } catch (error) {
    setSubmitStatus("error");
  }
};
```

### 3. **Custom API Route** (Next.js)
Create `pages/api/contact.ts` or `app/api/contact/route.ts`:

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Configure your email service
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'your-email@company.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Service:</strong> ${body.service}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
```

## 🎨 Styling Customization

### Color Themes
The page uses the same dark theme with blue/purple gradients. You can customize:

```typescript
// Primary gradient colors
"from-blue-400 via-purple-400 to-pink-400"

// Button gradients
"from-blue-600 to-purple-600"

// Form focus colors
"focus:border-blue-500 focus:ring-blue-500/20"
```

### Form Styling
Customize form input styles:

```typescript
className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
```

## 📱 Mobile Optimization

The page is fully responsive with:
- **Touch-friendly buttons** and form inputs
- **Optimized spacing** for mobile screens
- **Readable text sizes** on all devices
- **Simplified layout** on smaller screens

## 🔧 Troubleshooting

**Form not submitting?**
- Check form validation
- Verify API endpoint configuration
- Check browser console for errors
- Ensure all required fields are filled

**Map not showing?**
- Verify API key is correct
- Check API key restrictions
- Ensure map container has proper dimensions
- Check for JavaScript errors

**Styling issues?**
- Verify Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Ensure responsive breakpoints are working

## 🚀 Getting Started

1. **Update contact information** with your actual details
2. **Configure form submission** to your preferred method
3. **Add map integration** with your location
4. **Customize office hours** and FAQ content
5. **Test the form** to ensure it works properly
6. **Add your branding** and customize colors if needed

## 📝 Notes

- The form includes client-side validation
- Success/error messages are displayed to users
- All links open in new tabs for better UX
- The page is SEO-friendly with semantic HTML
- Animations use Framer Motion for smooth transitions 