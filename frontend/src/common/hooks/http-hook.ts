import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (url: string, method = "GET", body?: any, headers?: any) => {
      setIsLoading(true);
      let start = new Date().getTime();

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl: AbortController) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        let end = new Date().getTime();

        const notFlashLoadingSpinner = () => {
          if (end - start < 200) {
            setTimeout(() => {
              setIsLoading(false);
            }, 200);
          } else {
            setIsLoading(false);
          }
        };
        notFlashLoadingSpinner();

        return responseData;
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
          setError(err.message);
          setIsLoading(false);
          throw err;
        }
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl: AbortController) =>
        abortCtrl.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
