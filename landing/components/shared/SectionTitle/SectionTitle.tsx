import { clsx } from "clsx";

const SectionTitle = ({
  title,
  withMarginTop = true,
}: {
  title: string;
  withMarginTop?: boolean;
}) => {
  return (
    <div
      className={clsx("flex flex-col gap-3 text-center mb-10", {
        "mt-20": withMarginTop,
      })}
    >
      <h2 className="text-4xl">{title}</h2>
    </div>
  );
};

export default SectionTitle;
