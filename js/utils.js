/**
 * convertTo12HourFormat - converts a 24 hour time format to 12 hour format
 * @param {String} time - the time in 24 hour format (HH:mm)
 * @returns {String} - the time in 12 hour format (HH:mmAM/PM)
 *
 * This function takes a 24 hour format time string, extracts the hours and minutes, converts the hours to 12 hour format, appends AM or PM, and returns the final time in the format of "HH:mmAM/PM".
 */
export const convertTo12HourFormat = time => {
  let hours = Number(time.slice(0, 2));
  const minutes = time.slice(3, 5);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? `0${hours}` : hours;
  return `${hours}:${minutes}${ampm}`;
};

/**
 * sanitizeName - sanitizes a string to be used as a file name
 * @param {String} name - the input string
 * @returns {String} - the sanitized string
 *
 * This function performs the following operations on the input string:
 * - Removes any characters that are not letters, numbers, periods, underscores, or hyphens
 * - Replaces all dots except the last one with spaces
 * - Add the .png extension if it is not already included
 */
function sanitizeName(name) {
  // Remove any characters that are not letters, numbers, periods, underscores, or hyphens
  let sanitizedName = name.replace(/[^a-zA-Z0-9\.\_\-]/g, '');

  // Replace all dots except the last one with spaces
  sanitizedName = sanitizedName.replace(/\./g, (match, offset, string) => {
    return offset === string.lastIndexOf('.') ? match : ' ';
  });

  // Add the .png extension if it is not already included
  return sanitizedName.endsWith('.png') ? sanitizedName : `${sanitizedName}.png`;
}

/**
 * getFileExtension - returns the file extension of a file
 * @param {File} file - the file whose extension is to be returned
 * @returns {String} - the file extension
 *
 * This function takes a File object and returns the file extension by splitting the file name by the '.' character and returning the last element in the resulting array
 */
export function getFileExtension(file) {
  var fileName = file.name;
  var fileNameParts = fileName.split('.');
  var fileExtension = fileNameParts[fileNameParts.length - 1];
  return fileExtension;
}

export const formatTimestamp = timestamp => {
  const start = convertTo12HourFormat(timestamp.start);
  const end = convertTo12HourFormat(timestamp.end);
  return `<p>${start}</p> <p>${end}</p>`;
};
export function formatTimestamps(timestamps){
  return timestamps.map(timestamp => formatTimestamp(timestamp))
}


export async function convertElementToImage(element, options) {
  try {
    //alert('starting to call domtoimage')
    const imageOptions = {
      width: timetable.offsetWidth * scale,
      height: timetable.offsetHeight * scale,
      quality: 1,
      style: imageStyle
    }
    const dataUrl = await domtoimage.toPng(element, imageOptions);
    return dataUrl;
  } catch (error) {
    console.error(error);
  }
}

export function downloadImage(dataUrl, name) {
  // Sanitize the file name
  const fileName = sanitizeName(name);

  // Create a link element
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;

  // Append the link to the DOM
  document.body.appendChild(link);

  // Click the link to download the image
  link.click();

  // Remove the link from the DOM
  document.body.removeChild(link);
}

