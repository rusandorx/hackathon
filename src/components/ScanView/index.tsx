import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import PortList from "../PortList";
import {
  ScanData,
  setScanData,
  setScanStatus,
} from "../../store/slices/scanSlice";

const ScanView = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const scanState = useSelector((state: RootState) => state.scanSlice);
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    const stopLoading = () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
      intervalId.current = null;
      dispatch(setScanStatus("done"));
    };

    const loadScan = async () => {
      console.log("hiiii");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL ?? ""}/scans/${id}`,
      );
      const scanData: ScanData = await response.json();

      dispatch(setScanData(scanData));

      if (scanData?.end) {
        stopLoading();
      }

      return scanData;
    };

    intervalId.current = setInterval(loadScan, 1000);
    loadScan();
  }, [dispatch, id]);

  return (
    <div className="p-4">
      {scanState.data?.ips.map((ipData) => (
        <div key={ipData.ip} className="mb-4 p-4 border rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">IP: {ipData.ip}</h2>
          <p className="mb-2">PTR: {ipData.ptr}</p>
          <div className="mb-2">
            <PortList open={ipData.ports.open} closed={ipData.ports.closed} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScanView;
