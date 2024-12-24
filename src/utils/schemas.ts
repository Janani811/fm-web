import { z } from 'zod';

// Login schema
export const loginSchema = z.object({
  us_email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('Not a valid email address.'),
  us_password: z.string().min(1, {
    message: 'Password must be at least 1 characters.',
  }),
});

// Signup schema
export const signupSchema = z
  .object({
    us_email: z
      .string()
      .min(1, { message: 'Email should not be empty' })
      .email('Not a valid email address.'),
    us_password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    us_confirm_password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  })
  .refine((data) => data.us_password === data.us_confirm_password, {
    message: "Passwords don't match",
    path: ['us_confirm_password'],
  });
