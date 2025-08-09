import { supabase } from './supabase';

export interface FormSubmissionData {
  name: string;
  email: string;
  services: string[];
  message?: string;
  submitted_at: string;
}

export interface EnquiryRecord extends FormSubmissionData {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface SubmissionResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

/**
 * Submit form data to Supabase
 */
export async function submitFormData(formData: FormSubmissionData): Promise<SubmissionResult> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: 'Please enter a valid email address'
      };
    }

    // Validate required fields
    if (!formData.name.trim()) {
      return {
        success: false,
        error: 'Name is required'
      };
    }

    if (!formData.services || formData.services.length === 0) {
      return {
        success: false,
        error: 'Please select at least one service'
      };
    }

    // Submit to Supabase Enquiry table
    const { data, error } = await supabase
      .from('Enquiry')
      .insert([formData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit form'
      };
    }

    console.log('Form submitted successfully:', data);
    
    // Optional: Trigger email notification
    try {
      await sendNotificationEmail(formData);
    } catch (emailError) {
      console.warn('Email notification failed:', emailError);
      // Don't fail the whole submission if email fails
    }

    return {
      success: true,
      data: data
    };

  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

/**
 * Get all enquiries (for admin dashboard)
 */
export async function getFormSubmissions() {
  try {
    const { data, error } = await supabase
      .from('Enquiry')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch enquiries'
    };
  }
}

/**
 * Optional: Send notification email (you'd need to implement this with your preferred service)
 */
async function sendNotificationEmail(formData: FormSubmissionData) {
  // Example implementation with a service like Resend, SendGrid, or Nodemailer
  // This is just a placeholder - implement according to your email service
  
  try {
    const emailContent = `
      New form submission received!
      
      Name: ${formData.name}
      Email: ${formData.email}
      Services: ${formData.services.join(', ')}
      Message: ${formData.message || 'No message provided'}
      
      Submitted at: ${formData.submitted_at}
    `;

    // Replace with your actual email service implementation
    console.log('Email notification would be sent:', emailContent);
    
    // Example with fetch to your email API:
    // await fetch('/api/send-notification', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: 'your-email@example.com',
    //     subject: 'New Form Submission',
    //     content: emailContent
    //   })
    // });

  } catch (error) {
    console.error('Failed to send notification email:', error);
    // Don't throw here - we don't want email failures to break form submission
  }
}

/**
 * Send confirmation email to the user
 */
export async function sendConfirmationEmail(userEmail: string, userName: string) {
  try {
    const emailContent = `
      Hi ${userName},
      
      Thank you for reaching out! I've received your project details and will get back to you within 24 hours.
      
      In the meantime, feel free to check out my portfolio and recent work.
      
      Best regards,
      Aditya Mali
    `;

    // Replace with your actual email service implementation
    console.log('Confirmation email would be sent to:', userEmail, emailContent);
    
    // Example implementation:
    // await fetch('/api/send-confirmation', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: userEmail,
    //     subject: 'Thank you for your inquiry!',
    //     content: emailContent
    //   })
    // });

  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    // Don't throw here - we don't want email failures to break form submission
  }
}
