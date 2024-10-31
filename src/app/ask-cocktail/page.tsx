"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import ChattingRoom from "@/components/pages/main/ChattingRoom";
import SearchBar from "@/components/elements/SearchBar";
import useChatStore from "@/store/useChatStore";
import useModalStore from "@/store/useModalStore";
import useSearchStore from "@/store/useSearchStore";
import BeverageModal from "@/components/pages/main/BeverageModal";
import { fetchSearchResults } from "@/api";
import searchGpt from "@/utils/searchGpt";

const AskCocktailPage = () => {
  
  const { updateChatMessage } = useChatStore();
  const [searchText, setSearchText] = useState("");
  const { searchQuery: query, updateQuery } = useSearchStore();
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    setSearchText(query);
  }, [query]);

  
  const handleSearch = async () => {
    searchGpt({
      searchText, 
      setSearchText, 
      fetchSearchResults, 
      updateChatMessage, 
      // finalCallback
    })
    // setSearchText("");
    // updateChatMessage(searchText, "user");
    // try {
    //   const rsp = await fetchSearchResults(searchText);
    //   if (rsp && rsp.data) {
    //     updateChatMessage(rsp.data.response, "gpt");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // updateQuery("");
  };


  const { openModal } = useModalStore();
  const modalId = "beverage";
  const handleModal = () => {
    openModal(modalId);
    console.log("clicked");
  };
  return (
    <div className="">
      <div className="pb-14">
        <ChattingRoom />
      </div>
      <div className="fixed bottom-0 h-14 bg-[#2f2f2f] px-4 pt-2 w-full right-0 flex ">
        <div
          className="bg-stone-700 w-8 h-8 rounded-full mt-[2px] mr-2"
          onClick={handleModal}
        ></div>

        <div className="w-11/12">
          <SearchBar
            onChange={handleInputChange}
            onSearchClick={handleSearch}
            value={searchText}
          />
        </div>
      </div>
      <BeverageModal modalId={modalId} />
    </div>
  );
};

export default AskCocktailPage;
