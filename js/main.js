import { timetableDetails_form, csvUpload_input, timetableTitle_input, timetableContainer_div, timetableDetailsUI_div, coursesIdentifier_select } from './dom.js'
import { getCSVStringFrom, cleanCSVString, getCourses, getDays, getTimestamps } from './csvParser.js'
import createTimetable from './table-creator.js'
import { lockScreenToLandscape, unlockScreenFromLandscape, showUploadUI, hideUploadUI, showTimetableUI, hideTimetableUI, updatePreferredCoursesIdentifier } from './ui.js'
import { convertElementToImage, downloadImage } from './utils.js'

//todo:move this to their file 
const courseCode_p = document.getElementById('code')
const courseTitle_p = document.getElementById('title')
const courseVenue_p = document.getElementById('venue')
const courseLocation_p = document.getElementById('location')
const courseGroup_p = document.getElementById('group')
const courseBuilding_p = document.getElementById('building')
const courseInstructor_p = document.getElementById('instructor')

const propertiesCard_div = document.getElementById('properties-custom-card')
const closePropertiesCard_button = document.getElementById('close-properties')
hideTimetableUI()
hide(propertiesCard_div)
const timetable_obj = JSON.parse(localStorage.getItem('timetable_obj'))
const prefersFullscreen = JSON.parse(localStorage.getItem('prefersFullscreen'))
console.log(prefersFullscreen)
//console.log((timetable_obj))
if (timetable_obj) showTimetable(timetable_obj)


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

  const timetable_obj = { title: timetableTitle, courses }

  localStorage.setItem('timetable_obj', JSON.stringify(timetable_obj));

  showTimetable(timetable_obj)

})


document.addEventListener("fullscreenchange", () => {
  const isFullscreen = !!document.fullscreenElement;

  if (isFullscreen) {
    //hide(document.getElementById('download'))
    timetableContainer_div.parentNode.classList.add('d-flex')
  }
  else {
    //show(document.getElementById('download'))
    timetableContainer_div.parentNode.classList.remove('d-flex')
  }
})

document.getElementById('fullscreen').addEventListener('click', fullscreenTimetable)

//document.getElementById('download').addEventListener('click', downloadTimetable)


document.getElementById('discard').addEventListener('click', () => {

  hideTimetableUI()
  showUploadUI()

  timetableContainer_div.querySelector('table').remove();

})

async function fullscreenTimetable() {
  console.log('started...')
  lockScreenToLandscape(timetableContainer_div.parentNode)





}

async function downloadTimetable() {
  const img = await convertElementToImage(timetableContainer_div)
  console.log(timetableContainer_div)
  downloadImage(img, `timetable-${new Date().toUTCString()}.png`)

}

function showProperties(courseCode, courses) {
  courses.forEach(course => {
    if (course.code === courseCode) {
      courseCode_p.innerHTML = course.code
      courseGroup_p.innerHTML = course.option
      courseTitle_p.innerHTML = course.title
      courseVenue_p.innerHTML = course.venue
      courseBuilding_p.innerHTML = course.building
      courseLocation_p.innerHTML = course.location
      courseInstructor_p.innerHTML = course.instructor

      show(propertiesCard_div)
    }
  });
}

function hide(element) {
  element.setAttribute('hidden', '')
  element.classList.add('hide')
}

function show(element) {
  element.removeAttribute('hidden')
  element.classList.remove('hide')
}




function showTimetable({ courses, title }) {
  const coursesIdentifier = 'code'
  const timetable_table = createTimetable(courses, title, coursesIdentifier)
  console.log(timetable_table)
  if (timetable_table) {
    timetableDetailsUI_div.setAttribute('hidden', '')
    timetableContainer_div.removeAttribute('hidden')

    timetableContainer_div.append(timetable_table)

    showTimetableUI()
    hideUploadUI()


    Array.from(timetable_table.querySelectorAll('td')).forEach(td => {
      td.addEventListener("mouseenter", function(e) {
        console.log(e.target)
        const code = e.target.getAttribute('data-code')
        if (!code) return hide(propertiesCard_div)
        showProperties(code, courses)
      });
    })


    /* Array.from(timetable_table.querySelectorAll('td')).forEach(td => {
      td.addEventListener("mouseleave", function(e) {
        if (enteredPropertiesCard) {
          //const code = e.target.getAttribute('data-code');
          hide(propertiesCard_div);
          console.log(e.target)
        }
      });

    })
*/
  }
}

addEventListener('click', (e) => {
  const target = e.target
  console.log(target)
  if (target == closePropertiesCard_button) return hide(propertiesCard_div)
  if (target.classList.contains('scheduled') || target == propertiesCard_div || propertiesCard_div.contains(target)) return false

  hide(propertiesCard_div)
})



coursesIdentifier_select.addEventListener('change', (e) => {
  const preferredCoursesIdentifier = e.target.options[e.target.selectedIndex].value;

  timetable_obj && updatePreferredCoursesIdentifier({ identifier: preferredCoursesIdentifier, courses: timetable_obj.courses, timetableContainer: timetableContainer_div })
})

document.getElementById('auto-fullscreen').addEventListener('change',e=>{
  if(e.target.checked){
    console.log('selected')
    localStorage.setItem('prefersFullscreen',true)
  }else{
    console.log('unchecked')
    localStorage.setItem('prefersFullscreen',false)
  }
})