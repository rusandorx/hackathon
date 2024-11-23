import { type FC } from "react";

import { MainLayout } from "../layouts";
import { useParams } from "react-router-dom";
import ScanView from "../components/ScanView";

const ScanPage: FC = () => {
  const { scanId } = useParams();

  return (
    <MainLayout>
      <main className="min-h-screen max-w-5xl mx-auto mt-8 flex flex-col items-center justify-start text-secondary">
        <ScanView id={scanId} />
      </main>
    </MainLayout>
  );
};
export default ScanPage;
