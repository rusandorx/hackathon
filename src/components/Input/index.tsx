import { FC, useCallback, useRef, useState } from "react";

import Typewriter from "typewriter-effect/dist/core";
import { ipPattern } from "../../utils";
import { multipleIpPattern } from "../../utils/regEx";

const inputExamples = [
  "192.168.1.0",
  "Google.com",
  "0.0.0.0-255.255.255.255",
  "172.31.0.0/16",
];

const Input: FC = () => {
  const input = useRef<HTMLInputElement | null>(null);
  const [ipFormat, setIpFormat] = useState<string>("single");

  const customNodeCreator = useCallback((character: unknown) => {
    if (input.current?.placeholder) {
      input.current.placeholder = input.current.placeholder + character;
    }
    return null;
  }, []);

  const onRemoveNode = useCallback(() => {
    if (input.current?.placeholder) {
      input.current.placeholder = input.current?.placeholder.slice(0, -1);
    }
  }, []);

  new Typewriter(null, {
    strings: inputExamples,
    autoStart: true,
    loop: true,
    delay: 75,
    onCreateTextNode: customNodeCreator,
    onRemoveNode: onRemoveNode,
  });

  return (
    <>
      <div className="mb-4">
        <label className="font-semibold mr-2 flex justify-center">
          Выберите формат IP адреса
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="ip-format"
              value="single"
              checked={ipFormat === "single"}
              onChange={() => setIpFormat("single")}
            />
            Один IP
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="ip-format"
              pattern={multipleIpPattern}
              value="multiple"
              checked={ipFormat === "multiple"}
              onChange={() => setIpFormat("multiple")}
            />
            Несколько IP
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="ip-format"
              value="range"
              checked={ipFormat === "range"}
              onChange={() => setIpFormat("range")}
            />
            Диапазон
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="ip-format"
              value="cidr"
              checked={ipFormat === "cidr"}
              onChange={() => setIpFormat("cidr")}
            />
            CIDR
          </label>
        </div>
      </div>

      <label htmlFor="ip-address" className="font-semibold mr-2">
        Введите IP адрес
      </label>
      {ipFormat === "single" && (
        <input
          type="text"
          id="ip-address"
          pattern={ipPattern}
          ref={input}
          placeholder="192.168.1.0"
          name="ip"
          className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
          required
        />
      )}
      {ipFormat === "multiple" && (
        <input
          id="ip-address"
          ref={input}
          placeholder="192.168.1.0 192.168.1.1 0.0.0.1"
          name="ip"
          className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
          required
        />
      )}
      {ipFormat === "range" && (
        <div className="flex gap-2">
          <input
            type="text"
            id="ip-range-start"
            placeholder="192.168.0.0"
            name="ip-start"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
            required
          />
          <span className="text-3xl font-light">-</span>
          <input
            type="text"
            id="ip-range-end"
            placeholder="192.168.0.255"
            name="ip-end"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
            required
          />
        </div>
      )}
      {ipFormat === "cidr" && (
        <div className="flex gap-2">
          <input
            type="text"
            id="ip-cidr-mask"
            placeholder="192.168.0.0"
            name="ip-mask"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
            required
          />
          <span className="text-3xl font-light">/</span>
          <input
            type="text"
            id="ip-cidr-byte"
            placeholder="24"
            name="ip-byte"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
            required
          />
        </div>
      )}
    </>
  );
};

export default Input;

