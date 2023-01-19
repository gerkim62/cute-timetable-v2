import {UNSCHEDULED_CLASS_LABEL} from './constants.js'

/**
 * createBlankTimetable - creates a blank timetable table
 * @param {Object} options - options for creating the timetable table
 * @param {Array} options.leftHeaders - an array of left headers for the timetable table
 * @param {Array} options.topHeaders - an array of top headers for the timetable table
 * @param {String} options.intersection - the label for the intersection of the left and top headers
 * @param {String} options.blankCellLabel - the label for the blank cells in the timetable table
 * @return {HTMLTableElement} - the created timetable table element
 */
 function createBlankTimetable({ leftHeaders, topHeaders, intersection='<p>Time</p> <p>Days</p>', blankCellLabel }) {
  const timetable_table = document.createElement('table')


  const topHeaders_tr = document.createElement('tr')
  topHeaders_tr.classList.add('timestamps')
  const intersection_th = document.createElement('th')
  intersection_th.innerHTML = intersection
  topHeaders_tr.append(intersection_th)

  timetable_table.append(topHeaders_tr)

  topHeaders.forEach(topHeader => {
    const topHeader_th = document.createElement('th')
    topHeader_th.innerHTML = topHeader
    topHeaders_tr.append(topHeader_th)
  })

  leftHeaders.forEach(leftHeader => {
    const leftHeader_tr = document.createElement('tr')

    const headerName_th = document.createElement('th')
    headerName_th.innerHTML = leftHeader
    headerName_th.classList.add('day')
    leftHeader_tr.append(headerName_th)

    topHeaders.forEach(topHeader => {
      const cell_td = document.createElement('td')
      cell_td.setAttribute(`data-top-header`, topHeader);
      cell_td.setAttribute(`data-left-header`, leftHeader);
      cell_td.innerHTML = blankCellLabel
      leftHeader_tr.append(cell_td)
      timetable_table.append(leftHeader_tr)
    })
  })
  addCopyrightNotice(timetable_table)
  return timetable_table
}

/**
 * fillBlankTimetable - fills a blank timetable table with course information and styling
 * @param {HTMLTableElement} blankTimetable - the blank timetable table element to fill
 * @param {Array} courses - an array of course objects to fill the timetable with
 * @param {String} unscheduledLabel - the label to use for unscheduled cells
 * @return {HTMLTableElement} - the filled timetable table element
 */
 function fillBlankTimetable({blankTimetable, courses, unscheduledLabel}) {
  const finalTimetable = blankTimetable.cloneNode(true)
  const caption = document.createElement('caption')
  caption.textContent = 'Gerison\'s Timetable'
  finalTimetable.appendChild(caption)
  courses.forEach(course => {
    course.days.forEach(day => {
      const formartedTimestamp = formatTimestamp(day.timestamps)

      const target_td = finalTimetable.querySelector(`[data-top-header="${formartedTimestamp}"][data-left-header="${day.name}"]`);
      target_td.textContent = course.code
      target_td.setAttribute(`data-color`, course.color);
      target_td.style.backgroundColor = `var(${course.color})`
    })
  })

  addStylingClasses(finalTimetable, unscheduledLabel)
  return finalTimetable
}

/**
 * addCopyrightNotice - adds a copyright notice to the bottom of the table
 * @param {HTMLTableElement} table - the table element to add the notice to
 * @param {String} [copyrightNotice] - the copyright notice text, defaults to "Created by Gerison &copy; {current year}. All rights reserved."
 */
function addCopyrightNotice(table, copyrightNotice = `Created by Gerison &copy; ${new Date().getFullYear()}. All rights reserved.`) {
  const tfoot = document.createElement("tfoot");
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.setAttribute("colspan", table.getElementsByTagName("th").length);
  const p = document.createElement("p");
  p.innerHTML = copyrightNotice;
  td.appendChild(p);
  tr.appendChild(td);
  tfoot.appendChild(tr);
  table.appendChild(tfoot);

  const tableWidth = table.offsetWidth
  let pWidth = p.offsetWidth;

  // If the p element width is greater than the table width, reduce the font size until it fits
  while (pWidth > tableWidth) {
    console.log('tryna reduce fontsize')
    // Reduce the font size
    p.style.fontSize = (parseInt(p.style.fontSize) - 1) + "px";

    // Recheck the width of the p element
    pWidth = p.offsetWidth;
  }

}

/**
 * addStylingClasses - adds styling classes to the table cells based on their content
 * @param {HTMLTableElement} table - the table element to add the classes to
 * @param {String} unscheduledLabel - the label to use for unscheduled cells
 * 
 * The function loops through all the rows and cells in the table and performs the following checks:
 * - If the cell's innerHTML is not equal to the unscheduledLabel, it adds a class "scheduled" to the cell
 * - If the cell's innerHTML is equal to the unscheduledLabel, it adds a class "unscheduled" to the cell
 * - If the cell is immediately following an unscheduled cell, it adds a class "following-unscheduled" to the cell
 * - If the cell is immediately below an unscheduled cell, it adds a class "below-unscheduled" to the cell
 *
 * These classes can be used to apply custom styles to the table cells based on their content., such as adding border to empty cells
 */
function addStylingClasses(table, unscheduledLabel) {
  //  const unscheduledLabel = 'No Class'
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");

    for (let j = 0; j < cells.length; j++) {
      if (cells[j].innerHTML.trim() !== unscheduledLabel) {
        cells[j].classList.add('scheduled')
      }

      if (cells[j].innerHTML.trim() === unscheduledLabel) {
        cells[j].classList.add("unscheduled");
      }

      if (cells[j - 1] && cells[j - 1].innerHTML.trim() === unscheduledLabel && cells[j].innerHTML.trim() === unscheduledLabel || cells[j - 1] && cells[j - 1].innerHTML.trim() === cells[j].innerHTML.trim()) {
        cells[j].classList.add("following-unscheduled");
      }

      if (i > 1 && rows[i - 1] && rows[i - 1].getElementsByTagName("td")[j].innerHTML.trim() === unscheduledLabel && cells[j].innerHTML.trim() === unscheduledLabel) {
        cells[j].classList.add("below-unscheduled");
      }


    }
  }
}

export default function createTimetable(courses){
  const days = getDays(courses)
  const formatedTimestamps = formatTimestamps(getTimestamps(courses))
  const blankTimetable = createBlankTimetable({leftHeaders:days, topHeaders: formatTimestamps,blankCellLabel:UNSCHEDULED_CLASS_LABEL})
  
  const timetable = fillBlankTimetable({blankTimetable,courses,unscheduledLabel:UNSCHEDULED_CLASS_LABEL})
  return timetable
}