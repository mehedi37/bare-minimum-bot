import { NextResponse } from 'next/server';

const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Handle POST requests to the PDF summarization API by proxying to the FastAPI backend
 */
export async function POST(request) {
  try {
    // Get form data from request
    const formData = await request.formData();

    // Debug log (skip file content for brevity)
    console.log('PDF Summarization Request:');
    for (const [key, value] of formData.entries()) {
      if (key !== 'file') {
        console.log(`${key}: ${value}`);
      } else {
        console.log(`${key}: [File] ${value.name}, ${value.type}, ${value.size} bytes`);
      }
    }

    // Forward the request to the FastAPI backend
    const response = await fetch(`${API_BASE_URL}/api/v1/summarize/pdf`, {
      method: 'POST',
      body: formData,
      headers: {
        // Forward cookies if any
        Cookie: request.headers.get('cookie') || '',
      },
    });

    // Log the response status
    console.log(`PDF API Response Status: ${response.status}`);

    // Get the response data
    let data;
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      data = await response.json();
      console.log('PDF API Response Data:', JSON.stringify(data, null, 2));

      // Process API response to match expected format if needed
      if (data && data.summary && !data.source_type) {
        // Handle potential format discrepancies
        data = {
          ...data,
          source_type: 'pdf',
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
      console.log('PDF API Non-JSON Response:', textResponse);
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
    console.error('Error proxying PDF summarization:', error);
    return NextResponse.json(
      {
        detail: 'Error connecting to backend API',
        error: error.message
      },
      { status: 500 }
    );
  }
}