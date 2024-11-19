import { useEffect, useState } from "react";
import { SQLChatData } from "@/types/types";
import useAppStore from "@/store/useAppStore";

const useIndexedMessageDB = () => {
  const dbName = "today_cocktail";
  const storeName = "t_message";
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [isDBReady, setIsDBReady] = useState(false);
  const { setUUID } = useAppStore();

  const initDB = async () => {
    console.log("init!!!!!!!!!!!!!");

    // 모든 쿠키를 객체로 변환
    const cookies = document.cookie.split("; ").reduce(
      (acc, currentCookie) => {
        const [name, value] = currentCookie.split("=");
        acc[name] = value;
        return acc;
      },
      {} as Record<string, string>,
    );

    // 쿠키에서 uuid 가져오기
    if (cookies.user_uuid) {
      setUUID(cookies.user_uuid);
    } else {
      console.warn("user_uuid not found in cookies.");
    }

    if (!window.indexedDB) {
      console.error("This browser doesn't support indexedDB.");
      return;
    }

    // IndexedDB 초기화
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (database && !database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (database) {
        setDb(database);
        setIsDBReady(true); // DB 준비 완료
        console.log("Database initialized successfully.");
      }
    };

    request.onerror = () => {
      console.error("Database initialization failed:", request.error);
    };
  };

  // ############### addData ##################
  const addData = async (data: SQLChatData) => {
    console.log(db);
    if (!db) {
      console.error("Database is not initialized.");
      return;
    }

    try {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(data);

      await new Promise((resolve, reject) => {
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });

      console.log("Data added successfully:", data);
    } catch (error) {
      console.error("Failed to add data:", error);
    }
  };

  // ############### getAllData ##################
  const getAllData = async () => {
    console.log("ALLLLLLLLLLLL!!!!!!!!!!!!!");

    if (!db) {
      console.error("Database is not initialized.");
      return ["데이터 없음"];
    }

    try {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);

      const data = await new Promise<SQLChatData[]>((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  };

  useEffect(() => {
    initDB();
  }, []);

  return { addData, getAllData, initDB, isDBReady };
};

export default useIndexedMessageDB;
