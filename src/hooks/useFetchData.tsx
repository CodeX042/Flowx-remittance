import { useState, useEffect, useMemo } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

// Define the types for the API response
interface ApiResponse<T> {
  data: T;
}

interface UseApiCallResult<T> {
  response: any;
  loading: boolean;
  error: string | null;
}

// Define the type for the parameters
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const useApiCall = <T,>(
  url: string,
  method: HttpMethod = "GET",
  data: any = null,
  config: object = {}
): UseApiCallResult<T> => {
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize data and config to prevent unnecessary re-renders
  const memoizedData = useMemo(() => data, [JSON.stringify(data)]);
  const memoizedConfig = useMemo(() => config, [JSON.stringify(config)]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res: AxiosResponse<ApiResponse<T>> = await axios({
          method,
          url,
          data: memoizedData,
          ...memoizedConfig,
        });
        setResponse(res?.data); // Assuming the response data is inside `data` key
        setLoading(false);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, [method, url, memoizedData, memoizedConfig]);

  return { response, loading, error };
};

export default useApiCall;
