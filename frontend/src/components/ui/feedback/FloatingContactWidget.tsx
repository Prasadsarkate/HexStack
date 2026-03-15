"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot, Phone, Calendar, ArrowLeft, Send } from "lucide-react";

type Message = { id: string; text: string; sender: "user" | "ai" };

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi! I'm the HexStack AI. How can I help you today?", sender: "ai" }
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showChat]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) { // Reset views when reopening
        setShowForm(false);
        setShowChat(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const userMsg = currentInput.trim();
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userMsg, sender: "user" }]);
    setCurrentInput("");

    // Simulated AI Response Logic
    setTimeout(() => {
      let aiResponse = "Thanks for your message! Our human team will get back to you shortly.";
      
      const lowerInput = userMsg.toLowerCase();
      if (lowerInput.includes("pricing") || lowerInput.includes("cost")) {
        aiResponse = "Our pricing varies based on project scope. Web apps start around $200, and complex enterprise software depends on your features. Would you like to schedule a meeting to get a precise quote?";
      } else if (lowerInput.includes("service") || lowerInput.includes("do you do")) {
        aiResponse = "We specialize in Web Development, Custom Software Engineering, UI/UX Design, AI & Automation, and SEO Optimization. What specific area are you interested in?";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        aiResponse = "Hello there! Are you looking to build a new product or scale an existing one?";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), text: aiResponse, sender: "ai" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
           <motion.div
             initial={{ opacity: 0, y: 20, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 20, scale: 0.95 }}
             transition={{ duration: 0.2 }}
             className="absolute bottom-20 right-0 w-80 md:w-96 bg-background border border-border/50 shadow-2xl rounded-2xl p-5 mb-2 overflow-hidden flex flex-col"
             style={{ minHeight: showChat ? '400px' : 'auto' }}
           >
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
             
             {/* Dynamic Views */}
             <AnimatePresence mode="wait">
               {/* 1. Main Menu */}
               {!showForm && !showChat && (
                 <motion.div
                   key="menu"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.2 }}
                 >
                   <h3 className="text-lg font-bold text-center mb-4 text-foreground relative z-10">
                     How can we help you?
                   </h3>
                   
                   <div className="flex flex-col gap-3 relative z-10">
                     <button 
                       onClick={() => setShowChat(true)}
                       className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                     >
                       <Bot className="w-5 h-5" /> Chat with AI Assistant
                     </button>
       
                     <a 
                       href="tel:+919918309983" 
                       className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-accent/50 hover:bg-accent text-foreground rounded-xl font-medium transition-colors border border-border/50"
                       onClick={() => setIsOpen(false)}
                     >
                       <Phone className="w-5 h-5" /> Call Us
                     </a>
       
                     <a 
                       href="https://wa.me/919918309983?text=Hello%20HexStack%2C%20I%20want%20to%20use%20your%20service." 
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-medium transition-colors"
                       onClick={() => setIsOpen(false)}
                     >
                       <MessageCircle className="w-5 h-5" /> WhatsApp
                     </a>
       
                     <button 
                       onClick={() => setShowForm(true)}
                       className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors"
                     >
                       <Calendar className="w-5 h-5" /> Schedule Meeting
                     </button>
                   </div>
                 </motion.div>
               )}

               {/* 2. Schedule Form */}
               {showForm && (
                 <motion.div
                   key="form"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   transition={{ duration: 0.2 }}
                 >
                   <button 
                     onClick={() => setShowForm(false)}
                     className="absolute top-5 left-5 text-muted-foreground hover:text-foreground z-20"
                     aria-label="Back to menu"
                   >
                     <ArrowLeft className="w-5 h-5" />
                   </button>
                   <h3 className="text-lg font-bold text-center mb-4 text-foreground relative z-10">
                     Schedule a Meeting
                   </h3>
                   <form 
                     className="space-y-3 relative z-10 mt-2"
                     action="https://formsubmit.co/hexstack1@gmail.com" 
                     method="POST"
                   >
                      <input type="hidden" name="_subject" value="New Meeting Request - HexStack" />
                      <input type="hidden" name="_captcha" value="false" />
                      
                      <input type="text" name="Name" placeholder="Your Name" required className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"/>
                      <input type="email" name="Email" placeholder="Your Email" required className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"/>
                       <div className="grid grid-cols-2 gap-3">
                         <input type="date" name="Preferred Date" aria-label="Preferred Meeting Date" required className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"/>
                         <input type="time" name="Preferred Time" aria-label="Preferred Meeting Time" required className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"/>
                       </div>
                      <textarea name="Agenda" placeholder="What would you like to discuss?" rows={2} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"/>
                      <button type="submit" className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm mt-2">
                        Request Meeting
                      </button>
                   </form>
                 </motion.div>
               )}

               {/* 3. AI Chat Interface */}
               {showChat && (
                 <motion.div
                   key="chat"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   transition={{ duration: 0.2 }}
                   className="flex flex-col h-[360px]"
                 >
                   {/* Header */}
                   <div className="flex items-center pb-3 border-b border-border/50 relative z-20 shrink-0">
                     <button 
                       onClick={() => setShowChat(false)}
                       className="text-muted-foreground hover:text-foreground mr-3"
                       aria-label="Back to menu"
                     >
                       <ArrowLeft className="w-5 h-5" />
                     </button>
                     <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                         <Bot className="w-4 h-4" />
                       </div>
                       <div>
                         <h3 className="font-bold text-sm leading-tight">HexStack AI</h3>
                         <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                           <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                         </span>
                       </div>
                     </div>
                   </div>

                   {/* Messages Area */}
                   <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin scrollbar-thumb-accent relative z-10">
                     {messages.map((msg) => (
                       <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                         <div 
                           className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                             msg.sender === 'user' 
                               ? 'bg-primary text-primary-foreground rounded-br-sm' 
                               : 'bg-accent/50 text-foreground border border-border/50 rounded-bl-sm'
                           }`}
                         >
                           {msg.text}
                         </div>
                       </div>
                     ))}
                     <div ref={messagesEndRef} />
                   </div>

                   {/* Input Area */}
                   <form onSubmit={handleSendMessage} className="relative z-20 mt-2 shrink-0">
                     <div className="relative flex items-center">
                       <input
                         type="text"
                         value={currentInput}
                         onChange={(e) => setCurrentInput(e.target.value)}
                         placeholder="Type your message..."
                         className="w-full bg-accent/30 border border-border/50 rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                       />
                       <button
                         type="submit"
                         disabled={!currentInput.trim()}
                         className="absolute right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 transition-opacity"
                         aria-label="Send message"
                       >
                         <Send className="w-4 h-4 ml-0.5" />
                       </button>
                     </div>
                   </form>
                 </motion.div>
               )}
             </AnimatePresence>
           </motion.div>
        )}
      </AnimatePresence>

       <motion.button
         onClick={handleToggle}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className="w-16 h-16 bg-gradient-brand text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow"
         aria-label={isOpen ? "Close contact options" : "Open contact options"}
         title={isOpen ? "Close" : "Contact Us"}
       >
        <AnimatePresence mode="wait">
          {isOpen ? (
             <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
               <X className="w-7 h-7" />
             </motion.div>
          ) : (
             <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
               <MessageCircle className="w-7 h-7" />
             </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
