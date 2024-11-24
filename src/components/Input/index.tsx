import { FC, useCallback, useEffect, useRef, useState } from "react";

import Typewriter from "typewriter-effect/dist/core";
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
      input.current.placeholder = " ";
    }
  }, []);

  useEffect(() => {
    new Typewriter(null, {
      strings: inputExamples,
      autoStart: true,
      loop: true,
      delay: 75,
      onCreateTextNode: customNodeCreator,
      onRemoveNode: onRemoveNode,
    });
  }, [customNodeCreator, onRemoveNode]);

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
          // pattern={ipPattern}
          ref={input}
          placeholder=" "
          name="ip"
          className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
          required
        />
      )}
      {ipFormat === "multiple" && (
        <input
          id="ip-address"
          ref={input}
          placeholder=" "
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
            ref={input}
            placeholder=" "
            name="ip-start"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
            required
          />
          <span className="text-3xl font-light">-</span>
          <input
            type="text"
            id="ip-range-end"
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
            ref={input}
            placeholder=" "
            name="ip-mask"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
            required
          />
          <span className="text-3xl font-light">/</span>
          <select
            id="ip-cidr-byte"
            name="ip-byte"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
            required
          >
            {Array(33)
              .fill(0)
              .map((v, i) => i)
              .slice(25, 33)
              .map((v: number) => {
                return (
                  <option key={v} value={v.toString()}>
                    {v}
                  </option>
                );
              })}
          </select>
        </div>
      )}
    </>
  );
};

export default Input;
