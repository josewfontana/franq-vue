const USER_KEY = 'user'
const REGISTERED_USERS_KEY = 'registeredUsers'
const SESSION_DURATION_MIN = 30

interface StoredUser {
  name: string
  email: string
  password: string
}

interface SessionUser {
  name: string
  email: string
  expiresAt: number
}

function saveSession(user: Omit<SessionUser, 'expiresAt'>) {
  const now = new Date().getTime()
  const expiresAt = now + SESSION_DURATION_MIN * 60 * 1000

  const userWithExpiry: SessionUser = {
    ...user,
    expiresAt
  }

  localStorage.setItem(USER_KEY, JSON.stringify(userWithExpiry))
}

function saveRegisteredUser(user: StoredUser) {
  const users = getRegisteredUsers()
  users.push(user)
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
}

function getRegisteredUsers(): StoredUser[] {
  const raw = localStorage.getItem(REGISTERED_USERS_KEY)
  return raw ? JSON.parse(raw) : []
}

export function login(email: string, password: string): boolean {
  const users = getRegisteredUsers()
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return false
  }

  saveSession({ name: user.name, email: user.email })
  return true
}

export function register(name: string, email: string, password: string): boolean {
  if (!name || !email || !password) return false

  const users = getRegisteredUsers()
  const exists = users.some(u => u.email === email)

  if (exists) return false

  saveRegisteredUser({ name, email, password })
  saveSession({ name, email })
  return true
}

export function logout(): void {
  localStorage.removeItem(USER_KEY)
}

export function getCurrentUser(): SessionUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  const user: SessionUser = JSON.parse(raw)
  const now = new Date().getTime()

  if (user.expiresAt && now > user.expiresAt) {
    logout()
    return null
  }

  return user
}

export function isAuthenticated(): boolean {
  return !!getCurrentUser()
}
