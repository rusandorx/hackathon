import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PortList from "../PortList";

const ScanView: FC = () => {
  const scanState = useSelector((state: RootState) => state.scanSlice);

  if (scanState.status === "idle" || !scanState.data) {
    return null;
  }

  return (
    <div className="p-4">
      {scanState.data.ips.map((ipData) => (
        <div key={ipData.ip} className="mb-4 p-4 border rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">IP: {ipData.ip}</h2>
          <p className="mb-2">PTR: {ipData.ptr}</p>
          <div className="mb-2">
            <h3 className="text-lg font-semibold">Open Ports:</h3>
            <PortList open={ipData.ports.open} closed={ipData.ports.closed} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScanView;
