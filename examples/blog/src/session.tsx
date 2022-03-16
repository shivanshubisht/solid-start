import { RequestContext } from "solid-start/entry-server";
import { redirect } from "solid-start/server";
import { createCookieSessionStorage } from "solid-start/session";
type LoginForm = {
  username: string;
  password: string;
};

// export async function register({ username, password }: LoginForm) {
//   return db.user.create({
//     data: { username: username, password }
//   });
// }

// export async function login({ username, password }: LoginForm) {
//   const user = await db.user.findUnique({ where: { username } });
//   if (!user) return null;
//   const isCorrectPassword = password === user.password;
//   if (!isCorrectPassword) return null;
//   return user;
// }

const sessionSecret = "Hello" as string;
console.log(import.meta.env, process.env);

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "SSBlog_session",
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

// export async function getUserId(request: Request) {
//   const session = await getUserSession(request);
//   const userId = session.get("userId");
//   if (!userId || typeof userId !== "string") return null;
//   return userId;
// }

export async function requireUserId(
  context: RequestContext,
  redirectTo: string = new URL(context.request.url).pathname
) {
  const session = await getUserSession(context.request);
  const secret = session.get("secret");
  console.log({ secret });
  if (!secret || typeof secret !== "string") {
    console.log(redirectTo);
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/admin/login?${searchParams}`);
  }
  return secret;
}

// export async function getUser(request: Request) {
//   const userId = await getUserId(request);
//   if (typeof userId !== "string") {
//     return null;
//   }

//   try {
//     const user = await db.user.findUnique({ where: { id: Number(userId) } });
//     return user;
//   } catch {
//     throw logout(request);
//   }
// }

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}

export async function createUserSession(secret: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("secret", secret);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  });
}