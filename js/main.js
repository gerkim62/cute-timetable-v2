import {timetableDetails_form, csvUpload_input, timetableTitle_input, coursesIdentifier_select} from './dom.js'
import {getCSVStringFrom, cleanCSVString, getCourses, getDays, getTimestamps} from './csvParser.js'
import {formatTimestamps} from './utils.js'
import createTimetable from './table-creator.js'

/*Event listeners*/
/**

@event
@listens submit - listens for the submit event on the timetableDetails_form element
@param {Event} e - The submit event
This function is triggered when the timetableDetails_form is submitted. It gets the files from the csvUpload_input, the value of the timetableTitle_input and the selected value of the coursesIdentifier_select...
*/
timetableDetails_form.addEventListener('submit', async (e)=>{
  e.preventDefault()
  
  const csvFile = csvUpload_input.files[0]
  const timetableTitle = timetableTitle_input.value
  const coursesIdentifier = coursesIdentifier_select.value
  
  const rawCsvString = await getCSVStringFrom(csvFile)
  const cleanCSVString = cleanCSVString(rawCsvString)
  
  const courses = getCourses(cleanCSVString)
  const timetable_table = createTimetable(courses)
  console.log({timetable_table})
})