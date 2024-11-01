import { NextResponse } from "next/server";
import { COOKIE_NAMES, COOKIE_OPTIONS } from "@/lib/constants/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Get request token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/authentication/token/new?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();

    if (data.success) {
      // Validate login
      const validateWithLogin = await fetch(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}/authentication/token/validate_with_login?api_key=${process.env.TMDB_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            request_token: data.request_token,
          }),
        }
      );

      const validationData = await validateWithLogin.json();

      if (validationData.success) {
        // Create session
        const sessionResponse = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}/authentication/session/new?api_key=${process.env.TMDB_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              request_token: validationData.request_token,
            }),
          }
        );

        const sessionData = await sessionResponse.json();

        if (sessionData.success) {
          // Get account details
          const accountResponse = await fetch(
            `${process.env.NEXT_PUBLIC_TMDB_API_URL}/account?api_key=${process.env.TMDB_API_KEY}&session_id=${sessionData.session_id}`
          );
          const accountData = await accountResponse.json();

          const response = NextResponse.json({
            success: true,
            message: "Login successful",
            session_id: sessionData.session_id,
            account_id: accountData.id.toString()
          });

          // Set cookies
          response.cookies.set(COOKIE_NAMES.SESSION_ID, sessionData.session_id, COOKIE_OPTIONS);
          response.cookies.set(COOKIE_NAMES.ACCOUNT_ID, accountData.id.toString(), COOKIE_OPTIONS);

          return response;
        }
      }
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "An error occurred during authentication" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}
