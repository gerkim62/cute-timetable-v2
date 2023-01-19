import { readCSV, getCourses, getDays, getFormartedTimestamps, createBlankTimetable, fillBlankTimetable, showProperties, hideProperties, showToast, showCsvUploadUI, hideCsvUploadUI, preventElementOverflow, hide, show, convertElementToImage, downloadImage, showLoader, hideLoader, showCustomInstallPrompt, storeTimetable, retrieveTimetables, createThemeInputs, getCurrentTheme, storeCurrentTheme, getFileExtension, makeDraggable, saveCoursesToLocalStorage, retrieveCoursesFromLocalStorage, showTimetable } from './functions.js'
hideThemePicker()
const unscheduledLabel = 'No Class'
////console.log(retrieveTimetables(), 'updated')
/*const lastSavedTimetable = retrieveTimetableFromLocalStorage()
if(lastSavedTimetable){
  timetableContainer_div.innerHTML = lastSavedTimetable
}*/

showToast('loaded')
let courses = retrieveCoursesFromLocalStorage();

if(courses){
  //alert(courses)
  showTimetable(courses, unscheduledLabel)
}

customBtn.addEventListener("click", function() {
  realFileBtn.click();

});





//const csvString = getCsvString()

const fileInput = document.getElementById('real-file');
fileInput.addEventListener('change', event => {
  const file = event.target.files[0];
  console.log(file,"file")
  readCSV(file).then((csvString, error) => {
    console.log({csvString,error});

    courses = getCourses(csvString)
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
    saveCoursesToLocalStorage(courses)
    storeTimetable(timetable)
    
    ////console.log(finalTimetable)

    timetableContainer_div.append(finalTimetable)
    preventElementOverflow(finalTimetable, timetableContainer_div)
    hideCsvUploadUI()
    show(cta_div)
  }).catch(e => {
    console.log(e)
    showToast('Oops! Could not read file. Make sure the file is not corrupt or empty.')
  });
});

/*opening More properties of course*/

timetableContainer_div.addEventListener('click', e => {

  const target = e.target
  target.classList.contains('scheduled') ? showProperties(target.innerText.trim(), courses) : target.classList.contains('unscheduled') ? showToast('No class at that time.') : '';



})

/*ui elements*/

//newTimetable_li.addEventListener('click', showCsvUploadUI)

closePropertiesCard_button.addEventListener('click', hideProperties)
propertiesCardOverlay_div.addEventListener('click', hideProperties, showLoader, hideLoader)

save_button.addEventListener('click', async () => {
  ////console.log('click')
  showLoader()
  hideProperties()
  showToast('Convertion started...')
  const timetable = timetableContainer_div
  const scale = 5
  const imageStyle = {
    transform: 'scale(' + scale + ')',
    transformOrigin: 'top left',
    width: timetable.offsetWidth + "px",
    height: timetable.offsetHeight + "px"
  }

  const imageOptions = {
    width: timetable.offsetWidth * scale,
    height: timetable.offsetHeight * scale,
    quality: 1,
    style: imageStyle
  }

  const timetableDataUrl = await convertElementToImage(timetable, imageOptions)

  //////console.log(timetableDataUrl)
  downloadImage(timetableDataUrl, 'timetable.png')
  hideLoader()
  showToast('Convertion complete')
})

discard_button.addEventListener('click', () => {
  showCsvUploadUI()
  hide(cta_div)
  timetableContainer_div.querySelector('table').remove()
})

/*
//service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceWorker.js').then(function(registration) {
      ////console.log('ServiceWorker registration successful' with scope: ', registration.scope);
    }, function(err) {
      ////console.log('ServiceWorker registration failed: ', err);
    });
  });
}

//deferred events for sw
let prompted = false
window.addEventListener('beforeinstallprompt', (event) => {
  if (prompted) return
  event.preventDefault();
  showCustomInstallPrompt(event);
  prompted = true
});

*/

/*themes*/

//const themes = ['ocean-theme', 'desert-theme', 'forest-theme', 'teal-theme', 'olive-theme', 'maroon-theme', 'lime-theme', 'orange-theme', 'coral-theme', 'navy-theme', 'purple-theme', 'turquoise-theme', 'pink-theme', 'plum-theme', 'sky-theme', 'gold-theme', 'purple-sunshine'];

const themes = [{ name: "ocean-theme", colors: { primary: "#0077be", secondary: "#e6f7ff", accent: "#4db6ac", neutral: "#333333" } }, { name: "desert-theme", colors: { primary: "#e67e22", secondary: "#fdf2e9", accent: "#d35400", neutral: "#555555" } }, { name: "forest-theme", colors: { primary: "#2ecc71", secondary: "#eafaf1", accent: "#27ae60", neutral: "#444444" } }, { name: "teal-theme", colors: { primary: "#008080", secondary: "#e0ffff", accent: "#006666", neutral: "#444444" } }, { name: "olive-theme", colors: { primary: "#808000", secondary: "#f5f5dc", accent: "#556b2f", neutral: "#666666" } }, { name: "maroon-theme", colors: { primary: "#800000", secondary: "#f5f5f5", accent: "#663399", neutral: "#444444" } }, { name: "lime-theme", colors: { primary: "#32cd32", secondary: "#f0fff0", accent: "#228b22", neutral: "#444444" } }, { name: "orange-theme", colors: { primary: "#ffa500", secondary: "#fff5ee", accent: "#ff7f50", neutral: "#666666" } }, { name: "coral-theme", colors: { primary: "#ff7f50", secondary: "#fff5ee", accent: "#dc143c", neutral: "#666666" } }, { name: "navy-theme", colors: { primary: "#3498db", secondary: "#ecf0f1", accent: "#2980b9", neutral: "#555555" } }, { name: "purple-theme", colors: { primary: "#9b59b6", secondary: "#f3e5f5", accent: "#8e44ad", neutral: "#666666" } }, { name: "turquoise-theme", colors: { primary: "#1abc9c", secondary: "#e1f5fe", accent: "#16a085", neutral: "#444444" } }, { name: "pink-theme", colors: { primary: "#e91e63", secondary: "#fce4ec", accent: "#c2185b", neutral: "#666666" } }, { name: "plum-theme", colors: { primary: "#9b59b6", secondary: "#f3e5f5", accent: "#8e44ad", neutral: "#666666" } }];

//console.log(themes.length)

createThemeInputs(themesContainer_div, themes);

// Retrieve the current theme from local storage and apply it
const currentTheme = getCurrentTheme();
////console.log(currentTheme)
if (currentTheme) {
  document.querySelector(`input[value="${currentTheme}"`).setAttribute('checked', true);
}

// Store the current theme in local storage when it changes
document.querySelectorAll('input[name="theme"]').forEach(input => {
  input.addEventListener('change', event => {
    storeCurrentTheme(event.target.value);
  });
});

//hide(themesContainer_div)

//console.log(themePickerOverlay_div, themesContainer_div)

themesContainer_div.addEventListener('click', e => {
  // hide(themesContainer_div)
  const isOverlayClicked = (e.target.id === "theme-picker-overlay")

  isOverlayClicked && hideThemePicker()
})
//makeDraggable(themesContainerOpener_div)
themesContainerOpener_div.addEventListener('click', () => {
  const isThemePickerShowing = themesContainer_div.classList.contains('showing')
  // console.log(isThemePickerShowing)
  isThemePickerShowing ? hideThemePicker() : showThemePicker()
})

function showThemePicker() {
  themesContainer_div.style.transform = 'translateX(0%)'
  themesContainer_div.classList.add('showing')
  themesContainerOpener_div.style.transform = 'scale(.1)'
  show(themesContainer_div)
}

function hideThemePicker() {
  themesContainer_div.classList.remove('showing')
  themesContainer_div.style.transform = 'translateX(-100%)'
  themesContainerOpener_div.style.transform = 'scale(1)'
  hide(themesContainer_div)
}