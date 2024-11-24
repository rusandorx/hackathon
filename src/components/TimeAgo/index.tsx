import { setDefaultOptions, formatDistanceToNow, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

interface TimeAgoProps {
  timestamp: string;
}

setDefaultOptions({ locale: ru });

export const TimeAgo = ({ timestamp }: TimeAgoProps) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} назад`;
  }

  return (
    <time dateTime={timestamp} title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </time>
  );
};
