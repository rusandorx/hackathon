import { type FC, useRef } from "react";

import { Input } from "../";
import { setScanStatus } from "../../store/slices/scanSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface GetScanFormFields extends HTMLFormControlsCollection {
  ip: HTMLInputElement;
}

interface GetScanFormElements extends HTMLFormElement {
  readonly elements: GetScanFormFields;
}

const InputForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scanId = useRef<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<GetScanFormElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const ip = elements.ip.value;

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL ?? ""}/scans/`,
      {
        method: "POST",
        body: JSON.stringify({ targets: [ip] }),
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
