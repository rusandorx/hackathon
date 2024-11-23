import { type FC, useRef } from "react";

import { Input } from "../";
import {
  ScanData,
  setScanData,
  setScanStatus,
} from "../../store/slices/scanSlice";
import { useDispatch } from "react-redux";

interface GetScanFormFields extends HTMLFormControlsCollection {
  ip: HTMLInputElement;
}

interface GetScanFormElements extends HTMLFormElement {
  readonly elements: GetScanFormFields;
}

const InputForm: FC = () => {
  const dispatch = useDispatch();
  const intervalId = useRef<number | null>(null);
  const scanId = useRef<string | null>(null);

  const stopLoading = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }
    intervalId.current = null;
    scanId.current = null;
    dispatch(setScanStatus("done"));
  };

  const handleSubmit = async (e: React.FormEvent<GetScanFormElements>) => {
    e.preventDefault();

    if (intervalId.current !== null) {
      dispatch(setScanData(null));
      stopLoading();
    }

    const { elements } = e.currentTarget;
    const ip = elements.ip.value;

    // TODO: Parse ip here

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL ?? ""}/scan/`,
      {
        method: "POST",
        body: JSON.stringify({ targets: [ip] }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    scanId.current = (await response.json()).task_id;
    dispatch(setScanStatus("loading"));

    intervalId.current = setInterval(async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL ?? ""}/scan/${scanId.current}`,
      );
      const scanData: ScanData = await response.json();

      dispatch(setScanData(scanData));

      if (scanData?.end) {
        stopLoading();
      }
    }, 500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center rounded-md p-4"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-center flex-grow gap-2">
          <Input />
          <button
            type="submit"
            className="ml-2 px-4 py-2 text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-md transition duration-150 ease-in-out"
          >
            Сканировать
          </button>
        </div>
        {/* <div className='flex flex-col items-center flex-grow gap-2'>
					<Input />
					<button
						type='submit'
						className='px-4 py-2 text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-md transition duration-150 ease-in-out'>
						Сканировать
					</button>
				</div> */}
      </div>
    </form>
  );
};

export default InputForm;
