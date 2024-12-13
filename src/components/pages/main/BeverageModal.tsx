"use client";
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import { SwiperSlide } from "swiper/react";
import { debounce } from "lodash";
import SwiperCore from "swiper";
import BottomModal from "@/components/elements/BottomModal";
import SwiperModule from "@/components/elements/SwiperModule";
import {
  drinkList,
  fruitList,
  liquorList,
  ginList,
  rumList,
  syrupList,
} from "@/data/beverage";
import useModalStore from "@/store/useModalStore";
import useSearchHandler from "@/hooks/useSearchHandler";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import TabContents from "./TabContents";
import useAppStore from "@/store/useAppStore";

interface BeverageModalProps {
  modalId: string;
}
interface tabListProps {
  title: string;
  list: { name: string; eng: string }[];
}

const BeverageModal = ({ modalId }: BeverageModalProps) => {
  // console.log("beverage modal");

  const tabList = [
    { title: "🍹 리큐르", list: liquorList },
    { title: "🍸 진", list: ginList },
    { title: "🥂 럼", list: rumList },
    { title: "🧋 음료", list: drinkList },
    { title: "🍍 과일", list: fruitList },
    { title: "🍯시럽", list: syrupList },
    // { title: "주류", list: liquorCategoryList },
  ];

  const { closeModal } = useModalStore();
  const { handleSearch } = useSearchHandler();
  const { setPathLoading } = useAppStore();
  const pathname = usePathname();

  const swiperRef = useRef<SwiperCore | null>(null);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);

  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(),
  );
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isMainPage, setMainPage] = useState<boolean>(true);
  const scrollToContent = (index: number) => {
    if (contentRefs.current[index]) {
      contentRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setMainPage(pathname === "/");
  }, [pathname]);

  // tab 클릭시, 해당 위치로 스크롤 이동
  const handleTab = debounce((index: number) => {
    setSelectedTab(index);
    scrollToContent(index);
  }, 50);

  // 스크롤에 따라 tab 메뉴 Swipe
  // IO 설정
  const handleTabIO = debounce((index: number) => {
    setSelectedTab(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  }, 200);

  // 스크롤 감시를 위한 IO설정 & ref 전달
  useIntersectionObserver(contentRefs.current, handleTabIO);

  // 필터 적용 클릭 시, router 이동 & item전달
  const handleApply = async () => {
    // console.log(selectedOptions)
    let filterItem = Array.from(selectedOptions).join(", ");
    if (isMainPage && filterItem) {
      // 전역 state로 부모 요소의 의존성을 변경하여, 로딩 시작 & router 변경
      setPathLoading();
    }
    // console.log("searchQuery", filterItem);
    handleSearch("filter", filterItem);
    closeModal(modalId);
    setSelectedOptions(new Set()); // Set을 빈 상태로 초기화
  };

  // SwiperMoudule 사용을 위한 slides template
  const slides = useMemo(
    () =>
      tabList.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="mx-auto w-1/2 cursor-pointer"
            onClick={() => handleTab(index)}
          >
            <div
              className={`${
                selectedTab === index
                  ? "text-white font-medium"
                  : "text-neutral-500"
              } text-center py-4`}
            >
              {slide.title.slice(2)}
            </div>
          </div>
        </SwiperSlide>
      )),
    [selectedTab, handleTab],
  );

  // 선택 상태 업데이트 함수
  const toggleOption = useCallback((label: string) => {
    setSelectedOptions((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(label)) {
        newSelected.delete(label);
      } else {
        newSelected.add(label);
      }
      return newSelected;
    });
  }, []);

  const hasOption = useCallback(
    (label: string) => selectedOptions.has(label),
    [selectedOptions],
  );

  // tabContents template
  const ContentsMemo = React.memo(
    ({
      tabList,
      contentRefs,
      toggleOption,
      hasOption,
    }: {
      tabList: tabListProps[];
      contentRefs: React.MutableRefObject<(HTMLElement | null)[]>;
      toggleOption: (label: string) => void;
      hasOption: (label: string) => boolean;
    }) => {
      // console.log("contenteMemo");
      return (
        <div className="modal-tab">
          {tabList.map((tab: tabListProps, index: number) => (
            <TabContents
              key={index}
              title={tab.title}
              list={tab.list}
              toggleOption={toggleOption} // 상태 변경 함수 전달
              hasOption={hasOption} // 선택 여부 조회 함수 전달
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      );
    },
  );
  ContentsMemo.displayName = "ContentsMemo";

  return (
    <BottomModal
      id={modalId}
      tab={
        <SwiperModule
          loop={false}
          navigation={false}
          pagination={false}
          slidesPerView={3.6}
          slides={slides}
          freeMode={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        />
      }
      content={
        <ContentsMemo
          tabList={tabList}
          contentRefs={contentRefs}
          toggleOption={toggleOption}
          hasOption={hasOption}
        />
      }
      onPrimaryAction={handleApply}
    />
  );
};

export default React.memo(BeverageModal);
