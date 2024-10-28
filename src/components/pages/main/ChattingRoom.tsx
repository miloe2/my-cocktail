import React, { useEffect, useRef } from 'react'
import useChatStore from '@/store/useChatStore';
import ChatBubble from '@/components/elements/ChatBubble';

const ChattingRoom = () => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { isChatStart, chatMessages,  } = useChatStore();
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);
  return (
        <div className="bg-red- flex flex-col">
          <div>isChatStart {isChatStart.toString()}</div>
          <div>
            {
            chatMessages.map((chat) => (
              <ChatBubble
              key={chat.msg}
              user={chat.user}
              msg={chat.msg}
              />
            ))
            }
            <div ref={chatEndRef} className='' />
          </div>


        </div>

  )
}

export default ChattingRoom