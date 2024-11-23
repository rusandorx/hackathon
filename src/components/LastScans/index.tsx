import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";

const LastScans = () => {
  const dispatch = useDispatch();
  const lastScans = useSelector(
    (state: RootState) => state.globalSlice.lastScans,
  );

  useEffect(() => {
    if (!lastScans.length) {
      fetch(`${import.meta.env.VITE_API_BASE_URL ?? ""}/scans/last`)
        .then((response) => response.json())
        .then((lastScans) => {
          // TODO: да ебаный в рот блять
          console.log(lastScans);
        });
    }
  }, []);

  return null;
};

export default LastScans;
