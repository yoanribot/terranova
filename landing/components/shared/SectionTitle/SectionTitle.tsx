import { clsx } from "clsx";

const SectionTitle = ({
  title,
  subtitle,
  withMarginTop = true,
}: {
  title: string;
  subtitle?: string;
  withMarginTop?: boolean;
}) => {
  return (
    <div
      className={clsx("text-left mb-10", {
        "mt-20": withMarginTop,
      })}
    >
      <h2 className={`text-4xl mb-3 font-medium flex`}>
        <img
          src={"/assets/teeth_black_white.png"}
          className="h-10 inline-block mr-2"
        />
        {title}
      </h2>
      {subtitle && (
        <h3 className={`text-center text-6xl mb-4 poiretOne`}> {subtitle} </h3>
      )}
    </div>
  );
};

export default SectionTitle;
