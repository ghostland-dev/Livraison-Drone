"use client"

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from "react"
import { authAPI, type User, type LoginRequest, type RegisterRequest } from "@/lib/api"
import { UserStorage } from "@/lib/storage"

// Types
interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  isInitialized: boolean
}

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: { user: User; token: string } }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_AUTH" }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_INITIALIZED" }

interface AuthContextType extends AuthState {
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  clearError: () => void
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  isInitialized: false,
}

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      }

    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        isInitialized: true,
      }

    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case "CLEAR_AUTH":
      return {
        ...initialState,
        isInitialized: true,
      }

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      }

    case "SET_INITIALIZED":
      return {
        ...state,
        isInitialized: true,
      }

    default:
      return state
  }
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Initialize auth state only once
  useEffect(() => {
    let isMounted = true

    const initAuth = async () => {
      const savedUser = UserStorage.getUser()
      const savedToken = UserStorage.getToken()

      if (savedUser && savedToken && isMounted) {
        try {
          const response = await authAPI.verifyToken(savedToken)
          if (response.success && response.data && isMounted) {
            dispatch({
              type: "SET_USER",
              payload: { user: response.data, token: savedToken },
            })
          } else if (isMounted) {
            UserStorage.clearUser()
            dispatch({ type: "SET_INITIALIZED" })
          }
        } catch (error) {
          if (isMounted) {
            UserStorage.clearUser()
            dispatch({ type: "SET_INITIALIZED" })
          }
        }
      } else if (isMounted) {
        dispatch({ type: "SET_INITIALIZED" })
      }
    }

    initAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const login = useCallback(async (data: LoginRequest) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })

      const response = await authAPI.login(data)

      UserStorage.saveUser(response.user)
      UserStorage.saveToken(response.token)

      dispatch({
        type: "SET_USER",
        payload: { user: response.user, token: response.token },
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur de connexion"
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    }
  }, [])

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })

      const response = await authAPI.register(data)

      UserStorage.saveUser(response.user)
      UserStorage.saveToken(response.token)

      dispatch({
        type: "SET_USER",
        payload: { user: response.user, token: response.token },
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur d'inscription"
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    UserStorage.clearUser()
    dispatch({ type: "CLEAR_AUTH" })
  }, [])

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" })
  }, [])

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
