const monthYearEl = document.getElementById('month-year');
const daysEl = document.getElementById('days');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');
const reserveBtn = document.getElementById('reserve-btn');
let currentDate = new Date();
let selectedDate = null;
//fechas reservadas (en formato yyyy-mm-dd)
const reservedDates = [
  '2025-10-05',
  '2025-10-12',
  '2025-10-18',
  '2025-10-25'
];
function renderCalendar(date) {
  daysEl.innerHTML = '';
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  monthYearEl.textContent = `${monthNames[month]} ${year}`;
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay(); // domingo = 0
  startDay = startDay === 0 ? 7 : startDay; // Ajustamos para que lunes sea 1 y domingo 7
  // Número de días en el mes
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i < startDay; i++) {
    const emptyDiv = document.createElement('div');
    daysEl.appendChild(emptyDiv);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    const fullDateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    dayDiv.textContent = day;
    if (reservedDates.includes(fullDateStr)) {
      dayDiv.classList.add('reserved');
    } else {
      dayDiv.addEventListener('click', () => {
        document.querySelectorAll('.day.selected').forEach(el => el.classList.remove('selected'));
        dayDiv.classList.add('selected');
        selectedDate = fullDateStr;
        reserveBtn.disabled = false;
      });
    }
    daysEl.appendChild(dayDiv);
  }
  selectedDate = null;
  reserveBtn.disabled = true;
}
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});
nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});
reserveBtn.addEventListener('click', () => {
  if (selectedDate) {
    alert(`Has reservado la fecha: ${selectedDate}`);
    reservedDates.push(selectedDate);
    renderCalendar(currentDate);
  }
});
renderCalendar(currentDate);
