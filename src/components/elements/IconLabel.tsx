import Text from "./Text";
interface IconLabelProps {
  imgUrl? : string;
  title : string;
  className? : string;
  size : number
}

const IconLabel = ({ imgUrl, title, size,  className} : IconLabelProps) => {
  const widthClass = `w-${size}`
  const heightClass = `h-${size} w-${size} bg-red-100 rounded-full`
  return (
    <div className={widthClass}>
      <div 
      className={heightClass}
      >
      </div>
      <Text
        text={title}
        type='default'
        size={14}
        className="text-center mt-4"
      />
    </div>
  );
};

export default IconLabel;