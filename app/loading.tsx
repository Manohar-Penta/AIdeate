import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <div className="p-4 text-3xl text-center h-[75vh] flex items-center justify-center">
      <CgSpinner size={"3rem"} className="animate-spin" />
    </div>
  );
}
