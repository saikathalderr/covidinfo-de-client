import clsx from "clsx";

type CountCardProps = {
  title: string;
  count: number;
  className?: string;
};

function CountCard({ title, count, className }: CountCardProps) {
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
