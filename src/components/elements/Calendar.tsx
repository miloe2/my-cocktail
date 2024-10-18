interface CalendarProps {
  className : string;
}

const Calendar = ({
  className 
} : CalendarProps) => {
  return (
    <div className={`${className}`}>
      calendar
    </div>
  );
};

export default Calendar;