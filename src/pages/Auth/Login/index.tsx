import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EyeIcon, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { authSelector, logIn } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useToast } from '@/hooks/use-toast';

import { ValidationErrors } from '@/types';
import { loginSchema } from '@/utils/schemas';

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      us_email: '',
      us_password: '',
    },
  });

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(authSelector);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState(false);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await dispatch(logIn(values)).unwrap();
      navigate('/home');
    } catch (err: unknown) {
      const knownError = err as ValidationErrors;
      if (knownError.message)
        toast({
          variant: 'destructive',
          title: knownError.message,
          duration: 2000,
        });
    }
  };

  return (
    <div className='container flex min-h-screen min-w-full items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-7 rounded-2xl border p-12 shadow-lg sm:w-3/4 md:w-3/4 lg:w-[500px] xl:max-w-screen-sm'
        >
          <div className='mb-12 flex flex-col items-center gap-3'>
            <div className='text-center text-4xl font-bold'>Welcome back</div>
            <span className='text-center text-base font-light text-gray-800'>
              Enter your credentials to access your account
            </span>
          </div>

          <div className='w-full space-y-5'>
            <FormField
              control={form.control}
              name='us_email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter email'
                      {...field}
                      type='email'
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='us_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <div className='flex items-center'>
                        <Input
                          placeholder='Enter password'
                          {...field}
                          required
                          type={passwordType ? 'text' : 'password'}
                          className='relative'
                        />
                        <button
                          type='button'
                          className='absolute right-6 top-1/2 -translate-y-1/2'
                          onClick={() => setPasswordType(!passwordType)}
                        >
                          {!passwordType ? <EyeOff /> : <EyeIcon />}
                        </button>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type='submit'
            className='mt-10 w-full py-6 text-lg'
            size='lg'
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className='animate-spin' /> : null}
            Submit
          </Button>
          <div className='flex justify-center gap-2 text-lg'>
            <div className='font-light'>Don't have an account ?</div>
            <a href='/signup' className='font-medium hover:underline'>
              Sign up
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default Login;
