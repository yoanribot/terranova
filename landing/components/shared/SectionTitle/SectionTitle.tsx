const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-3 text-center mt-10 mb-15 ">
      <h2 className="text-4xl">{title}</h2>
      <img
        className="max-w-md mx-auto w-full"
        src="/separator.png"
        alt="separator"
      />
    </div>
  );
};

export default SectionTitle;
