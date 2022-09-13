import dayjs from 'dayjs'
import React from 'react'
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '../theme/ThemeContext'
import { formatStartEnd, prestoHourRange } from '../utils'
import { formatEventData } from '../utils'
import DefaultEmptySlotRenderer from './DefaultEmptySlotRenderer'
import { DefaultEventRenderer } from './DefaultEventRenderer'
import { HourGuideColumn } from './PrestoHoursGuide'

export default function PrestoCalendar({
  headerComponent,
  hourRange,
  headerComponentStyle,
  hourStyle,
  interval = 30,
  eventData,
  currentDate = dayjs().startOf('d').toISOString(),
  renderCell = null,
  cellHeight = 90,
  hourContainerStyle,
  calendarStyle,
  scrollOffsetMinutes,
  style,
  containerHeight = 700,
  mode,
  onPressEvent,
  renderEvent,
  renderEmptySlots,
  showEmptySlots = false,
  onPressEmptySlot,
}: any) {
  const theme = useTheme()
  console.log(`PrestoCalendar data hourRange`, hourRange)
  const hoursRangeArr = prestoHourRange(hourRange, interval, currentDate)
  console.log(`PrestoCalendar data hoursRangeArr`, JSON.stringify(hoursRangeArr))
  const scrollView = React.useRef<ScrollView>(null)

  React.useEffect(() => {
    if (scrollView.current && scrollOffsetMinutes && Platform.OS !== 'ios') {
      // We add delay here to work correct on React Native
      // see: https://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working
      setTimeout(
        () => {
          if (scrollView && scrollView.current) {
            scrollView.current.scrollTo({
              y: (cellHeight * scrollOffsetMinutes) / 60,
              animated: false,
            })
          }
        },
        Platform.OS === 'web' ? 0 : 10,
      )
    }
  }, [scrollView, scrollOffsetMinutes, cellHeight])

  const date = dayjs(currentDate).startOf('d')
  const data = formatEventData(eventData, hoursRangeArr, interval)

  const getEventCellPositionStyle = (start: Date, end: Date) => {
    const relativeHeight = (dayjs(end).diff(start, 'minute') * cellHeight) / interval
    const relativeTop =
      (dayjs(start).diff(hoursRangeArr[0].startTime, 'minute') * cellHeight) / interval

    return {
      height: relativeHeight - 1,
      top: relativeTop,
    }
  }

  const eventTimeStyle = { fontSize: 14, color: '#ffffff' }
  const renderPrestoEvent = (event: any) => (
    <TouchableOpacity
      style={{
        width: '99%',
        left: 3,
        right: 3,
        borderRadius: 3,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#4285f4',
        ...getEventCellPositionStyle(event.startDate, event.endDate),
      }}
      onPress={() => {
        if (onPressEvent) {
          onPressEvent(event)
        }
      }}
    >
      {renderEvent ? (
        renderEvent(event)
      ) : (
        <View style={{ padding: 5 }}>
          <Text style={eventTimeStyle}>{event.name}</Text>
          <Text style={{ ...eventTimeStyle, marginTop: 5 }}>
            {formatStartEnd(event.startDate, event.endDate, 'h:mm a')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
  // console.log('data',data);

  return (
    <React.Fragment>
      {headerComponent != null ? <View style={headerComponentStyle}>{headerComponent}</View> : null}
      <ScrollView
        contentContainerStyle={{ ...calendarStyle, overflow: 'hidden' }}
        style={[
          {
            height: containerHeight - cellHeight * 3,
          },
          style,
        ]}
        ref={scrollView}
        scrollEventThrottle={32}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentOffset={Platform.OS === 'ios' ? { x: 0, y: scrollOffsetMinutes } : { x: 0, y: 0 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: theme.palette.cellBackgroundColor,
            borderBottomWidth: 1,
            borderColor: theme.palette.gray[200],
          }}
        >
          <View
            style={{
              backgroundColor: theme.palette.cellBg,
              borderRightWidth: 1,
              borderColor: theme.palette.gray[200],
            }}
          >
            {hoursRangeArr.map((item: any) => (
              <HourGuideColumn
                key={item.startTime}
                cellHeight={cellHeight}
                hour={dayjs(item.startTime).format('hh:mm A')}
                ampm={true}
                hourStyle={hourStyle}
                hourContainerStyle={hourContainerStyle}
              />
            ))}
          </View>
          <View style={{ flex: 1, position: 'relative' }}>
            {mode === 'detailed'
              ? eventData
                  .filter((data: any) => {
                    return dayjs(data.startDate).isBetween(
                      date.startOf('day'),
                      date.endOf('day'),
                      null,
                      '[)',
                    )
                  })
                  .map((event: any) => {
                    return renderPrestoEvent(event)
                  })
              : data.map((event: any, index: any) => {
                  return (
                    <View key={index} style={{ flex: 1 }}>
                      {renderCell ? (
                        renderCell(event)
                      ) : (
                        <DefaultEventRenderer event={event} cellHeight={cellHeight} />
                      )}
                    </View>
                  )
                })}
            {showEmptySlots
              ? data.map((event: any, index: any) => {
                  return (
                    <View key={index} style={{}}>
                      {renderEmptySlots ? (
                        renderEmptySlots(event)
                      ) : (
                        <DefaultEmptySlotRenderer
                          event={event}
                          cellHeight={cellHeight}
                          touchableOpacityProps={{
                            onPressEmptySlot: onPressEmptySlot,
                          }}
                        />
                      )}
                    </View>
                  )
                })
              : null}
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  )
}
