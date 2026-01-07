import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Always redirect to dashboard after login, ignore any previous location
  const from = '/admin/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
      // Show a subtle success toast when user fixes validation error
      if (value.trim()) {
        toast.dismiss(); // Dismiss any existing toasts
      }
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 3) {
      errors.password = 'Password must be at least 3 characters';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      // Show toast for validation errors
      const firstError = Object.values(errors)[0];
      toast.error(firstError, {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    setLoading(true);
    setError('');
    setFieldErrors({});

    // Show loading toast
    const loadingToast = toast.loading('Signing in...', {
      position: 'top-center',
    });

    const result = await login(formData);

    // Dismiss loading toast
    toast.dismiss(loadingToast);

    if (result.success) {
      // Get user role for personalized message
      const userRole = result.user?.role;
      let roleDisplayName = 'User';
      
      switch(userRole) {
        case 'super_admin':
          roleDisplayName = 'Super Admin';
          break;
        case 'office_executive':
          roleDisplayName = 'Office Executive';
          break;
        case 'hr_manager':
          roleDisplayName = 'HR Manager';
          break;
        default:
          roleDisplayName = 'Admin';
      }
      
      toast.success(`Welcome back, ${roleDisplayName}! Redirecting to dashboard...`, {
        duration: 3000,
        position: 'top-center',
      });
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } else {
      setError(result.error);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      // Show specific error toast based on error type
      let errorMessage = 'Login failed. Please try again.';
      if (result.error) {
        if (result.error.toLowerCase().includes('username')) {
          errorMessage = 'Username not found. Please check your username.';
        } else if (result.error.toLowerCase().includes('password')) {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (result.error.toLowerCase().includes('invalid')) {
          errorMessage = 'Invalid username or password.';
        } else {
          errorMessage = result.error;
        }
      }

      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50/30 to-orange-100/50 py-12 px-4 sm:px-6 lg:px-8 font-admin relative">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-orange-300/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-100/40 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-orange-400/20 rounded-full blur-md"></div>
      </div>

      <div className="relative max-w-md w-full">
        <div className={`bg-white/80 backdrop-blur-md shadow-strong rounded-3xl p-8 border border-white/20 animate-scale-in transition-transform duration-300 ${isShaking ? 'animate-pulse' : ''}`}>
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-medium">
              <span className="text-white font-bold text-xl">IA</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-600">
              Sign in to access the admin dashboard
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    aria-describedby={fieldErrors.username ? "username-error" : undefined}
                    className={`block w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200 ${fieldErrors.username
                        ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500'
                        : 'border-slate-300/60'
                      }`}
                    placeholder="Enter your username"
                  />
                  {fieldErrors.username && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                {fieldErrors.username && (
                  <p id="username-error" className="mt-1 text-sm text-red-600 animate-slide-down">
                    {fieldErrors.username}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    aria-describedby={fieldErrors.password ? "password-error" : "password-toggle"}
                    className={`block w-full px-4 pr-12 py-3 border rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200 ${fieldErrors.password
                        ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500'
                        : 'border-slate-300/60'
                      }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    id="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200 focus:outline-none focus:text-slate-700"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  {fieldErrors.password && (
                    <div className="absolute inset-y-0 right-12 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                {fieldErrors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-600 animate-slide-down">
                    {fieldErrors.password}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-medium hover:shadow-strong transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign in to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Secure admin access • ImmunoACT Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;