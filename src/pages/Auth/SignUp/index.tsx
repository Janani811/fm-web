import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EyeIcon, EyeOff, Loader2 } from 'lucide-react';

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

import { authSelector, signUp } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useToast } from '@/hooks/use-toast';

import { ValidationErrors } from '@/types';
import { signupSchema } from '@/utils/schemas';

const Signup = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      us_email: '',
      us_password: '',
      us_confirm_password: '',
    },
  });

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(authSelector);
  const { toast } = useToast();

  const [isSignedUp, setIsSignedUp] = useState(false);
  const [passwordType, setPasswordType] = useState({
    us_password: false,
    us_confirm_password: false,
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      await dispatch(signUp(values)).unwrap();
      setIsSignedUp(true);
    } catch (err: unknown) {
      const knownError = err as ValidationErrors;
      if (knownError.error)
        toast({
          variant: 'destructive',
          title: knownError.error,
          duration: 2000,
        });
      setIsSignedUp(false);
    }
  };

  return (
    <div className='container flex min-h-screen min-w-full items-center justify-center'>
      {!isSignedUp ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-7 rounded-2xl border p-12 shadow-lg sm:w-3/4 md:w-2/4 lg:w-2/4 xl:max-w-screen-sm'
          >
            <div className='mb-12 flex flex-col items-center gap-3'>
              <div className='text-center text-4xl font-bold'>
                Create an account
              </div>
              <span className='text-center text-base font-light text-gray-800'>
                Enter your credentials to create your account
              </span>
            </div>
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
                      className='py-5'
                      type='email'
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
                          type={passwordType.us_password ? 'text' : 'password'}
                          className='relative'
                        />
                        <button
                          type='button'
                          className='absolute right-6 top-1/2 -translate-y-1/2'
                          onClick={() => {
                            setPasswordType({
                              ...passwordType,
                              us_password: !passwordType.us_password,
                            });
                          }}
                        >
                          {!passwordType.us_password ? <EyeOff /> : <EyeIcon />}
                        </button>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='us_confirm_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <div className='flex items-center'>
                        <Input
                          placeholder='Enter password'
                          {...field}
                          required
                          type={
                            passwordType.us_confirm_password
                              ? 'text'
                              : 'password'
                          }
                          className='relative'
                        />
                        <button
                          type='button'
                          className='absolute right-6 top-1/2 -translate-y-1/2'
                          onClick={() => {
                            setPasswordType({
                              ...passwordType,
                              us_confirm_password:
                                !passwordType.us_confirm_password,
                            });
                          }}
                        >
                          {!passwordType.us_confirm_password ? (
                            <EyeOff />
                          ) : (
                            <EyeIcon />
                          )}
                        </button>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              <a href='/login' className='font-medium hover:underline'>
                Login
              </a>
            </div>
          </form>
        </Form>
      ) : (
        <div className='min-w-[550px] rounded-xl shadow-xl'>
          <div className='mb-12 flex flex-col items-center gap-3 p-8'>
            <div className='text-center text-4xl font-bold'>
              Congratulations!
            </div>
            <span className='text-center text-base font-light text-gray-800'>
              Your account has been created sucessfully.
            </span>
            <div className='flex justify-center gap-2 text-lg'>
              <a
                href='/login'
                className='mt-8 rounded-3xl border border-gray-800 px-12 py-1 font-medium hover:bg-gray-800 hover:text-white'
              >
                Login
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Signup;
