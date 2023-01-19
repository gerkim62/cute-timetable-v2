


export function getFormartedTimestamps(courses) {
  const timestamps = getTimestamps(courses)

  
}

let showingPropertiesFor = null
export async function showProperties(courseCode, courses) {
  propertiesCard_div.classList.add('hidden')
  if (!showingPropertiesFor) propertiesCard_div.style.opacity = 0.2
  const alreadyShowing = courseCode === showingPropertiesFor
  propertiesCard_div.classList.remove('hidden')
  propertiesCardOverlay_div.classList.remove('hidden')
  //console.log(courseCode, courses)
  ;
  (!alreadyShowing || !showingPropertiesFor === null) ? await fadeOut(propertiesCard_div): ""
  courses.forEach(course => {
    if (course.code === courseCode) {
      courseCode_p.innerHTML = course.code
      courseGroup_p.innerHTML = course.option
      courseTitle_p.innerHTML = course.title
      courseVenue_p.innerHTML = course.venue
      courseBuilding_p.innerHTML = course.building
      courseLocation_p.innerHTML = course.location
      courseInstructor_p.innerHTML = course.instructor

      //propertiesCard_div.style.
    }
  });
  (!alreadyShowing || showingPropertiesFor === null) ? await fadeIn(propertiesCard_div): ""
  showingPropertiesFor = courseCode
  propertiesCard_div.style.opacity = 1

}

export function showCsvUploadUI() {
  fileUploadUI_div.classList.remove('hidden')
}

export function hideCsvUploadUI() {
  fileUploadUI_div.classList.add('hidden')
}

export function showToast(message, duration = 3000) {
  const animationDuration = 500
  propertiesCard_div.classList.add('hidden')
  const toastDurationInMillisecond = duration + animationDuration
  //console.log({ duration })
  const toast = document.createElement('div');
  toast.innerText = message
  toast.className = 'show toast'
  document.body.append(toast)
  setTimeout(() => {
    toast.remove()
  }, toastDurationInMillisecond);
}

export async function fadeOut(element) {
  // element.classList.remove('fade-in')
  //console.log("out fade")

  return new Promise((resolve, reject) => {
    if (!showingPropertiesFor) return resolve()
    element.classList.add('fade-out')
    element.addEventListener('animationend', () => {
      //console.log("out fade after event")
      element.classList.remove('fade-out')

      resolve()
    })
  })
}

export async function fadeIn(element) {
  //element.classList.remove('fade-out')
  //console.log("fade in")
  return new Promise((resolve, reject) => {
    element.classList.add('fade-in')
    element.addEventListener('animationend', () => {
      element.classList.remove('fade-in')
      //console.log('end')
      resolve()
    })
  })
}

export async function hideProperties() {
  await fadeOut(propertiesCard_div)
  propertiesCard_div.classList.add('hidden')
  propertiesCardOverlay_div.classList.add('hidden')
  showingPropertiesFor = null
}

export function storeTimetable(timetable) {
  let storedTimetables = JSON.parse(localStorage.getItem('timetables'));
  if (!storedTimetables) {
    storedTimetables = [];
  }
  storedTimetables.push(timetable);
  localStorage.setItem('timetables', JSON.stringify(storedTimetables));
}

export const retrieveTimetables = () => JSON.parse(localStorage.getItem('timetables')) || [];

export async function convertElementToImage(element, options) {
  try {
    const dataUrl = await domtoimage.toPng(element, options);
    return dataUrl;
  } catch (error) {
    console.error(error);
  }
}

function isOverflowing(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function getWidth(element) {
  // Get the computed style of the element
  let computedStyle = window.getComputedStyle(element);

  // Get the style property for width
  let width = element.style.width
  // Get the offset width of the element
  let offsetWidth = element.offsetWidth;

  // Get the client width of the element
  let clientWidth = element.clientWidth;

  // Calculate the width using all possible methods
  let widthCalculated = Math.min(
    parseInt(computedStyle.width),
    offsetWidth,
    clientWidth
  );

  // Return the width
  //console.log({widthCalculated})
  return widthCalculated;
}

function getScaleToFit(parent) {
  // Check if the element is overflowing its container
  if (isOverflowing(parent)) {
    // Calculate the scale factor to fit the parent within its container
    const scaleX = getWidth(parent) / parent.scrollWidth;
    const scaleY = Infinity //parent.clientHeight / parent.scrollHeight;
    const scale = Math.min(scaleX, scaleY);

    // Return the scale factor
    return scale;
  }

  // Return 1 if the parent is not overflowing its container
  return 1;
}

export function preventElementOverflow(element, parent) {

  const scale = getScaleToFit(parent)
  //console.log(scale, element)
  element.style.transform = `scale(${scale/1.1})`

}

export function show(element) {
  element.classList.remove('hidden')
}

export function hide(element) {
  element.classList.add('hidden')
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


export function showLoader() {
  show(loader_div)
}
export function hideLoader() {
  hide(loader_div)
}

export function showTimetable(courses, unscheduledLabel) {
  console.log(courses)


  console.log(courses)
  const allDays = getDays(courses)
  if (allDays.length === 0) return showToast('Oops! That file does not seem to contain a valid CSV timetable. Please check.', 5000)
  console.log(allDays)
  const allTimestampsFormarted = getFormartedTimestamps(courses)
  console.log(allTimestampsFormarted)
  const blankTimetable = createBlankTimetable({ leftHeaders: allDays, topHeaders: allTimestampsFormarted, intersection: '<p>Time</p> <p>Days</p>', blankCellLabel: unscheduledLabel })
  ////////console.log(blankTimetable)
  const finalTimetable = fillBlankTimetable(blankTimetable, courses, unscheduledLabel)
 // saveTimetableToLocalStorage(finalTimetable)
  const timetable = {
    name: '',
    id: 1,
    courses,
    allDays,
    allTimestampsFormarted
  }

  //storeTimetable(timetable)

  ////console.log(finalTimetable)

  timetableContainer_div.append(finalTimetable)
  preventElementOverflow(finalTimetable, timetableContainer_div)
  hideCsvUploadUI()
  show(cta_div)
}

export function showSavedTimetables() {
  const timetables = retrieveTimetables()


}

export function createThemeInputs(themesContainer, themes) {
  themes.forEach(theme => {
    const input = `<input type="radio" id="${theme.name}" name="theme" value="${theme.name}">
  <label id='${theme.name}-label' for="${theme.name}">${theme.name.split('-')[0]}</label>`

    themesContainer.innerHTML += input

    const theme_input = themesContainer.querySelector(`#${theme.name}`)
    const theme_label = themesContainer.querySelector(`#${theme.name}-label`)

    theme_label.style.backgroundColor = theme.colors.primary

    //console.log(theme_label,theme_label.style)
    // themesContainer.appendChild(input);
    /*
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'theme';
    input.value = theme;
    input.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--${theme}-primary`);
    themesContainer.appendChild(input);*/
  });
}

// Function to store the current theme in local storage
export function storeCurrentTheme(theme) {
  localStorage.setItem('currentTheme', theme);
}

// Function to retrieve the current theme from local storage
export function getCurrentTheme() {
  return localStorage.getItem('currentTheme');
}


export function makeDraggable(element) {
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  element.addEventListener("mousedown", dragStart);
  element.addEventListener("mouseup", dragEnd);
  element.addEventListener("mousemove", drag);
  element.addEventListener("touchstart", dragStart);
  element.addEventListener("touchend", dragEnd);
  element.addEventListener("touchmove", drag);
  //dragStart({type:''})
  function dragStart(e) {
    console.log(e.touches[0].clientY)
    if (e.type === "mousedown") {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    } else {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    }

    if (e.target === element) {
      isDragging = true;
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    isDragging = false;
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      if (e.type === "mousemove") {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      } else {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      }

      xOffset = currentX;
      yOffset = currentY;

      element.style.top = currentY + "px";
      element.style.left = currentX + "px";
    }
  }
}

export function saveCoursesToLocalStorage(courses) {

  localStorage.setItem("courses", JSON.stringify(courses));
}

export function retrieveCoursesFromLocalStorage() {
  // Retrieve the content from local storage
  return JSON.parse(localStorage.getItem('courses'));

}