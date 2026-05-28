const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  let token = null;
  
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong');
  }
  
  return response.json();
};
