import { isToday } from "date-fns";
import { useNavigate } from "react-router-dom";

import { useCalendar } from "@/features/calendar/contexts/calendar-context";

import { cn } from "@/lib/utils";

import type { IEvent } from "@/features/calendar/interfaces";

interface IProps {
  day: number;
  date: Date;
  events: IEvent[];
}

export function YearViewDayCell({ day, date, events }: IProps) {
  const navigate = useNavigate();
  const { setSelectedDate } = useCalendar();

  const maxIndicators = 3;
  const eventCount = events.length;

  const handleClick = () => {
    setSelectedDate(date);
    navigate("/appointments/calendar/day");
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex h-11 flex-1 flex-col items-center justify-start gap-0.5 rounded-md pt-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full text-xs font-medium text-foreground",
          isToday(date) && "bg-primary font-semibold text-primary-foreground"
        )}
      >
        {day}
      </div>

      {eventCount > 0 && (
        <div className="mt-0.5 flex gap-0.5">
          {eventCount <= maxIndicators ? (
            events.map(event => (
              <div
                key={event.id}
                className={cn(
                  "size-1.5 rounded-full",
                  event.color === "blue" && "bg-blue-600 dark:bg-blue-500",
                  event.color === "green" && "bg-green-600 dark:bg-green-500",
                  event.color === "red" && "bg-red-600 dark:bg-red-500",
                  event.color === "yellow" && "bg-yellow-600 dark:bg-yellow-500",
                  event.color === "gray" && "bg-neutral-600 dark:bg-neutral-500"
                )}
              />
            ))
          ) : (
            <>
              <div
                className={cn(
                  "size-1.5 rounded-full",
                  events[0].color === "blue" && "bg-blue-600 dark:bg-blue-500",
                  events[0].color === "green" && "bg-green-600 dark:bg-green-500",
                  events[0].color === "red" && "bg-red-600 dark:bg-red-500",
                  events[0].color === "yellow" && "bg-yellow-600 dark:bg-yellow-500",
                  events[0].color === "gray" && "bg-neutral-600 dark:bg-neutral-500"
                )}
              />
              <span className="text-[7px] text-muted-foreground">+{eventCount - 1}</span>
            </>
          )}
        </div>
      )}
    </button>
  );
}
