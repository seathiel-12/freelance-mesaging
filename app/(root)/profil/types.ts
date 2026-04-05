export interface EditUserFormData {
  firstname?: string
  lastname?: string
  status?: string
  vision?: string
  about?: string
  enterpriseName?: string
  github?: string
  linkedin?: string
  website?: string
  cv?: string
  members?: any
}

export interface ProfilProps {
  params: Promise<{ id: string }>
}
