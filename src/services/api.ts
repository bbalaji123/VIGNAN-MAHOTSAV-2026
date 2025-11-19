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
console.log('🌐 API Base URL:', API_BASE_URL);

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  college?: string;
  dateOfBirth: string;
  gender?: string;
  registerId?: string;
  userType?: string;
  participationType?: string;
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

export const registerUser = async (userData: SignupData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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

export const loginUser = async (email: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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

// Register for individual event
export const registerIndividualEvent = async (registrationData: IndividualEventRegistration): Promise<EventRegistrationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register-individual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to register for event',
      error: error.message,
    };
  }
};

// Register team for event
export const registerTeamEvent = async (registrationData: TeamEventRegistration): Promise<EventRegistrationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register-team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to register team',
      error: error.message,
    };
  }
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
export const saveMyEvents = async (userId: string, eventIds: string[]): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/save-events`, {
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

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to add event',
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
