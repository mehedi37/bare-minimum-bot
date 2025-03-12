import { NextResponse } from 'next/server';
import { API_ENDPOINTS, getApiUrl } from '@/app/config/api';

/**
 * Handle POST requests to the text summarization API by proxying to the FastAPI backend
 */
export async function POST(request) {
  try {
    // Get form data from request
    const formData = await request.formData();

    // Debug log
    console.log('Text Summarization Request:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Forward the request to the FastAPI backend
    const response = await fetch(getApiUrl(API_ENDPOINTS.SUMMARIZE.TEXT), {
      method: 'POST',
      body: formData,
      headers: {
        // Forward cookies if any
        Cookie: request.headers.get('cookie') || '',
      },
    });

    // Log the response status
    console.log(`Text API Response Status: ${response.status}`);

    // Get the response data
    let data;
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      data = await response.json();
      console.log('Text API Response Data:', JSON.stringify(data, null, 2));

      // Process API response to match expected format if needed
      if (data && data.summary && !data.source_type) {
        // Handle potential format discrepancies
        data = {
          ...data,
          source_type: 'text',
          source_info: data.source_info || {}
        };
      }

      // Ensure key_points array is always present
      if (data && data.summary) {
        if (!data.key_points) {
          data.key_points = [];
        }
      }
    } else {
      const textResponse = await response.text();
      console.log('Text API Non-JSON Response:', textResponse);
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
    console.error('Error proxying text summarization:', error);
    return NextResponse.json(
      {
        detail: 'Error connecting to backend API',
        error: error.message
      },
      { status: 500 }
    );
  }
}