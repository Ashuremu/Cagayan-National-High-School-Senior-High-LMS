import { useMemo, useState } from 'react'

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

interface CalendarCardProps {
  month?: number
  year?: number
  activeDay?: number
  title?: string
}

interface CalendarDay {
  day: number
  currentMonth: boolean
  date: Date
}

const buildDays = (month: number, year: number) => {
  const firstDayIndex = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPreviousMonth = new Date(year, month, 0).getDate()
  const days: CalendarDay[] = []

  for (let i = firstDayIndex - 1; i >= 0; i -= 1) {
    const day = daysInPreviousMonth - i
    days.push({
      day,
      currentMonth: false,
      date: new Date(year, month - 1, day),
    })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({
      day,
      currentMonth: true,
      date: new Date(year, month, day),
    })
  }

  let trailingDay = 1
  while (days.length < 42) {
    days.push({
      day: trailingDay,
      currentMonth: false,
      date: new Date(year, month + 1, trailingDay),
    })
    trailingDay += 1
  }

  return days
}

export const CalendarCard = ({
  month,
  year,
  activeDay,
  title = 'Calendar',
}: CalendarCardProps) => {
  const now = new Date()
  const initialYear = year ?? now.getFullYear()
  const initialMonth = month ?? now.getMonth()
  const initialDay = activeDay ?? now.getDate()

  const [currentMonth, setCurrentMonth] = useState(initialMonth)
  const [currentYear, setCurrentYear] = useState(initialYear)
  const [selectedDate, setSelectedDate] = useState(
    new Date(initialYear, initialMonth, initialDay)
  )

  const days = useMemo(
    () => buildDays(currentMonth, currentYear),
    [currentMonth, currentYear]
  )

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((prev) => prev - 1)
      return
    }
    setCurrentMonth((prev) => prev - 1)
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((prev) => prev + 1)
      return
    }
    setCurrentMonth((prev) => prev + 1)
  }

  const handleSelectDay = (day: CalendarDay) => {
    setSelectedDate(day.date)
    setCurrentMonth(day.date.getMonth())
    setCurrentYear(day.date.getFullYear())
  }

  return (
    <section className="student-calendar-card" aria-label={title}>
      <h3 className="student-calendar-card__title">{title}</h3>

      <div className="student-calendar">
        <div className="student-calendar__header">
          <button
            type="button"
            aria-label="Previous month"
            onClick={handlePreviousMonth}
          >
            ‹
          </button>

          <div className="student-calendar__meta">
            <span>{monthNames[currentMonth]}</span>
            <span>{currentYear}</span>
          </div>

          <button type="button" aria-label="Next month" onClick={handleNextMonth}>
            ›
          </button>
        </div>

        <div className="student-calendar__weekdays">
          {weekDays.map((weekDay) => (
            <span key={weekDay}>{weekDay}</span>
          ))}
        </div>

        <div className="student-calendar__days">
          {days.map((entry, index) => (
            <button
              key={`${entry.day}-${index}`}
              type="button"
              onClick={() => handleSelectDay(entry)}
              className={`student-calendar__day ${
                !entry.currentMonth ? 'is-muted' : ''
              } ${
                selectedDate.getFullYear() === entry.date.getFullYear() &&
                selectedDate.getMonth() === entry.date.getMonth() &&
                selectedDate.getDate() === entry.date.getDate()
                  ? 'is-active'
                  : ''
              }`}
            >
              {entry.day}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
