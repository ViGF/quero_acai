import { Loading as Spin } from "@/icons";

export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary">
      <span className="animate-spin">
        <Spin />
      </span>
    </div>
  );
}
