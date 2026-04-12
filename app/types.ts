
export enum UserStatus {
  FREELANCE = 'FREELANCE',
  ENTERPRISE = 'ENTERPRISE',
}

export interface User {
  id: string
  email: string
  firstname: string
  lastname: string
  status: 'FREELANCE' | 'ENTERPRISE'
  password?: string
  vision?: string | null
  about?: string | null
  enterpriseName?: string | null
  github?: string | null
  linkedin?: string | null
  website?: string | null
  cv?: string | null
  members?: number | null
  isVerified: boolean
  createdAt: Date | string
  updatedAt: Date | string
}

export interface EditUserFormData {
  firstname?: string
  lastname?: string
  status?: UserStatus
  vision?: string
  about?: string
  enterpriseName?: string
  github?: string
  linkedin?: string
  website?: string
  cv?: string
  members?: number | null
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
  SYSTEM = 'SYSTEM',
}

export interface Message {
  id: string
  content: string
  isEdited: boolean
  createdAt: Date | string
  updatedAt: Date | string
  senderId: User['id']
  receiverId: User['id']
}


