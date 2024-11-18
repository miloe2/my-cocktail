import { useEffect, useState } from "react";
import { SQLChatData } from "@/types/types";

const useIndexedMessageDB = () => {
  const dbName = "today_cocktail";
  const storeName = "t_message";
  const [db, setDb] = useState<IDBDatabase | null>(null);
  // let isDBInitialized = false;

  const initDB = () => {
    console.trace("initDB called");
    // console.trace("initDB called");
    // if (isDBInitialized) return; // 이미 초기화된 경우 실행 중단
    // console.log('13', isDBInitialized)
    // isDBInitialized = true;
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
        console.log("Database initialized successfully.");
      }
    };

    request.onerror = () => {
      console.error("Database initialization failed:", request.error);
    };
  };

  useEffect(() => {
    console.trace("initDB called");
    initDB();
  }, []);

  // ############### addData ##################
  const addData = async (data: SQLChatData) => {
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
    if (!db) {
      console.error("Database is not initialized.");
      return [];
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

  return { addData, getAllData };
};

export default useIndexedMessageDB;
