// API Configuration - Automatically detects environment
const getApiBaseUrl = () => {
  // Production - Render backend URL
  const PRODUCTION_API = 'https://mahotsav-y08u.onrender.com/api';
  
  // Development
  const DEVELOPMENT_API = 'http://localhost:5000/api';
  
  // Auto-detect environment
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Check if running in production (GitHub Pages, Vercel, Netlify, Render, etc.)
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return PRODUCTION_API;
    }
  }
  
  return DEVELOPMENT_API;
};

const API_BASE_URL = getApiBaseUrl();

// Log current API configuration (for debugging)

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  college?: string;
  branch?: string;
  dateOfBirth: string;
  gender?: string;
  registerId?: string;
  userType?: string;
  participationType?: string;
  referenceId?: string;
  state?: string;
  district?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    id?: string;
    userId?: string;
    name?: string;
    email?: string;
    userType?: string;
    gender?: string;
  };
  error?: string;
}

export interface Event {
  fee: ReactNode;
  fee: any;
  _id: string;
  eventName: string;
  eventType: 'sports' | 'culturals' | 'technical' | 'literary' | 'parasports';
  description?: string;
  category?: string;
  gender?: 'male' | 'female' | 'mixed';
  date?: string;
  time?: string;
  venue?: string;
  maxParticipants?: number;
  registeredCount?: number;
  prizePool?: string;
  rules?: string;
  coordinators?: Array<{
    name: string;
    contact: string;
  }>;
  isActive?: boolean;
  fee?: number;
  eventId?: string;
  registeredAt?: Date | string;
}

export interface EventsResponse {
  success: boolean;
  count?: number;
  type?: string;
  data?: Event[];
  message?: string;
  error?: string;
}

export interface IndividualEventRegistration {
  eventId: string;
  userId: string;
  participantName: string;
  email: string;
  phone?: string;
  college?: string;
}

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
}

export interface TeamEventRegistration {
  eventId: string;
  teamName: string;
  captain: TeamMember;
  teamMembers: TeamMember[];
}

export interface EventRegistrationResponse {
  success: boolean;
  message: string;
  count?: number;
  data?: {
    registrationId?: string;
    teamId?: string;
    teamName?: string;
    eventName?: string;
    teamSize?: number;
    participantName?: string;
    captainName?: string;
  };
  error?: string;
}

export const registerUser = async (userData: SignupData, maxRetries: number = 3): Promise<ApiResponse> => {
  let lastError: ApiResponse = {
    success: false,
    message: 'Registration failed',
    error: 'Unknown error',
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      // If successful, return immediately
      if (data.success) {
        return data;
      }
      
      // If it's a conflict error (duplicate userId from concurrent registration), retry
      if (response.status === 409 && data.error?.includes('userId')) {
        console.log(`⏳ Registration conflict, retrying... (attempt ${attempt}/${maxRetries})`);
        lastError = data;
        // Wait a bit before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 300 * attempt));
        continue;
      }
      
      // For other errors (like duplicate email), return immediately
      return data;
    } catch (error: any) {
      lastError = {
        success: false,
        message: 'Failed to connect to server',
        error: error.message,
      };
      
      // Retry on network errors too
      if (attempt < maxRetries) {
        console.log(`⏳ Network error, retrying... (attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 300 * attempt));
        continue;
      }
    }
  }

  // All retries failed
  return {
    success: false,
    message: 'Registration is busy. Please try again in a moment.',
    error: lastError.error,
  };
};

export const loginUser = async (identifier: string | { mahotsavId?: string; regNo?: string; email?: string }, password: string): Promise<ApiResponse> => {
  try {
    // Handle different identifier formats
    let emailField: string;
    
    if (typeof identifier === 'string') {
      emailField = identifier;
    } else if (identifier.mahotsavId) {
      emailField = identifier.mahotsavId;
    } else if (identifier.regNo) {
      emailField = identifier.regNo;
    } else if (identifier.email) {
      emailField = identifier.email;
    } else {
      emailField = '';
    }
    
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailField, password }),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to connect to server',
      error: error.message,
    };
  }
};

export const getAllRegistrations = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/registrations`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch registrations',
      error: error.message,
    };
  }
};

export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to connect to server',
      error: error.message,
    };
  }
};

// Fetch all events
export const getAllEvents = async (): Promise<EventsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch events',
      error: error.message,
    };
  }
};

// Fetch events by type (sports, culturals, technical, literary)
export const getEventsByType = async (type: string, gender?: string): Promise<EventsResponse> => {
  try {
    const url = gender 
      ? `${API_BASE_URL}/events/${type}?gender=${gender}`
      : `${API_BASE_URL}/events/${type}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch events',
      error: error.message,
    };
  }
};

// Fetch events by gender
export const getEventsByGender = async (gender: string): Promise<EventsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events-by-gender/${gender}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch events by gender',
      error: error.message,
    };
  }
};

// Fetch single event by ID
export const getEventById = async (id: string): Promise<EventsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/event/${id}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch event',
      error: error.message,
    };
  }
};

// Register for individual event - with silent retry for queue conflicts
export const registerIndividualEvent = async (registrationData: IndividualEventRegistration): Promise<EventRegistrationResponse> => {
  const maxRetries = 5;
  const baseDelay = 1000; // 1 second base delay
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}/register-individual`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();
      
      // If server is busy (409 conflict or 500 server busy), retry silently
      if (!data.success && (response.status === 409 || response.status === 500) && attempt < maxRetries) {
        const delay = baseDelay * attempt; // Linear backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return data;
    } catch (error: any) {
      // Network error - retry silently
      if (attempt < maxRetries) {
        const delay = baseDelay * attempt;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return {
        success: false,
        message: 'Registration is processing. Please wait.',
        error: error.message,
      };
    }
  }
  
  // All retries exhausted - still return a hopeful message
  return {
    success: false,
    message: 'Registration is taking longer than expected. Please try again.',
  };
};

// Register team for event - with silent retry for queue conflicts
export const registerTeamEvent = async (registrationData: TeamEventRegistration): Promise<EventRegistrationResponse> => {
  const maxRetries = 5;
  const baseDelay = 1000; // 1 second base delay
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}/register-team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();
      
      // If server is busy (409 conflict or 500 server busy), retry silently
      if (!data.success && (response.status === 409 || response.status === 500) && attempt < maxRetries) {
        const delay = baseDelay * attempt; // Linear backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return data;
    } catch (error: any) {
      // Network error - retry silently
      if (attempt < maxRetries) {
        const delay = baseDelay * attempt;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return {
        success: false,
        message: 'Registration is processing. Please wait.',
        error: error.message,
      };
    }
  }
  
  // All retries exhausted - still return a hopeful message
  return {
    success: false,
    message: 'Registration is taking longer than expected. Please try again.',
  };
};

// Get user's event registrations
export const getMyEventRegistrations = async (userId: string): Promise<EventRegistrationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/my-registrations/${userId}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch registrations',
      error: error.message,
    };
  }
};

// Save selected events to user's My Events
export const saveMyEvents = async (userId: string, events: any[]): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/save-events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, events }),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to save events',
      error: error.message,
    };
  }
};

// Get user's saved events (My Events)
export const getMyEvents = async (userId: string): Promise<EventsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/my-events/${userId}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch saved events',
      error: error.message,
    };
  }
};

// Add a single event to My Events
export const addEventToMyEvents = async (userId: string, eventId: string): Promise<ApiResponse> => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/add-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, eventId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('API Error in addEventToMyEvents:', error);
    return {
      success: false,
      message: error.message.includes('fetch') ? 'Unable to connect to server. Please check your internet connection.' : 'Failed to add event',
      error: error.message,
    };
  }
};

// Remove an event from My Events
export const removeEventFromMyEvents = async (userId: string, eventId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/remove-event`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, eventId }),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to remove event',
      error: error.message,
    };
  }
};

// Check which events are saved by user
export const checkSavedEvents = async (userId: string, eventIds: string[]): Promise<ApiResponse & { data?: { savedEventIds: string[] } }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-saved`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, eventIds }),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to check saved events',
      error: error.message,
    };
  }
};

// Get user profile data
export const getUserProfile = async (userId: string): Promise<ApiResponse & { data?: any }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message,
    };
  }
};

// Get user's registered events
export const getUserRegisteredEvents = async (userId: string): Promise<EventsResponse & { data?: any }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/my-registrations/${userId}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch registered events',
      error: error.message,
    };
  }
};

// Get user details by userId
export const getUserDetails = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch user details',
      error: error.message,
    };
  }
};
