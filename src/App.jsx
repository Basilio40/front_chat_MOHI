import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Loader2, Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react'
import './App.css'

const API_URL = 'https://web-production-bdf5b.up.railway.app/api/ask'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! Sou seu assistente de busca semântica. Faça uma pergunta e eu buscarei informações relevantes na base de conhecimento para te ajudar.',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pergunta: userMessage.content
        })
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const data = await response.json()

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.resposta || 'Desculpe, não consegui processar sua pergunta.',
        timestamp: new Date(),
        metadata: data.metadata
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Desculpe, ocorreu um erro ao processar sua pergunta. Verifique sua conexão e tente novamente.',
        timestamp: new Date(),
        isError: true
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Chat IA - Busca Semântica
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Assistente inteligente com base de conhecimento
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="h-[calc(100vh-200px)] flex flex-col shadow-xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <MessageSquare className="w-5 h-5" />
              Conversa
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'bot' && (
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : message.isError
                          ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2 gap-2">
                        <span className={`text-xs ${
                          message.type === 'user' 
                            ? 'text-white/70' 
                            : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </span>
                        
                        {message.metadata && (
                          <div className="flex gap-1">
                            {message.metadata.sources_found > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {message.metadata.sources_found} fontes
                              </Badge>
                            )}
                            {message.metadata.relevance_score && (
                              <Badge variant="outline" className="text-xs">
                                {Math.round(message.metadata.relevance_score * 100)}% relevância
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Processando sua pergunta...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t bg-white/50 dark:bg-slate-900/50 p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua pergunta aqui..."
                  disabled={isLoading}
                  className="flex-1 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                Pressione Enter para enviar • Shift+Enter para nova linha
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default App

