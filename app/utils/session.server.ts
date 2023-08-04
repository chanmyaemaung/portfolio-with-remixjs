import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__remix-themes",
    // domain: process.env.NODE_ENV !== "development" ? "" : undefined,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["B2as27Fl4v"],
    // secure: process.env.NODE_ENV === "development" ? false : true,
    secure: process.env.NODE_ENV === "production",
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
