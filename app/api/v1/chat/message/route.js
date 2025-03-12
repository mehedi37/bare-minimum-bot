import { NextResponse } from 'next/server';
import { API_BASE_URL, API_ENDPOINTS, getApiUrl } from '@/app/config/api';

/**
 * Handle POST requests to the chat message API by proxying to the FastAPI backend
 */
export async function POST(request) {
  try {
    // Get form data from request
    const formData = await request.formData();

    // Debug log
    console.log('Chat Message Request:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Forward the request to the FastAPI backend
    const response = await fetch(getApiUrl(API_ENDPOINTS.CHAT.MESSAGE), {
      method: 'POST',
      body: formData,
      headers: {
        // Forward cookies if any
        Cookie: request.headers.get('cookie') || '',
      },
    });

    // Log the response status
    console.log(`Chat API Response Status: ${response.status}`);

    // Get the response data
    let data;
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      data = await response.json();
      console.log('Chat API Response Data:', JSON.stringify(data, null, 2));

      // Process API response to match expected format if needed
      if (data && !data.message && data.content) {
        // If we got a plain content object instead of a message object with content
        data = {
          ...data,
          message: {
            role: data.role || 'bot',
            content: data.content,
            timestamp: data.timestamp || new Date().toISOString()
          }
        };
      }

      // Ensure session_id is present
      if (data && !data.session_id) {
        data.session_id = 'default-session';
      }
    } else {
      const textResponse = await response.text();
      console.log('Chat API Non-JSON Response:', textResponse);
      data = { detail: textResponse };
    }

    // Get cookies from the API response
    const cookies = response.headers.get('set-cookie');

    // Create the response
    const apiResponse = NextResponse.json(data, {
      status: response.status,
    });

    // Forward cookies from API response if any
    if (cookies) {
      apiResponse.headers.set('set-cookie', cookies);
    }

    return apiResponse;
  } catch (error) {
    console.error('Error proxying chat message:', error);
    return NextResponse.json(
      {
        detail: 'Error connecting to backend API',
        error: error.message
      },
      { status: 500 }
    );
  }
}