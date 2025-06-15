import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { signInUser, isLoading, setIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setIsLoading(true);
      await signInUser(email, password);
      toast.success('User login successfully!');
      navigate('/flowchart');
    } catch (error) {
      toast.error(error.message || 'Login failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className='min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-tr from-white via-blue-50 to-blue-100'
      style={{ fontFamily: 'var(--font-secondary)' }}
    >
      <div className='container max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden'>
        {/* Left: Image */}
        <div className='hidden md:block md:w-1/2 p-12'>
          <img
            src='/login-image.png'
            alt='Login Visual'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Right: Form */}
        <div className='w-full md:w-1/2 p-10 flex flex-col justify-center'>
          <h2 className='text-3xl font-extrabold text-[#19398A] text-center mb-10'>
            Login to your account
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className='space-y-6'
          >
            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-semibold text-gray-700'
              >
                Email Address
              </label>
              <input
                id='email'
                type='email'
                placeholder='you@example.com'
                autoComplete='email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`w-full px-5 py-3 rounded-xl border text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19398A] transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-semibold text-gray-700'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                placeholder='********'
                autoComplete='current-password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={`w-full px-5 py-3 rounded-xl border text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19398A] transition ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-3 rounded-xl bg-[#152e6c] text-white font-semibold text-lg hover:bg-[#19398A] disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-3 transition'
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <p className='mt-6 text-center text-gray-600'>
            Don't have an account?{' '}
            <a
              href='/register'
              className='text-[#19398A] font-semibold hover:underline'
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
