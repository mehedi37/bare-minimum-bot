import { NextResponse } from 'next/server';

const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Handle POST requests to the YouTube summarization API by proxying to the FastAPI backend
 */
export async function POST(request) {
  try {
    // Get form data from request
    const formData = await request.formData();

    // Debug log
    console.log('YouTube Summarization Request:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Forward the request to the FastAPI backend
    const response = await fetch(`${API_BASE_URL}/api/v1/summarize/youtube`, {
      method: 'POST',
      body: formData,
      headers: {
        // Forward cookies if any
        Cookie: request.headers.get('cookie') || '',
      },
    });

    // Log the response status
    console.log(`YouTube API Response Status: ${response.status}`);

    // Get the response data
    let data;
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      data = await response.json();
      console.log('YouTube API Response Data:', JSON.stringify(data, null, 2));

      // Process API response to match expected format if needed
      if (data && data.summary && !data.source_type) {
        // Handle potential format discrepancies
        data = {
          ...data,
          source_type: 'youtube',
          source_info: data.source_info || {}
        };
      }

      // Ensure sections array is present when needed
      if (data && data.summary && data.source_type === 'youtube') {
        // Convert timestamps to sections if present in a different format
        if (data.timestamps && !data.sections) {
          data.sections = data.timestamps.map(ts => ({
            time: ts.time || '',
            text: ts.description || ts.text || ''
          }));
        } else if (!data.sections && !data.timestamps) {
          // Initialize empty sections array if neither exists
          data.sections = [];
        }
      }

      // Handle quiz format consistency
      if (data && data.questions) {
        // Ensure source_type is set
        if (!data.source_type) {
          data.source_type = 'youtube';
        }

        // Ensure source_info is present
        if (!data.source_info) {
          data.source_info = {};
        }

        // Ensure metadata is present
        if (!data.metadata) {
          data.metadata = {};
        }
      }
    } else {
      const textResponse = await response.text();
      console.log('YouTube API Non-JSON Response:', textResponse);
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
    console.error('Error proxying YouTube summarization:', error);
    return NextResponse.json(
      {
        detail: 'Error connecting to backend API',
        error: error.message
      },
      { status: 500 }
    );
  }
}