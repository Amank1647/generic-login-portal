import Cookies from "universal-cookie"

const COOKIE_PATH = "/"
const COOKIE_DOMAIN = process.env.NODE_ENV === "development" ? "localhost": "generic-login-portal.netlify.app"
const COOKIE_NAME = "myAuthToken"

const cookies = new Cookies()

export function getToken() {
  return cookies.get(COOKIE_NAME)
}

export function setToken(token) {
  cookies.set(COOKIE_NAME, token, {path: COOKIE_PATH,domain: COOKIE_DOMAIN})
}

export function logout() {
  cookies.remove(COOKIE_NAME, {path: COOKIE_PATH,domain: COOKIE_DOMAIN})
  window.location.reload()
}