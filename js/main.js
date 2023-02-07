import { timetableDetails_form, csvUpload_input, timetableTitle_input, coursesIdentifier_select, timetableContainer_div, timetableDetailsUI_div } from './dom.js'
import { getCSVStringFrom, cleanCSVString, getCourses, getDays, getTimestamps } from './csvParser.js'
import createTimetable from './table-creator.js'
import { lockScreenToLandscape, unlockScreenFromLandscape, showUploadUI, hideUploadUI, showTimetableUI, hideTimetableUI } from './ui.js'

hideTimetableUI()
//document.onclick = lockScreenToLandscape

/*Event listeners*/
/**

@event
@listens submit - listens for the submit event on the timetableDetails_form element
@param {Event} e - The submit event
This function is triggered when the timetableDetails_form is submitted. It gets the files from the csvUpload_input, the value of the timetableTitle_input and the selected value of the coursesIdentifier_select...
*/
timetableDetails_form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const csvFile = csvUpload_input.files[0]
  const timetableTitle = timetableTitle_input.value || 'My Timetable'
  const coursesIdentifier = coursesIdentifier_select.value.trim()

  const rawCsvString = await getCSVStringFrom(csvFile)
  const cleanedCSVString = cleanCSVString(rawCsvString)

  const courses = getCourses(cleanedCSVString)
  const timetable_table = createTimetable(courses, timetableTitle, coursesIdentifier)
  //console.log(timetable_table)
  if (timetable_table) {
    timetableDetailsUI_div.setAttribute('hidden', '')
    timetableContainer_div.removeAttribute('hidden')

    timetableContainer_div.append(timetable_table)
    //  lockScreenToLandscape(timetableContainer_div.parentNode)

    showTimetableUI()
    hideUploadUI()

  }

})


document.addEventListener("fullscreenchange", () => {
  const isFullscreen = !!document.fullscreenElement;

  if (isFullscreen) timetableContainer_div.parentNode.classList.add('d-flex')
  else timetableContainer_div.parentNode.classList.remove('d-flex')
})

document.getElementById('download').addEventListener('click', downloadTimetable)

document.getElementById('discard').addEventListener('click', () => {
  showUploadUI()
  hideTimetableUI()
  
})

function downloadTimetable(){
  
}