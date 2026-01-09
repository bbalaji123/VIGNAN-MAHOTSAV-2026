import toast from 'react-hot-toast';

// Custom toast configurations with beautiful styling
export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-left',
      style: {
        background: '#10b981',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
        maxWidth: '500px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10b981',
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#ef4444',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
        maxWidth: '500px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#ef4444',
      },
    });
  },

  warning: (message: string) => {
    toast(message, {
      duration: 4500,
      position: 'top-right',
      icon: '⚠️',
      style: {
        background: '#f59e0b',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
        maxWidth: '500px',
      },
    });
  },

  info: (message: string) => {
    toast(message, {
      duration: 4000,
      position: 'top-right',
      icon: 'ℹ️',
      style: {
        background: '#3b82f6',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
        maxWidth: '500px',
      },
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      position: 'top-left',
      style: {
        background: '#6366f1',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
        maxWidth: '500px',
      },
    });
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },
};
