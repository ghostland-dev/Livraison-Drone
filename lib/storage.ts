class SafeStorage {
  private isAvailable(): boolean {
    try {
      if (typeof window === "undefined") return false
      const test = "__storage_test__"
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  get(key: string): string | null {
    if (!this.isAvailable()) return null
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  }

  set(key: string, value: string): boolean {
    if (!this.isAvailable()) return false
    try {
      localStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  }

  remove(key: string): boolean {
    if (!this.isAvailable()) return false
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }

  clear(): boolean {
    if (!this.isAvailable()) return false
    try {
      localStorage.clear()
      return true
    } catch {
      return false
    }
  }
}

export const storage = new SafeStorage()

export class UserStorage {
  private static USER_KEY = "skydeliver_user"
  private static TOKEN_KEY = "skydeliver_token"

  static getUser(): any {
    const userData = storage.get(this.USER_KEY)
    if (!userData) return null
    try {
      return JSON.parse(userData)
    } catch {
      return null
    }
  }

  static saveUser(user: any): boolean {
    try {
      return storage.set(this.USER_KEY, JSON.stringify(user))
    } catch {
      return false
    }
  }

  static getToken(): string | null {
    return storage.get(this.TOKEN_KEY)
  }

  static saveToken(token: string): boolean {
    return storage.set(this.TOKEN_KEY, token)
  }

  static clearUser(): boolean {
    const userRemoved = storage.remove(this.USER_KEY)
    const tokenRemoved = storage.remove(this.TOKEN_KEY)
    return userRemoved && tokenRemoved
  }
}
