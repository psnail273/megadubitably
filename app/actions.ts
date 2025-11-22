'use server'

import { env } from 'process';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
  success: boolean;
  message: string;
} | null;

export async function sendMessage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const name = formData.get('name');
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { success: false, message: 'Name is required' };
  }

  const email = formData.get('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address' };
  }

  const message = formData.get('message');
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { success: false, message: 'Message is required' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'megadubitably@stuffworks.net',
      to: process.env.CONTACT_EMAIL as string,
      replyTo: email,
      subject: `Megadubitably Contact Form Message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    console.log(data);

    if (error) {
      console.log(error);
      return { success: false, message: 'Failed to send message. Please click the email address above to send through your email client.' };
    }

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Network error:', error);
    return { success: false, message: 'Network error. Please check your connection and try again.' };
  }
}