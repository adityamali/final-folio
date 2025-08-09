# Enquiry Form System

A complete enquiry form system built with TypeformStyleForm, Supabase, and proper error handling.

## 🚀 Features

- **TypeformStyleForm**: Beautiful on2. **Loading state**: Visual feedback during submission
3. **Data processing**: Automatic type conversion and validation
4. **Supabase storage**: Data saved to `Enquiry` table
5. **Email notification**: Optional email triggers (to implement)
6. **Success feedback**: User sees confirmation screenstion-at-a-time form interface
- **Supabase Integration**: Automatic data storage in PostgreSQL "Enquiry" table
- **Error Handling**: Comprehensive validation and error management
- **Loading States**: Visual feedback during submission
- **Success/Error Feedback**: User-friendly status messages
- **Admin Dashboard**: View and manage enquiry submissions
- **TypeScript Support**: Fully typed for better development experience
- **Email Notifications**: Ready-to-implement email system

## 📁 Files Structure

```
src/
├── components/
│   ├── forms/
│   │   └── RegistrationForm.tsx     # Main form component
│   ├── admin/
│   │   └── AdminDashboard.tsx       # Admin panel to view submissions
│   ├── providers/
│   │   └── FormProvider.tsx         # Form state management
│   └── ui/
│       ├── FormBuilder.tsx          # TypeformStyleForm component
│       └── Button.tsx               # Reusable button component
├── lib/
│   ├── formSubmission.ts            # Enquiry submission utilities
│   └── supabase.ts                  # Supabase client configuration
└── app/
    ├── form-demo/
    │   └── page.tsx                 # Form demo page
    └── admin/
        └── page.tsx                 # Admin dashboard page

supabase-setup.sql                   # Database setup script
```

## 🛠️ Setup Instructions

### 1. Database Setup

Run the SQL script in your Supabase SQL Editor:

```sql
-- Copy and paste the content from supabase-setup.sql
```

This creates:
- `Enquiry` table with proper schema
- Indexes for performance
- Row Level Security (RLS) policies
- Automatic timestamp updates
- Compatibility with existing "Enquiry" tables

### 2. Environment Variables

Make sure you have these in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Form Usage

```tsx
import FormProvider from '../providers/FormProvider';
import FormBuilder from '../ui/FormBuilder';

const MyForm = () => {
  const fields = [
    {
      id: 'name',
      type: 'text',
      question: "What's your name?",
      required: true,
    },
    // ... more fields
  ];

  const handleSubmit = async (values) => {
    // Form submission is handled automatically
    console.log('Form submitted:', values);
  };

  return (
    <FormProvider>
      <FormBuilder
        fields={fields}
        onSubmit={handleSubmit}
        title="Your Form Title"
        description="Your description"
      />
    </FormProvider>
  );
};
```

## 📝 Form Fields

The system supports multiple field types:

### Text Input
```tsx
{
  id: 'name',
  type: 'text',
  question: "What's your name?",
  placeholder: 'John Doe',
  required: true,
}
```

### Email Input
```tsx
{
  id: 'email',
  type: 'email',
  question: "What's your email?",
  placeholder: 'john@example.com',
  required: true,
}
```

### Textarea
```tsx
{
  id: 'message',
  type: 'textarea',
  question: 'Tell us more',
  placeholder: 'Your message...',
  required: false,
}
```

### Single Select
```tsx
{
  id: 'service',
  type: 'select',
  question: 'Which service?',
  options: ['Web Dev', 'Mobile App', 'Design'],
  required: true,
}
```

### Multi Select
```tsx
{
  id: 'technologies',
  type: 'multiselect',
  question: 'Technologies?',
  options: ['React', 'Node.js', 'Python'],
  required: true,
}
```

### Rating
```tsx
{
  id: 'satisfaction',
  type: 'rating',
  question: 'How excited are you?',
  required: false,
}
```

## 🔧 Form Submission Flow

1. **User fills form**: TypeformStyleForm interface
2. **Validation**: Client-side validation with error display
3. **Loading state**: Visual feedback during submission
4. **Data processing**: Automatic type conversion and validation
5. **Supabase storage**: Data saved to `form_submissions` table
6. **Email notification**: Optional email triggers (to implement)
7. **Success feedback**: User sees confirmation screen

## 📊 Admin Dashboard

Access the admin dashboard at `/admin` to:

- View all enquiry submissions
- See enquiry details (name, email, services, message)
- Filter and search enquiries
- Export data (can be implemented)

## 🔐 Security Features

- **Row Level Security**: Enabled on Supabase table
- **Input validation**: Both client and server-side
- **CSRF protection**: Built into Next.js
- **Type safety**: Full TypeScript coverage
- **Error boundaries**: Graceful error handling

## 📧 Email Integration (Optional)

The system includes placeholder functions for email notifications:

1. **Notification emails**: Alert you when enquiries are submitted
2. **Confirmation emails**: Thank users for their enquiry

To implement:

1. Choose an email service (Resend, SendGrid, Nodemailer)
2. Create API routes in `pages/api/` or `app/api/`
3. Update the email functions in `formSubmission.ts`

### Example with Resend:

```tsx
// In formSubmission.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendNotificationEmail(formData: FormSubmissionData) {
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: 'you@yourdomain.com',
    subject: 'New Enquiry Received',
    html: `
      <h2>New enquiry from ${formData.name}</h2>
      <p>Email: ${formData.email}</p>
      <p>Services: ${formData.services.join(', ')}</p>
      <p>Message: ${formData.message}</p>
    `
  });
}
```

## 🎨 Customization

### Styling
- Modify Tailwind classes in components
- Update CSS custom properties for colors
- Adjust animations and transitions

### Form Fields
- Add new field types in `FormBuilder.tsx`
- Extend the `FieldType` type
- Add validation logic

### Database Schema
- Add new columns to `Enquiry` table
- Update TypeScript interfaces
- Modify submission functions

## 🚀 Deployment

1. **Supabase**: Database is already cloud-hosted
2. **Vercel/Netlify**: Deploy your Next.js app
3. **Environment variables**: Set in deployment platform
4. **Domain setup**: Configure custom domain if needed

## 📈 Analytics & Monitoring

Consider adding:

- **Form analytics**: Track completion rates
- **Error monitoring**: Sentry or similar
- **Performance monitoring**: Web vitals
- **User feedback**: Post-enquiry surveys

## 🔍 Troubleshooting

### Common Issues:

1. **Form not submitting**:
   - Check Supabase connection
   - Verify environment variables
   - Check browser console for errors
   - Ensure "Enquiry" table exists

2. **Validation errors**:
   - Ensure required fields are filled
   - Check email format validation
   - Verify field types match expected values

3. **Database errors**:
   - Confirm "Enquiry" table exists in Supabase
   - Check RLS policies
   - Verify column names match interface

4. **Styling issues**:
   - Ensure Tailwind CSS is properly configured
   - Check CSS custom properties
   - Verify dark mode support

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify Supabase "Enquiry" table structure
3. Test with simple form first
4. Check network requests in DevTools

The system is production-ready and handles edge cases gracefully. The TypeformStyleForm provides an excellent user experience while the backend ensures reliable data storage and processing in your existing "Enquiry" table.