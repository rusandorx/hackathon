import classNames from "classnames";
import { Port } from "../../store/slices/scanSlice";

import styles from "./index.module.scss";

interface PortWithStatus extends Port {
  open: boolean;
}

const Status = ({ open }: { open: boolean }) => {
  return (
    <div>
      {open ? (
        <div className="border border-emerald-500 rounded-lg p-2 flex justify-center items-center">
          OPEN
        </div>
      ) : (
        <div className="border border-rose-500 rounded-lg p-2 flex justify-center items-center">
          CLOSED
        </div>
      )}
    </div>
  );
};

const PortList = ({ open, closed }: { open: Port[]; closed: number[] }) => {
  const closedPorts: PortWithStatus[] = closed.map((port) => ({
    port,
    open: false,
  }));
  const openPorts: PortWithStatus[] = open.map((port) => ({
    ...port,
    open: true,
  }));
  const ports = [...openPorts, ...closedPorts];

  return (
    <div className="grid gap-4">
      <div
        className={classNames(
          "grid font-bold border-b-2 pb-2 gap-x-4",
          styles.portTable,
        )}
      >
        <div className="flex justify-center">Port Number</div>
        <div className="flex justify-center">Status</div>
        <div className="flex justify-center">Protocol</div>
        <div className="flex justify-center">Service</div>
        <div className="flex justify-center">Version</div>
        <div className="flex justify-center">Vulnerabilities</div>
      </div>
      {ports
        .slice()
        .sort((a, b) => {
          return a.port - b.port;
        })
        .map((port) => (
          <div
            key={port.port}
            className={classNames(
              "grid grid-cols-5 auto-rows-min border-b py-2 gap-x-4",
              styles.portTable,
            )}
          >
            <div className="break-all flex justify-center">{port.port}</div>
            <Status open={port.open} />
            <div className="break-all flex justify-center">{port.protocol}</div>
            <div className="break-all flex justify-center">{port.service}</div>
            <div className="break-all flex justify-center">{port.version}</div>
            <div>
              {port.vulnerabilities?.map((vuln, index) => (
                <div key={index} className="ml-4">
                  <p>Title: {vuln.title}</p>
                  <p>Description: {vuln.description}</p>
                  <p>Severity: {vuln.severity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PortList;
