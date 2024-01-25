
import { useState, useEffect } from "react";

export function useData<T>(url: string): T | undefined {
    const [data, setData] = useState<T>();
    useEffect(() => {
        let ignore = false;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "mode": "no-cors",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!ignore) setData(data);
            });
        return () => {
            ignore = true;
        };
    }, [url]);
    return data;
}
