
'use client'

import { useEffect, useState, useRef } from 'react'
import { type User, type Message, MessageType } from '@/api/database/types'
import { Send } from 'lucide-react'
import { API_URL } from '@/api/config/starter'
import { asyncFetch } from '@/utils/functions/asyncFetch'
import useNotificationManager from '@/utils/components/Notification/hooks/useNotificationManager'

const ConversationPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [conversationId, setConversationId] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [otherUser, setOtherUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {notify} = useNotificationManager();

  useEffect(() => {
    const getParams = async () => {
      const { id } = await params
      setConversationId(id)
    }
    getParams()
  }, [params]);

  useEffect(() => {
    if (!conversationId) return;

    const fetchConversationData = async () => {
      try {
        setLoading(true)

        // Fetch current user id stored in localstorage 
        const currentUserId = localStorage.getItem('userId')
        if (!currentUserId) {
          notify('User not authenticated', 'error', true);
        }

        // Fetch connected user details
        const currentUserData = await asyncFetch(`${API_URL}/users/${currentUserId}`)

         setCurrentUser(currentUserData)

        // Fetch destinator details
        const otherUserData = await asyncFetch(`${API_URL}/users/${conversationId}`);

        setOtherUser(otherUserData)

        //Fetch messages for this conversation
        const messages = await Promise.resolve().then(async () => {
          return asyncFetch(`${API_URL}/messages?sender=${currentUserId}&receiver=${conversationId}`)
        }).then(async (sentMessages: Message[]) => {
          return asyncFetch(`${API_URL}/messages?sender=${conversationId}&receiver=${currentUserId}`).then((receivedMessages: Message[]) => {
            return [...sentMessages, ...receivedMessages]})
        })
        
        setMessages(messages)

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load conversation')
      } finally {
        setLoading(false)
      }
    }

    fetchConversationData()
  }, [conversationId, API_URL])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !otherUser || sending) return

    try {
      setSending(true)

      const tempMessage: Message = {
        id: Date.now().toString(),
        sender: currentUser.id,
        receiver: otherUser.id,
        content: newMessage.trim(),
        isEdited: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      await asyncFetch(`${API_URL}/messages`, 'POST', tempMessage)

      setMessages(prev => [...prev, tempMessage])
      setNewMessage('')

    } catch (err) {
      notify('Failed to send message.', 'error')
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading conversation...</div>
      </div>
    )
  }

  if (error || !currentUser || !otherUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-red-600">{error || 'Conversation not found'}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-(--main-height) bg-gray-50">
      {/* Header  */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <div className="relative w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {otherUser.firstname?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">
              {otherUser.firstname} {otherUser.lastname}
            </h1>
            <p className="text-sm text-gray-600 capitalize">{otherUser.status}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-green-400 rounded-full"></span>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>
      </div>


      {/* Message zone  */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start a conversation</h3>
              <p className="text-gray-600">Send a message to {otherUser.firstname} to begin chatting.</p>
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.sender === currentUser.id
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    isOwnMessage
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${otherUser.firstname}...`}
              disabled={sending}
              rows={1}
              className=" flex w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              style={{ minHeight: '44px', maxHeight: '' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send width={19} />
                Send
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}

export default ConversationPage