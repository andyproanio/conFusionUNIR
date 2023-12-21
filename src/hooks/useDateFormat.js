import { useState, useEffect } from "react";

export const useDateFormat = (date) => {
  
  const [dateFormat, setdateFormat] = useState("")

  useEffect(() => {
    setdateFormat(
      new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(date)))
    );
  }, [date])

  return { dateFormat }
}
