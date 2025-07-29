export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

export function validateForm(data: Record<string, any>, rules: ValidationRules): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field]

    // Required validation
    if (rule.required && (!value || (typeof value === "string" && value.trim() === ""))) {
      errors[field] = `Le champ ${field} est requis`
      continue
    }

    // Skip other validations if field is empty and not required
    if (!value || (typeof value === "string" && value.trim() === "")) {
      continue
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `Le champ doit contenir au moins ${rule.minLength} caractères`
      continue
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `Le champ ne peut pas dépasser ${rule.maxLength} caractères`
      continue
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = `Le format du champ n'est pas valide`
      continue
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value)
      if (customError) {
        errors[field] = customError
        continue
      }
    }
  }

  return errors
}

// Predefined validation rules
export const emailRules: ValidationRule = {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  custom: (value: string) => {
    if (!value.includes("@")) return "Email invalide"
    return null
  },
}

export const passwordRules: ValidationRule = {
  required: true,
  minLength: 6,
  custom: (value: string) => {
    if (value.length < 6) return "Le mot de passe doit contenir au moins 6 caractères"
    return null
  },
}

export const nameRules: ValidationRule = {
  required: true,
  minLength: 2,
  maxLength: 50,
  custom: (value: string) => {
    if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
      return "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes"
    }
    return null
  },
}

export const phoneRules: ValidationRule = {
  required: false,
  pattern: /^(\+33|0)[1-9](\d{8})$/,
  custom: (value: string) => {
    if (value && !value.match(/^(\+33|0)[1-9](\d{8})$/)) {
      return "Numéro de téléphone français invalide"
    }
    return null
  },
}
