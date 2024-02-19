import { useEffect, useState } from "react";

export default function useOnline(){
    const [online, setOnline] = useState(typeof window !== "undefined" && navigator.onLine);

    useEffect(() => {
        const handleOnlineStatusChange = () => {
            setOnline(navigator.onLine);
        };

        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);
        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, []);

    return online;
};