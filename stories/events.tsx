import dayjs from 'dayjs'
import React from 'react'
import { RecursiveArray, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import { EventRenderer, ICalendarEventBase } from '../src/interfaces'
import { formatStartEnd } from '../src/utils'

const eventNotes = (
  <View style={{ marginTop: 3 }}>
    <Text style={{ fontSize: 10, color: 'white' }}> Phone number: 555-123-4567 </Text>
    <Text style={{ fontSize: 10, color: 'white' }}> Arrive 15 minutes early </Text>
  </View>
)

export const events: Array<ICalendarEventBase & { color?: string }> = [
  {
    title: 'Watch Boxing',
    start: dayjs().set('hour', 0).set('minute', 0).set('second', 0).toDate(),
    end: dayjs().set('hour', 1).set('minute', 30).toDate(),
  },
  {
    title: 'Meeting',
    start: dayjs().set('hour', 10).set('minute', 0).toDate(),
    end: dayjs().set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Coffee break',
    start: dayjs().set('hour', 14).set('minute', 30).toDate(),
    end: dayjs().set('hour', 15).set('minute', 30).toDate(),
  },
  {
    title: 'with color prop',
    start: dayjs().set('hour', 23).set('minute', 55).toDate(),
    end: dayjs().add(1, 'day').set('hour', 18).set('minute', 30).toDate(),
    color: 'purple',
  },
  {
    title: 'Repair my car',
    start: dayjs().add(1, 'day').set('hour', 7).set('minute', 45).toDate(),
    end: dayjs().add(1, 'day').set('hour', 13).set('minute', 30).toDate(),
  },
  {
    title: 'Meet Realtor',
    start: dayjs().add(1, 'day').set('hour', 8).set('minute', 25).toDate(),
    end: dayjs().add(1, 'day').set('hour', 9).set('minute', 55).toDate(),
  },
  {
    title: 'Laundry',
    start: dayjs().add(1, 'day').set('hour', 8).set('minute', 25).toDate(),
    end: dayjs().add(1, 'day').set('hour', 11).set('minute', 0).toDate(),
  },
  {
    title: "Doctor's appointment",
    start: dayjs().set('hour', 13).set('minute', 0).toDate(),
    end: dayjs().set('hour', 14).set('minute', 15).toDate(),
    children: eventNotes,
  },
]
export const eventData = [ 
  {
    startDate:dayjs().set('hour', 10).set('minute', 0).toISOString(),
    endDate:dayjs().set('hour', 10).set('minute', 25).toISOString(),
    name:'AB', 
    id:'2022-04-26T09:02:02Z'
  }, {
    startDate:dayjs().set('hour', 10).set('minute', 34).toISOString(),
    endDate:dayjs().set('hour', 10).set('minute',54).toISOString(),
    name:'Az', 
    id:'2022-0asd4-26T09:02:02Z'
  }, {
    startDate:dayjs().set('hour', 11).set('minute', 10).toISOString(),
    endDate:dayjs().set('hour', 11).set('minute',54).toISOString(),
    name:'Az', 
    id:'2022-0asd4-26T09:02:02Z'
  }, 
  {
    startDate:dayjs().set('hour', 12).set('minute', 10).toISOString(),
    endDate:dayjs().set('hour',12).set('minute', 30).toISOString(),
    name:'sd', 
    id:'2022-04-2sdsd6T09:02:02Z'
  }, 
  {
    startDate:dayjs().set('hour', 13).set('minute', 10).toISOString(),
    endDate:dayjs().set('hour',13).set('minute', 30).toISOString(),
    name:'cb', 
    id:'2022-04-sdfs26T09:02:02Z'
  }, 
  {
    startDate:dayjs().set('hour', 13).set('minute', 10).toISOString(),
    endDate:dayjs().set('hour',13).set('minute', 30).toISOString(),
    name:'ab', 
    id:'2022-04-sdfs26T09:02:02Z'
  }, 
  {
    startDate:dayjs().set('hour', 14).set('minute', 10).toISOString(),
    endDate:dayjs().set('hour',15).set('minute', 30).toISOString(),
    name:'asda', 
    id:'2022-04-svdf:02:02Z'
  }, 
]
export const multipleUserEvents = [
  {
    title: 'User 1',
    image_url: 'https://randomuser.me/api/portraits/med/men/71.jpg',
    data: [
      {
        title: 'with color prop',
        start: dayjs().set('hour', 16).set('minute', 0).toDate(),
        end: dayjs().set('hour', 18).set('minute', 30).toDate(),
        color: 'purple',
      },
      {
        title: 'Repair my car',
        start: dayjs().add(1, 'day').set('hour', 7).set('minute', 45).toDate(),
        end: dayjs().add(1, 'day').set('hour', 13).set('minute', 30).toDate(),
      },
      {
        title: 'Meet Realtor',
        start: dayjs().add(1, 'day').set('hour', 8).set('minute', 25).toDate(),
        end: dayjs().add(1, 'day').set('hour', 9).set('minute', 55).toDate(),
      },
      {
        title: 'Laundry',
        start: dayjs().add(1, 'day').set('hour', 8).set('minute', 25).toDate(),
        end: dayjs().add(1, 'day').set('hour', 11).set('minute', 0).toDate(),
      },
      {
        title: "Doctor's appointment",
        start: dayjs().set('hour', 13).set('minute', 0).toDate(),
        end: dayjs().set('hour', 14).set('minute', 15).toDate(),
        children: eventNotes,
      },
    ],
  },
  {
    title: 'User 2',
    image_url: 'https://randomuser.me/api/portraits/med/men/72.jpg',
    data: [
      {
        title: "Doctor's appointment",
        start: dayjs().set('hour', 13).set('minute', 0).toDate(),
        end: dayjs().set('hour', 14).set('minute', 15).toDate(),
        children: eventNotes,
      },
      {
        title: 'Haircut',
        start: dayjs().set('hour', 6).set('minute', 0).toDate(),
        end: dayjs().set('hour', 7).set('minute', 15).toDate(),
        children: eventNotes,
      },
    ],
  },
  {
    title: 'User 3',
    image_url: 'https://randomuser.me/api/portraits/med/men/22.jpg',
    data: [
      {
        title: "Doctor's appointment",
        start: dayjs().set('hour', 13).set('minute', 0).toDate(),
        end: dayjs().set('hour', 14).set('minute', 15).toDate(),
        children: eventNotes,
      },
      {
        title: 'Haircut',
        start: dayjs().set('hour', 6).set('minute', 0).toDate(),
        end: dayjs().set('hour', 7).set('minute', 15).toDate(),
        children: eventNotes,
      },
    ],
  },
  {
    title: 'User 4',
    image_url: 'https://randomuser.me/api/portraits/med/men/2.jpg',
    data: [
      {
        title: "Doctor's appointment",
        start: dayjs().set('hour', 13).set('minute', 0).toDate(),
        end: dayjs().set('hour', 14).set('minute', 15).toDate(),
        children: eventNotes,
      },
      {
        title: 'Haircut',
        start: dayjs().set('hour', 6).set('minute', 0).toDate(),
        end: dayjs().set('hour', 7).set('minute', 15).toDate(),
        children: eventNotes,
      },
    ],
  },
  {
    title: 'User 5',
    image_url: 'https://randomuser.me/api/portraits/med/men/23.jpg',
    data: [
      {
        title: 'appointment',
        start: dayjs().set('hour', 13).set('minute', 0).toDate(),
        end: dayjs().set('hour', 14).set('minute', 15).toDate(),
        children: eventNotes,
      },
      {
        title: 'Haircut',
        start: dayjs().set('hour', 23).set('minute', 55).toDate(),
        end: dayjs().add(1, 'day').set('hour', 2).set('minute', 0).toDate(),
        children: eventNotes,
      },
    ],
  },
  {
    title: 'User 6',
    image_url: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    data: [
      {
        title: 'appointment',
        start: dayjs().set('hour', 13).set('minute', 0).toDate(),
        end: dayjs().set('hour', 14).set('minute', 15).toDate(),
        children: eventNotes,
      },
      {
        title: 'Haircut',
        start: dayjs().set('hour', 23).set('minute', 55).toDate(),
        end: dayjs().add(1, 'day').set('hour', 2).set('minute', 0).toDate(),
        children: eventNotes,
      },
    ],
  },
]

export const spanningEvents: Array<ICalendarEventBase & { color?: string }> = [
  {
    title: 'Watch Boxing',
    start: dayjs().subtract(1, 'week').set('hour', 14).set('minute', 30).toDate(),
    end: dayjs().subtract(1, 'week').set('hour', 15).set('minute', 30).toDate(),
  },
  {
    title: 'Laundry',
    start: dayjs().subtract(1, 'week').set('hour', 1).set('minute', 30).toDate(),
    end: dayjs().subtract(1, 'week').set('hour', 2).set('minute', 30).toDate(),
  },
  {
    title: 'Meeting',
    start: dayjs().subtract(1, 'week').set('hour', 10).set('minute', 0).toDate(),
    end: dayjs().add(1, 'week').set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Coffee break',
    start: dayjs().set('hour', 14).set('minute', 30).toDate(),
    end: dayjs().add(1, 'week').set('hour', 15).set('minute', 30).toDate(),
  },
  {
    title: 'Repair my car',
    start: dayjs().add(1, 'day').set('hour', 7).set('minute', 45).toDate(),
    end: dayjs().add(4, 'day').set('hour', 13).set('minute', 30).toDate(),
  },
  {
    title: 'Vacation',
    start: dayjs().subtract(1, 'month').set('hour', 7).set('minute', 45).toDate(),
    end: dayjs().add(1, 'month').set('hour', 13).set('minute', 30).toDate(),
  },
]

export interface MyCustomEventType extends ICalendarEventBase {
  color?: string
}

export const customEventRenderer: EventRenderer<MyCustomEventType> = (
  event,
  touchableOpacityProps,
) => {
  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      style={[
        ...(touchableOpacityProps.style as RecursiveArray<ViewStyle>),
        {
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderLeftColor: event.color ? event.color : 'green',
          borderLeftWidth: 10,
          borderStyle: 'solid',
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      {dayjs(event.end).diff(event.start, 'minute') < 32 ? (
        <Text style={[{ color: 'black' }]}>
          {event.title},
          <Text style={[{ color: 'black' }]}>{dayjs(event.start).format('HH:mm')}</Text>
        </Text>
      ) : (
        <>
          <Text style={[{ color: 'black' }]}>{event.title}</Text>
          <Text style={[{ color: 'black' }]}>
            {formatStartEnd(event.start, event.end, 'HH:mm')}
          </Text>
          {event.children && event.children}
        </>
      )}
    </TouchableOpacity>
  )
}
