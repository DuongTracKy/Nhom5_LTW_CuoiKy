import { useEffect, useState } from 'react';

// Custom Hook được học trong Buổi 9: dùng useEffect để gọi API/JSON.
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Không thể lấy dữ liệu (HTTP ${response.status})`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadData();
    return () => controller.abort(); // cleanup khi component unmount
  }, [url, reload]);

  return { data, loading, error, retry: () => setReload(n => n + 1) };
}
