function FormatDate(dateString) {
  const date = new Date(dateString);

  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get individual components of the date
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Determine the appropriate suffix for the day
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  // Format the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to ensure two digits
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the final formatted string
  return `${month} ${day}${suffix} ${year} at ${hours}:${formattedMinutes}${ampm}`;
}

export default FormatDate;
