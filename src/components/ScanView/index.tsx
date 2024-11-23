import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
            {ipData.ports.open.map((port) => (
              <div key={port.port} className="mb-2 p-2 border rounded-md">
                <p>Port: {port.port}</p>
                {/* <p>Type: {port.type}</p> */}
                <p>Protocol: {port.protocol}</p>
                <p>Service: {port.service}</p>
                <p>Version: {port.version}</p>
                <div>
                  <h4 className="font-semibold">Vulnerabilities:</h4>
                  {port.vulnerabilities.map((vuln) => (
                    <div
                      key={`${ipData.ip}-${port.port}-${vuln.title}`}
                      className="ml-4"
                    >
                      <p>Title: {vuln.title}</p>
                      <p>Description: {vuln.description}</p>
                      <p>Severity: {vuln.severity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Closed Ports:</h3>
            <p>{ipData.ports.closed.join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScanView;
