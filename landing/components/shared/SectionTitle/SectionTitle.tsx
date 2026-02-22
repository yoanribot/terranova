const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-3 text-center mt-15 mb-15 ">
      <h2 className="text-4xl">{title}</h2>
    </div>
  );
};

export default SectionTitle;
