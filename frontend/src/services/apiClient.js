/**
 * Frontend Central API Client
 * 
 * Manages HTTP communication with the backend REST API.
 * Reads VITE_API_URL, centralizes JSON headers, handles network failures,
 * and formats standardized application responses/errors.
 */

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api')
).replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(message, status = 500, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Perform a centralized fetch request with JSON headers and timeout.
 * 
 * @param {string} endpoint - Path relative to API_BASE_URL (e.g. '/enquiries')
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 15000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: options.signal || controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const message = (isJson && data?.message)
        ? data.message
        : `Request failed with status ${response.status}`;
      throw new ApiError(message, response.status, data);
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof ApiError) {
      throw err;
    }

    if (err.name === 'AbortError') {
      throw new ApiError('Request timed out. Please check your connection and try again.', 408);
    }

    // Network error / backend not running
    throw new ApiError(
      'Unable to connect to the server. Please check your internet connection or try again later.',
      0,
      null
    );
  }
}

export const apiClient = {
  get: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) =>
    apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
};

export default apiClient;
