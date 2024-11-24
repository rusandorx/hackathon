import { type FC, useRef, useState } from "react";

import { Input } from "../";
import { setScanStatus } from "../../store/slices/scanSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface GetScanFormFields extends HTMLFormControlsCollection {
  ip?: HTMLInputElement;
  "ip-start"?: HTMLInputElement;
  "ip-end"?: HTMLInputElement;
  "ip-mask"?: HTMLInputElement;
  "ip-byte"?: HTMLSelectElement;
  "ip-format": HTMLInputElement;
  ports: HTMLInputElement;
  "custom-ports"?: HTMLInputElement;
}

interface GetScanFormElements extends HTMLFormElement {
  readonly elements: GetScanFormFields;
}

const InputForm: FC = () => {
  const navigate = useNavigate();
  const scanId = useRef<string | null>(null);
  const [customPorts, setCustomPorts] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomPorts(e.target.value === "custom");
  };

  const handleSubmit = async (e: React.FormEvent<GetScanFormElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const ipFormat = elements["ip-format"].value;
    const singleFieldIp = elements.ip?.value;
    const ipStart = elements["ip-start"]?.value;
    const ipEnd = elements["ip-end"]?.value;
    const ipMask = elements["ip-mask"]?.value;
    const ipByte = elements["ip-byte"]?.value.toString();

    let ip: string;

    switch (ipFormat) {
      case "single":
      case "multiple": {
        ip = singleFieldIp!;
        break;
      }
      case "range": {
        ip = ipStart + ":" + ipEnd;
        break;
      }
      case "cidr": {
        ip = ipMask + "/" + ipByte;
        break;
      }
      default: {
        ip = "stfu";
        break;
      }
    }

    const portType = elements.ports.value;
    const ports = elements["custom-ports"]?.value;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL ?? ""}/scans/`,
        {
          method: "POST",
          body: JSON.stringify({ ip, portType, ports }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const taskId = (await response.json()).task_id;

      navigate(`/scans/${taskId}`);

      scanId.current = taskId;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center rounded-md p-4"
    >
      <div className="flex flex-col items-center flex-grow gap-2 w-full">
        <Input />
        <div className="flex flex-col items-center w-full">
          <label htmlFor="ports" className="font-semibold mr-2">
            Выберите порты
          </label>
          <select
            id="ports"
            name="ports"
            onChange={handleSelectChange}
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
          >
            <option value="10">Топ 10 портов</option>
            <option value="100">Топ 100 портов</option>
            <option value="1000">Топ 1000 портов</option>
            <option value="custom">Указать свои порты</option>
          </select>
          {customPorts && (
            <input
              id="custom-ports"
              pattern="(\d+\s?)+"
              name="custom-ports"
              placeholder="1-80 100-200 8080"
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2 mt-2"
              required
            />
          )}
        </div>
        <div className="flex flex-col items-center w-full">
          <label htmlFor="location">Выберите локацию</label>
          <select
            id="location"
            name="location"
            onChange={handleSelectChange}
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
          >
            <option value="Rtu Mirea">РТУ Мирэа</option>
            <option value="Localhost">Localhost</option>
          </select>
        </div>
        <button
          type="submit"
          className="ml-2 px-4 py-2 text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-md transition duration-150 ease-in-out"
        >
          Сканировать
        </button>
      </div>
    </form>
  );
};

export default InputForm;
