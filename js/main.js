import {timetableDetails_form, csvUpload_input, timetableTitle_input, coursesIdentifier_select} from './dom.js'

/*Event listeners*/
timetableDetails_form.addEventListener('submit', (e)=>{
  e.preventDefault()
  
  const csvFile = csvUpload_input.files[0]
  
  console.log({csvFile})
})