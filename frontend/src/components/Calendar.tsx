import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./Calendar.css";

export function Calendar() {
    return (
        <DayPicker
            captionLayout="dropdown"
            fixedWeeks
            startMonth={new Date(2020, 0)}
            endMonth={new Date(2035, 11)}
            modifiersStyles={{
                today: {
                    backgroundColor: "#654eb6",
                    color: "white",
                    borderRadius: "50%",
                },
            }}
        />
    );
}