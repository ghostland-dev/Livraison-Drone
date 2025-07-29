export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: "user" | "admin"
  verified: boolean
  createdAt: string
}

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface AuthResponse {
  success: boolean
  data?: {
    user: User
    token: string
  }
  error?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

// Mock users database
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "demo@skydeliver.com",
    firstName: "Demo",
    lastName: "User",
    phone: "+33123456789",
    role: "user",
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "admin@skydeliver.com",
    firstName: "Admin",
    lastName: "SkyDeliver",
    phone: "+33987654321",
    role: "admin",
    verified: true,
    createdAt: new Date().toISOString(),
  },
]

// Mock passwords (in real app, these would be hashed)
const MOCK_PASSWORDS: Record<string, string> = {
  "demo@skydeliver.com": "demo123",
  "admin@skydeliver.com": "admin123",
}

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Generate mock JWT token
function generateMockToken(user: User): string {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }
  return btoa(JSON.stringify(payload))
}

// Verify mock JWT token
function verifyMockToken(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token))
    if (payload.exp < Date.now()) {
      return null // Token expired
    }
    return MOCK_USERS.find((user) => user.id === payload.userId) || null
  } catch {
    return null
  }
}

export const authAPI = {
  async login(data: LoginRequest): Promise<{ user: User; token: string }> {
    await delay(1000) // Simulate network delay

    const user = MOCK_USERS.find((u) => u.email === data.email)
    const password = MOCK_PASSWORDS[data.email]

    if (!user || password !== data.password) {
      throw new Error("Email ou mot de passe incorrect")
    }

    const token = generateMockToken(user)

    return {
      user,
      token,
    }
  },

  async register(data: RegisterRequest): Promise<{ user: User; token: string }> {
    await delay(1500) // Simulate network delay

    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === data.email)
    if (existingUser) {
      throw new Error("Un compte avec cet email existe déjà")
    }

    // Create new user
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: "user",
      verified: false,
      createdAt: new Date().toISOString(),
    }

    // Add to mock database
    MOCK_USERS.push(newUser)
    MOCK_PASSWORDS[data.email] = data.password

    const token = generateMockToken(newUser)

    return {
      user: newUser,
      token,
    }
  },

  async verifyToken(token: string): Promise<ApiResponse<User>> {
    await delay(500) // Simulate network delay

    const user = verifyMockToken(token)
    if (!user) {
      return {
        success: false,
        error: "Token invalide ou expiré",
      }
    }

    return {
      success: true,
      data: user,
    }
  },

  async getUser(userId: string): Promise<ApiResponse<User>> {
    await delay(300) // Simulate network delay

    const user = MOCK_USERS.find((u) => u.id === userId)
    if (!user) {
      return {
        success: false,
        error: "Utilisateur non trouvé",
      }
    }

    return {
      success: true,
      data: user,
    }
  },

  async updateProfile(userId: string, data: Partial<User>): Promise<ApiResponse<User>> {
    await delay(800) // Simulate network delay

    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return {
        success: false,
        error: "Utilisateur non trouvé",
      }
    }

    // Update user
    MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...data }

    return {
      success: true,
      data: MOCK_USERS[userIndex],
    }
  },
}
