interface Props {
  title: string;
  description: string;
  findMore: boolean;
  className?: string
}
const TitleSection = (data: Props) => {
  return (
    <div className='w-full flex flex-col gap-3 mt-5'>
      <p className='text-[#92400e]'>{data.title}</p>
      <div className={`w-full ${data.className}`}>
        <h1 className={`text-3xl w-1/2 ${data.className}`}>{data.description}</h1>
        {data.findMore ? (
          <p className={`text-sm w-1/4 text-[#C2C0BF] ${data.className}`}>
              Tìm hiểu thêm
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TitleSection;
