"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import ChattingRoom from "@/components/pages/main/ChattingRoom";
import SearchBar from "@/components/elements/SearchBar";
import useChatStore from "@/store/useChatStore";
import useModalStore from "@/store/useModalStore";
import useSearchStore from "@/store/useSearchStore";
import BeverageModal from "@/components/pages/main/BeverageModal";
import { searchQuery } from "@/api";

const AskCocktailPage = () => {
  const { updateChatMessage } = useChatStore();
  const [searchText, setSearchText] = useState("");
  const [log, setLog] = useState("");
  const { searchQuery: query, updateQuery } = useSearchStore();

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {
    setSearchText("");
    updateChatMessage(searchText, "user");
    try {
      const rsp = await searchQuery(searchText);
      if (rsp && rsp.data) {
        updateChatMessage(rsp.data.response, "gpt");
        setLog(`응답 받음: ${JSON.stringify(rsp.data)}`);
      }
    } catch (error) {
      console.log(error);
      setLog(`오류 발생: ${error}`);
      console.log(log);
    }
    updateQuery("");
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
