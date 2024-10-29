import { cookies } from "next/headers";
import { COOKIE_NAMES } from "../../constants/auth";

export async function getServerSideAuth() {
  const cookieStore = await cookies();

  return {
    accountId: cookieStore.get(COOKIE_NAMES.ACCOUNT_ID)?.value ?? null,
    sessionId: cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value ?? null,
  };
}
