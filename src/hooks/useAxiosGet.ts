import axios from "axios";
import { useEffect, useState } from "react";

export const useAxiosGet = <T>(url: string, initialState: T): [T, boolean] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>(initialState);

  useEffect(() => {
    setLoading(true);

    // timeout added to see the loading...
    // setTimeout(() => {
    //   fetch(url)
    //     .then((response) => response.json())
    //     .then((json) => setData(json))

    //     .finally(() => setLoading(false));
    // }, 1500);

    axios
      .get(url)
      .then((response) => setData(response.data))
      .finally(() => setLoading(false));
  }, [url]);

  return [data, loading];
};
