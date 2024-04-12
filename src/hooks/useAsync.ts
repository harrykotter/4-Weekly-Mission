import { useState } from "react";

function useAsync<T>(callback: (args?: any) => Promise<any>) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<any>(null);
  // TODO
  // 에러 상태일 때 setError(false) 확인해보기
  const wrappedFunction: (args?: any) => Promise<T> = async (...args) => {
    try {
      setPending(true);
      setError(null);
      return await callback(...args);
    } catch (error) {
      setError(error);
    } finally {
      setPending(false);
    }
  };

  return { pending, error, wrappedFunction };
}

export default useAsync;
