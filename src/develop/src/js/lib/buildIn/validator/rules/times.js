/**
 * Time format validation rule
 * @type {import('../types').ValidationRule}
 */
export const times = (val) => {
  if (!val) {
    return true;
  }

  // Check format using original regex pattern and add HH:MM:ss pattern
  if (!/^\d{1,2}$|^\d{1,2}\W{1}\d{1,2}$|^\d{1,2}\W{1}\d{1,2}\W{1}\d{1,2}$|^\d{2}\d{2}\d{2}$|^\d{2}:\d{2}(:\d{2})?$/.test(val)) {
    return false;
  }

  // Extract time components
  let hours;
  let minutes;
  let seconds = 0;

  if (val.includes(':')) {
    const parts = val.split(':');
    hours = Number(parts[0]);
    minutes = Number(parts[1]);
    if (parts.length === 3) {
      seconds = Number(parts[2]);
    }
  } else if (val.length === 6) {
    // Handle HHMMSS format
    hours = Number(val.substring(0, 2));
    minutes = Number(val.substring(2, 4));
    seconds = Number(val.substring(4, 6));
  } else if (val.length === 4) {
    // Handle HHMM format
    hours = Number(val.substring(0, 2));
    minutes = Number(val.substring(2, 4));
  } else {
    // Handle single or double digit format
    hours = Number(val);
    minutes = 0;
  }

  // Check if hours are between 0-23, minutes are between 0-59, and seconds are between 0-59
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59;
};
