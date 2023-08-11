import React, { useEffect, useState } from "react";

//  npx json-server --watch data/db.json --port 9000

export const useFetch = <T>(url: string, initialState: T): [T, boolean] => {
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

    //without timeout below
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, [url]);

  return [data, loading];
};
