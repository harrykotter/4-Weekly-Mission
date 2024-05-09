import { useState } from "react";

function useAsync<T = any>(callback: (args?: any) => Promise<any>) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<any>(null);
  const wrappedFunction: (...args: any) => Promise<T> = async (...args) => {
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
