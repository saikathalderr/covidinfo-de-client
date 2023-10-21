import clsx from "clsx";

type CountCardProps = {
  title: string;
  count: number;
  isLoading?: boolean;
  className?: string;
};

function CountCard({ title, count, isLoading, className }: CountCardProps) {
  if (isLoading) {
    return (
      <div
        className={clsx({
          "animate-pulse py-10 flex flex-col items-center justify-center": true,
          [`${className}`]: true,
        })}
      >
        <p className="text-[.6rem] uppercase font-semibold">{title}</p>
        <p className="animate-pulse bg-black/5 h-6 w-28"></p>
      </div>
    );
  }

  return (
    <div
      className={clsx({
        "py-10 flex flex-col items-center justify-center": true,
        [`${className}`]: true,
      })}
    >
      <p className="text-[.6rem] uppercase font-semibold">{title}</p>
      <p className="text-[1rem] font-mono">{count}</p>
    </div>
  );
}

export default CountCard;
