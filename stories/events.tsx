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

export const eventDataTwo = [
  {
    id: '62f376a35fc4e72e7e66f9f5',
    booking_start_time: '2022-08-21T10:30:00Z',
    booking_end_time: '2022-08-21T12:00:00Z',
    operator_start_time: null,
    operator_end_time: null,
    service_name: 'Advanced Styling',
    work_duration: 90,
    created_at: '2022-08-21T09:13:07Z',
    updated_at: '2022-08-21T09:13:07Z',
    merchant_id: '619b9ec70bfc38000d03e2ea',
    appointment_id: '62f36f915fc4e72e7e66f9e8',
    operator_id: '629071ee5fc4e76a04b45c8f',
    service_id: '61ee20c9d11235000d8f2a5b',
    service_item_id: '62f376975fc4e72e7e66f9f4',
    user_id: {
      $oid: '62737c285fc4e71141a01044',
    },
    title: 'Advanced Styling',
    date: '2022-08-09T18:30:00.000Z',
    name: 'A',
    reference_id: 'JK',
    startDate: '2022-08-21T10:30:00Z',
    endDate: '2022-08-21T12:00:00Z',
  },
  {
    id: '62f376b75fc4e72e7e66f9f7',
    booking_start_time: '2022-08-21T12:01:00Z',
    booking_end_time: '2022-08-21T12:20:00Z',
    operator_start_time: null,
    operator_end_time: null,
    service_name: 'Japanese Sakura Whitening & Brightening Facial',
    work_duration: 20,
    created_at: '2022-08-21T09:13:27Z',
    updated_at: '2022-08-21T09:13:27Z',
    merchant_id: '619b9ec70bfc38000d03e2ea',
    appointment_id: '62f36f915fc4e72e7e66f9e8',
    operator_id: '629071ee5fc4e76a04b45c8f',
    service_id: '62a861a65fc4e70ae07fa922',
    service_item_id: '62f376b75fc4e72e7e66f9f6',
    user_id: {
      $oid: '62737c285fc4e71141a01044',
    },
    title: 'Japanese Sakura Whitening & Brightening Facial',
    date: '2022-08-09T18:30:00.000Z',
    name: 'B',
    reference_id: 'JK',
    startDate: '2022-08-21T12:01:00Z',
    endDate: '2022-08-21T12:20:00Z',
  },
  {
    id: '62f376e85fc4e72e7e66f9f8',
    booking_start_time: '2022-08-21T12:21:00Z',
    booking_end_time: '2022-08-21T14:00:00Z',
    operator_start_time: null,
    operator_end_time: null,
    service_name: 'Hair Coloring ',
    work_duration: 100,
    created_at: '2022-08-21T09:14:16Z',
    updated_at: '2022-08-21T09:14:16Z',
    merchant_id: '619b9ec70bfc38000d03e2ea',
    appointment_id: '62f36f915fc4e72e7e66f9e8',
    operator_id: '629071ee5fc4e76a04b45c8f',
    service_id: '620df55085108f000dd6903e',
    service_item_id: '62f376e75fc4e72e8666f9e7',
    user_id: {
      $oid: '62737c285fc4e71141a01044',
    },
    title: 'Hair Coloring ',
    date: '2022-08-09T18:30:00.000Z',
    name: 'C',
    reference_id: 'JK',
    startDate: '2022-08-21T12:21:00Z',
    endDate: '2022-08-21T14:00:00Z',
  },
]

export const eventDataThree = [
  {
    id: '63012b195fc4e74d68107a25',
    booking_start_time: '2022-08-21T07:00:00Z',
    booking_end_time: '2022-08-21T07:15:00Z',
    operator_start_time: null,
    operator_end_time: null,
    service_name: 'Short Service',
    work_duration: 15,
    created_at: '2022-08-20T18:42:33Z',
    updated_at: '2022-08-20T18:42:33Z',
    merchant_id: '62e2b2375fc4e74068566333',
    appointment_id: '63012ad85fc4e74d68107a23',
    operator_id: '62e2bafb5fc4e7406856634a',
    service_id: '62f4f1b85fc4e7357e8becbb',
    service_item_id: '63012adc5fc4e74d68107a24',
    user_id: {
      $oid: '62eb939d5fc4e73e22a9faca',
    },
    title: 'Short Service',
    date: '2022-08-20T18:30:00.000Z',
    name: 'Ross',
    reference_id: 'RR',
    startDate: '2022-08-21T07:00:00Z',
    endDate: '2022-08-21T07:15:00Z',
  },
]

export const eventData = [
  {
    startDate: dayjs().set('hour', 10).set('minute', 0).toISOString(),
    endDate: dayjs().set('hour', 10).set('minute', 59).toISOString(),
    name: 'AB',
    id: '2022-04-26T09:02:02Z',
  },
  {
    startDate: dayjs().set('hour', 10).set('minute', 0).toISOString(),
    endDate: dayjs().set('hour', 10).set('minute', 29).toISOString(),
    name: 'we',
    id: '2022-0asd4-26T09:02:02Z',
  },
  {
    startDate: dayjs().set('hour', 11).set('minute', 10).toISOString(),
    endDate: dayjs().set('hour', 11).set('minute', 54).toISOString(),
    name: 'Az',
    id: '2022-0asd4-26T09:02:02Z',
  },
  {
    startDate: dayjs().set('hour', 12).set('minute', 35).toISOString(),
    endDate: dayjs().set('hour', 12).set('minute', 40).toISOString(),
    name: 'sd',
    id: '2022-04-2sdsd6T09:02:02Z',
  },
  {
    startDate: dayjs().set('hour', 13).set('minute', 10).toISOString(),
    endDate: dayjs().set('hour', 13).set('minute', 30).toISOString(),
    name: 'cb',
    id: '2022-04-sdfs26T09:02:02Z',
  },
  {
    startDate: dayjs().set('hour', 19).set('minute', 10).toISOString(),
    endDate: dayjs().set('hour', 20).set('minute', 30).toISOString(),
    name: 'as',
    id: '2022-04-sdfs26T09:02:02Z',
  },
  {
    startDate: dayjs().set('hour', 23).set('minute', 10).toISOString(),
    endDate: dayjs().set('date', 26).set('hour', 24).set('minute', 0).toISOString(),
    name: 'asda',
    id: '2022-04-svdf:02:02Z',
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
