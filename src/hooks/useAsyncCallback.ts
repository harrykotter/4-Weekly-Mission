import { useState } from "react";

function useAsyncCallback(callback: any) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<any>(null);

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
