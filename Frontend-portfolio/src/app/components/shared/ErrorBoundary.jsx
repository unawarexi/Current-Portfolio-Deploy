// ============================================================================
// ERROR BOUNDARY - React error boundary with fallback UI
// ============================================================================

import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils/cn';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from '@core/constants/icons';
import { Button } from '@components/ui/Button';

// ========================
// TYPES
// ========================

// ========================
// ERROR BOUNDARY CLASS
// ========================
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          onReset={this.handleReset}
          showHomeLink={this.props.showHomeLink}
          showBackLink={this.props.showBackLink}
        />
      );
    }

    return this.props.children;
  }
}

// ========================
// ERROR FALLBACK UI
// ========================

export const ErrorFallback = ({
  error,
  onReset,
  showHomeLink = true,
  showBackLink = true,
  title = 'Something went wrong',
  description,
  className,
}) => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'flex flex-col items-center justify-center min-h-[400px] p-8 text-center',
        className
      )}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-error-100 flex items-center justify-center mb-6"
      >
        <AlertTriangle className="w-10 h-10 text-error-600" />
      </motion.div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {title}
      </h2>

      {/* Description */}
      <p className="text-neutral-600 dark:text-neutral-300 mb-2 max-w-md">
        {description || 'An unexpected error occurred. Please try again or contact support if the problem persists.'}
      </p>

      {/* Error details (dev mode) */}
      {error && process.env.NODE_ENV === 'development' && (
        <details className="mb-6 w-full max-w-lg">
          <summary className="text-sm text-neutral-500 dark:text-neutral-400 cursor-pointer hover:text-neutral-700 hover:dark:text-neutral-200">
            View error details
          </summary>
          <pre className="mt-2 p-4 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-left text-xs overflow-auto text-error-600">
            {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </details>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {onReset && (
          <Button onClick={onReset} variant="primary">
            <RefreshCw size={18} className="mr-2" />
            Try Again
          </Button>
        )}

        {showBackLink && (
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </Button>
        )}

        {showHomeLink && (
          <Button onClick={handleGoHome} variant="ghost">
            <Home size={18} className="mr-2" />
            Home
          </Button>
        )}
      </div>
    </motion.div>
  );
};

// ========================
// NOT FOUND PAGE
// ========================

export const NotFound = ({
  title = '404 - Page Not Found',
  description = "The page you're looking for doesn't exist or has been moved.",
  showHomeLink = true,
  showBackLink = true,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        'flex flex-col items-center justify-center min-h-[60vh] p-8 text-center',
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="text-8xl font-bold text-neutral-200 mb-4"
      >
        404
      </motion.div>

      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{title}</h1>
      <p className="text-neutral-600 dark:text-neutral-300 mb-8 max-w-md">{description}</p>

      <div className="flex items-center gap-3">
        {showHomeLink && (
          <Button onClick={() => window.location.href = '/'} variant="primary">
            <Home size={18} className="mr-2" />
            Go Home
          </Button>
        )}
        {showBackLink && (
          <Button onClick={() => window.history.back()} variant="outline">
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorBoundary;
