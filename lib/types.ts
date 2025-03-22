export interface Event {
  id: string
  title: string
  time: string
  endTime?: string
  date: string
  dateLabel: string
  dayLabel: string
  location: string
  organizer?: string
  image: string
  participants: {
    id: string
    name: string
    avatar?: string
  }[]
  missingLocation?: boolean
  isUserEvent?: boolean
  isParticipating?: boolean
}

