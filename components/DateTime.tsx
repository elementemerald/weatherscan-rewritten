import * as React from "react";
import { useRouter } from "next/router";

interface DateTimeProps {
    tz: string
}

const DateTime = ({ tz }: DateTimeProps) => {
    const router = useRouter();
    const [date, setDate] = React.useState<string>("Jan 01");
    const [time, setTime] = React.useState<string>("12:00:00pm");

    const stdTimezoneOffset = (date: Date) => {
        var jan = new Date(date.getFullYear(), 0, 1);
        var jul = new Date(date.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };
    
    const isDstObserved = (date: Date) => {
        return date.getTimezoneOffset() < stdTimezoneOffset(date);
    };

    const updateTime = () => {
        const date = new Date();
        
        const formatDate = date.toString().slice(4, 10).trimEnd();
        const formatTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
            minute: "numeric",
            second: "numeric",
            timeZone: tz
        }).replace(/ /g, "").toLowerCase();

        setDate(formatDate);
        setTime(formatTime);
    };

    React.useEffect(() => {
        let interval: NodeJS.Timer;

        if (tz !== "") {
            updateTime();
            interval = setInterval(updateTime, 500);
        }

        return () => clearInterval(interval);
    }, [tz]);

    return (
        <div id="date-time" className="absolute top-date-time-t w-date-time font-interstate font-bold text-shadow-none text-right text-dark">
            <div id="date" className="font-interstate-mono text-date leading-date font-bold text-shadow-none text-right text-dark">{date}</div>
            <div id="time" className="font-interstate-mono text-date leading-date font-bold text-shadow-none text-right text-dark">{time}</div>
        </div>
    );
};

export default DateTime;
