import { useState, useEffect } from 'react'

export function useData(url: string): any {
  const [data, setData] = useState(null)
  useEffect(() => {
    let ignore = false
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!ignore) setData(data)
      })
    return () => { ignore = true }
  }, [url])
  return data
}