import { useState } from "react";

function useAsyncCallback(callback: any) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<any>(null);
  // TODO
  // 에러 상태일 때 setError(false) 확인해보기
  const wrappedFunction = async (...args: any[]) => {
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

export default useAsyncCallback;
