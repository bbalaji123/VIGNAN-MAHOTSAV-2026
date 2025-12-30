import React from 'react';
import './Login.css';
import './CAModal.css';

interface LoginProps {
  showLoginModal: boolean;
  onClose: () => void;
  loginFormData: {
    identifier: string;
    password: string;
  };
  setLoginFormData: React.Dispatch<
    React.SetStateAction<{
      identifier: string;
      password: string;
    }>
  >;
  onSubmitApi: (payload: any) => Promise<void>;
  isLoggingIn: boolean;
  loginMessage: { type: 'success' | 'error'; text: string } | null;
  setLoginMessage: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'error'; text: string } | null>
  >;
  onSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({
  showLoginModal,
  onClose,
  loginFormData,
  setLoginFormData,
  onSubmitApi,
  isLoggingIn,
  loginMessage,
  setLoginMessage,
  onSignupClick
}) => {
  if (!showLoginModal) return null;

  // Validation for registration number or Mahotsav ID
  const validateIdentifier = (value: string) => {
    const trimmed = value.trim().toUpperCase();

    const mahotsavIdRegex = /^MH26\d{6}$/; // MH26XXXXXX
    const regNoRegex = /^[A-Z0-9]{5,}$/; // Generic Reg No

    if (mahotsavIdRegex.test(trimmed)) {
      return { type: 'mahotsavId', value: trimmed };
    }

    if (regNoRegex.test(trimmed)) {
      return { type: 'regNo', value: trimmed };
    }

    return null;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginFormData(prev => ({
      ...prev,
      [name]: value.toUpperCase()
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = validateIdentifier(loginFormData.identifier);

    if (!result) {
      setLoginMessage({
        type: 'error',
        text: 'Enter a valid Registration Number or Mahotsav ID (MH26XXXXXX)'
      });
      return;
    }

    const payload =
      result.type === 'mahotsavId'
        ? { mahotsavId: result.value, password: loginFormData.password }
        : { regNo: result.value, password: loginFormData.password };

    try {
      await onSubmitApi(payload);
    } catch {
      setLoginMessage({
        type: 'error',
        text: 'Login failed. Please try again.'
      });
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="ca-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="ca-modal-content ca-login-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="ca-modal-close" onClick={onClose}>×</button>
        <h2 className="ca-modal-title">Welcome Back!</h2>

        <div className="login-modal-body">
          <form className="ca-form" onSubmit={onSubmit}>
            {loginMessage && (
              <div className="ca-error-message">
                {loginMessage.text}
              </div>
            )}

            {/* Reg No / Mahotsav ID */}
            <div className="ca-form-group">
              <label htmlFor="identifier">
                Registration No / Mahotsav ID
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={loginFormData.identifier}
                onChange={onInputChange}
                placeholder="Reg. No or MH26XXXXXX"
                required
              />
            </div>

            {/* Password as Date (DOB) */}
            <div className="ca-form-group">
              <label htmlFor="password">Password (Date of Birth)</label>
              <input
                type="date"
                id="password"
                name="password"
                value={loginFormData.password}
                onChange={onInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="ca-submit-button"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? '⏳ Logging in...' : 'Login'}
            </button>

            <div className="signup-link">
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSignupClick}
                  className="signup-btn"
                >
                  Sign up
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
