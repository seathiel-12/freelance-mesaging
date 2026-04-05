'use client'
import React, { useState, useEffect } from 'react'
import { 
  User, 
  Briefcase, 
  Eye, 
  Info, 
  Github, 
  Linkedin, 
  Globe, 
  FileText, 
  Users,
  Edit2,
  Save,
  X,
  ExternalLink,
  TriangleAlert
} from 'lucide-react'
import type { EditUserFormData, ProfilProps } from '../types'
import type { User as UserProps } from '@/api/database/types'
import { API_URL } from '@/api/config/starter'
import { asyncFetch } from '@/utils/functions/asyncFetch'
import useNotify from '@/utils/components/Notification/hooks/useNotify'



const Profil: React.FC<ProfilProps> = ({ params }) => {
  const [id, setId] = useState<string>('')
  const [user, setUser] = useState<UserProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<EditUserFormData>({})
  const [isSaving, setIsSaving] = useState(false)
  const {notify} = useNotify()
  
  useEffect(() => {
    const getParams = async () => {
      const { id: userId } = await params
      setId(userId)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (!id) return

    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          console.log('Fetch user response:', response)
          throw new Error('Failed to fetch user')
        }

        const data = await response.json()
        console.log('Update user response:', data)

        setUser(data)
        setFormData({
          firstname: data.firstname,
          lastname: data.lastname,
          status: data.status,
          vision: data.vision || '',
          about: data.about || '',
          enterpriseName: data.enterpriseName || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
          website: data.website || '',
          cv: data.cv || '',
          members: data.members || null,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true)
      const data = await asyncFetch(`${API_URL}/users/${id}`, 'PUT', formData)

      setUser(data)
      setIsModalOpen(false)
      notify('Successfully updated informations!', 'success', true)
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Failed to update profile', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading profile...</div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center h-(--main-height) bg-linear-to-br">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-lg text-center">
          <div className="text-red-500 text-6xl mb-4 flex justify-center">
              <TriangleAlert className='scale-200' />
          </div>
          <div className="text-xl font-semibold text-red-600 mt-7">{error || 'User not found'}</div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-(--main-height) bg-gray-100 sm:px-6 lg:px-8 flex">
      <div className="max-w-8xl mx-auto h-max py-20">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-12 relative">
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
            >
              <Edit2 size={20} />
            </button>
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <div className="w-32 h-32 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User size={48} className="text-white" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="text-indigo-100 text-lg">{user.status}</p>
                {user.enterpriseName && (
                  <p className="text-indigo-200 text-sm mt-2">
                    <Briefcase size={16} className="inline mr-1" />
                    {user.enterpriseName}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About & Vision */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            {user.about && (
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="text-indigo-600" size={24} />
                  <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{user.about}</p>
              </div>
            )}

            {/* Vision Section */}
            {user.vision && (
              <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="text-purple-600" size={24} />
                  <h2 className="text-2xl font-semibold text-gray-800">Vision</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">{user.vision}</p>
              </div>
            )}

          </div>

          {/* Right Column - Contact & Social */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact & Social</h2>
              <div className="space-y-3">
                {user.github && (
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Github size={20} className="text-gray-700" />
                      <span className="text-gray-700">GitHub</span>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-600" />
                  </a>
                )}
                {user.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin size={20} className="text-blue-600" />
                      <span className="text-gray-700">LinkedIn</span>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-600" />
                  </a>
                )}
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Globe size={20} className="text-green-600" />
                      <span className="text-gray-700">Website</span>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-600" />
                  </a>
                )}
                {user.cv && (
                  <a
                    href={user.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-indigo-600" />
                      <span className="text-indigo-700 font-medium">Download CV</span>
                    </div>
                    <ExternalLink size={16} className="text-indigo-400 group-hover:text-indigo-600" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto no-scrollbar">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enterprise Name</label>
                <input
                  type="text"
                  name="enterpriseName"
                  value={formData.enterpriseName || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
                <textarea
                  name="vision"
                  value={formData.vision || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                <textarea
                  name="about"
                  value={formData.about || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CV URL</label>
                  <input
                    type="url"
                    name="cv"
                    value={formData.cv || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profil