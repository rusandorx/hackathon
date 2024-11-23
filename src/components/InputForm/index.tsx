import { type FC, useRef, useState } from "react";

import { Input } from "../";
import { setScanStatus } from "../../store/slices/scanSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface GetScanFormFields extends HTMLFormControlsCollection {
  ip: HTMLInputElement;
  ports: HTMLSelectElement;
}

interface GetScanFormElements extends HTMLFormElement {
  readonly elements: GetScanFormFields;
}

const InputForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scanId = useRef<string | null>(null);
  const [ports, setPorts] = useState<{ id: string; value: string }[]>([]);
  const [customPorts, setCustomPorts] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomPorts(e.target.value === "custom");
  };

  const handleAddPort = () => {
    setPorts([...ports, { id: uuidv4(), value: "" }]);
  };

  const handleRemovePort = (id: string) => {
    setPorts(ports.filter((port) => port.id !== id));
  };

  const handlePortChange = (id: string, value: string) => {
    setPorts(ports.map((port) => (port.id === id ? { ...port, value } : port)));
  };

  const handleSubmit = async (e: React.FormEvent<GetScanFormElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const ip = elements.ip.value;
    const portsValue = elements.ports.value;

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL ?? ""}/scans/`,
      {
        method: "POST",
        body: JSON.stringify({
          targets: [ip],
          portsType: portsValue,
          ports,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    dispatch(setScanStatus("loading"));
    const taskId = (await response.json()).task_id;

    navigate(`/scans/${taskId}`);

    scanId.current = (await response.json()).task_id;
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
            Укажите порты
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
            <option value="custom">Указать самому</option>
          </select>
          {customPorts && (
            <div className="flex flex-col items-center w-full mt-2">
              <button
                type="button"
                onClick={handleAddPort}
                className="px-4 py-2 text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-md transition duration-150 ease-in-out mb-2"
              >
                Добавить порт
              </button>
              <div className="w-full">
                {ports.map((port) => (
                  <div
                    key={port.id}
                    className="flex items-center justify-center mb-2"
                  >
                    <input
                      type="number"
                      value={port.value}
                      onChange={(e) =>
                        handlePortChange(port.id, e.target.value)
                      }
                      placeholder="Введите порт"
                      className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2 mr-2 max-w-48 flex-grow"
                      min={0}
                      max={65535}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePort(port.id)}
                      className="px-4 py-2 text-red-500 hover:text-white border border-red-500 hover:bg-red-500 font-medium rounded-md transition duration-150 ease-in-out"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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

