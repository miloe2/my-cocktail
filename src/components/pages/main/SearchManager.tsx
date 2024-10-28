"use client";
import { useState, ChangeEvent, useEffect } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { searchQuery } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import SearchHints from "./SearchHints";
import useChatStore from "@/store/useChatStore";
import ChatBubble from "@/components/elements/ChatBubble";

const SearchManager = () => {
  const { isChatStart, chatMessages, updateChatMessage } = useChatStore();
  const [searchText, setSearchText] = useState("");
  const { searchQuery: query } = useSearchStore();

  // const debouncedQuery = useCallback(
  //   debounce((value: string) => {
  //     updateQuery(value);
  //     console.log('searchQuery', searchQuery);
  //   }, 1000),
  //   [],
  // );

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // debouncedQuery(searchText);
  };
  const handleSearch = async () => {
    try {
      const rsp = await searchQuery(searchText);
      if(rsp && rsp.data) {
        updateChatMessage(searchText, 'user');
        updateChatMessage(rsp.data.response, 'gpt');
      }
    } catch (error) {
      console.log(error)      
    }
    // setResult(rsp)
    // console.log("검색어", searchText);
  };
  return (
    <div className="flex flex-col w-full">
      {isChatStart ? (
        <>
          <SearchBar
            onChange={handleInputChange}
            onSearchClick={handleSearch}
            value={searchText}
          />
          <div className="-mr-4 mt-4">
            <SearchHints />
          </div>
          {/* <div> 
            {
            chatMessages.map((msg) => (
              <div key={msg.time.toISOString()}>
                <div>{msg.msg}</div>
              </div>
            ))
            }
          </div> */}
        </>
      ) : (
        <div className="bg-red- flex flex-col">
          <div>isChatStart {isChatStart.toString()}</div>
          <div>

          </div>
          <ChatBubble          user="user"/>
          <ChatBubble          user="gpt"/>
          <ChatBubble          user="user"/>
          <ChatBubble          user="user"/>
          <ChatBubble          user="gpt"/>
          <ChatBubble          user="gpt"/>

          {/* <div>
      {chatMessages.map((message) => (
        <div key={message.time.toISOString()} className={`message ${message.user}`}>
          <span className="time">{message.time.toLocaleTimeString()}</span>
          <span className="user">{message.user}</span>
          <p className="msg">
            {typeof message.msg === 'string' ? message.msg : JSON.stringify(message.msg)}
          </p>
        </div>
      ))}
    </div> */}

        </div>
      )}
    </div>
  );
};

export default SearchManager;
