import { FC, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAdvancedSettings } from "../../store/slices/advancedSettingsSlice";

interface AdvancedSettingsFormFields extends HTMLFormControlsCollection {
  scan_type: HTMLInputElement;
  version_detection: HTMLInputElement;
  version_intensity_value: HTMLInputElement;
  host_discovery: HTMLInputElement;
  timing: HTMLInputElement;
  min_rate: HTMLInputElement;
  max_rate: HTMLInputElement;
}

interface AdvancedSettingsFormElements extends HTMLFormElement {
  readonly elements: AdvancedSettingsFormFields;
}

const AdvancedSettingsForm = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useDispatch();
  const advancedSettings = useSelector(
    (state: RootState) => state.advancedSettingsSlice,
  );
  const [formState, setFormState] = useState(advancedSettings);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<AdvancedSettingsFormElements>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent the event from bubbling up to the outer form

    if (
      formState.min_rate &&
      formState.max_rate &&
      formState.max_rate < formState.min_rate
    ) {
      setError("Max_rate не может быть меньше min_rate");
      return;
    }

    setError(null);
    dispatch(setAdvancedSettings(formState));
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg p-6 w-96 text-black"
    >
      <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>
      <div className="flex flex-col gap-4">
        <label>
          Scan Type
          <select
            name="scan_type"
            value={formState.scan_type}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="-sS">-sS</option>
            <option value="-sT">-sT</option>
            <option value="-sU">-sU</option>
            <option value="-sA">-sA</option>
            <option value="-sN">-sN</option>
            <option value="-sF">-sF</option>
            <option value="-sX">-sX</option>
          </select>
        </label>
        <label>
          Version Detection
          <select
            name="version_detection"
            value={formState.version_detection ?? ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="-sV">-sV</option>
            <option value="-A">-A</option>
          </select>
        </label>
        <label>
          Version Intensity Value
          <input
            type="number"
            name="version_intensity_value"
            value={formState.version_intensity_value ?? ""}
            min={1}
            max={9}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </label>
        <label>
          Host Discovery
          <select
            name="host_discovery"
            value={formState.host_discovery ?? ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="-Pn">-Pn</option>
            <option value="-PS">-PS</option>
            <option value="-PA">-PA</option>
            <option value="-PE">-PE</option>
            <option value="-PP">-PP</option>
            <option value="-PM">-PM</option>
          </select>
        </label>
        <label>
          Timing
          <select
            name="timing"
            value={formState.timing ?? ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="-T0">-T0</option>
            <option value="-T1">-T1</option>
            <option value="-T2">-T2</option>
            <option value="-T3">-T3</option>
            <option value="-T4">-T4</option>
            <option value="-T5">-T5</option>
          </select>
        </label>
        <label>
          Min Rate
          <input
            type="number"
            name="min_rate"
            value={formState.min_rate ?? ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            min={1}
          />
        </label>
        <label>
          Max Rate
          <input
            type="number"
            name="max_rate"
            value={formState.max_rate ?? ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            min={1}
          />
        </label>
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 text-white bg-primary hover:bg-primary-dark font-medium rounded-md transition duration-150 ease-in-out w-full"
      >
        Save
      </button>
    </form>
  );
};

interface AdvancedSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedSettingsModal: FC<AdvancedSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <AdvancedSettingsForm closeModal={onClose} />
    </div>,
    document.body,
  );
};

export default AdvancedSettingsModal;
