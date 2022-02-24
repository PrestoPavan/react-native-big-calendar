import dayjs from 'dayjs'
import * as React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

import { u } from '../commonStyles'
import { useNow } from '../hooks/useNow'
import { usePanResponder } from '../hooks/usePanResponder'
import {
  CalendarCellStyle,
  EventCellStyle,
  EventRenderer,
  HorizontalDirection,
  ICalendarEventBase,
} from '../interfaces'
import { useTheme } from '../theme/ThemeContext'
import {
  getCountOfEventsAtEvent,
  getOrderOfEvent,
  getRelativeTopInDay,
  hoursRange,
  isToday,
  typedMemo,
} from '../utils'
import { CalendarEvent } from './CalendarEvent'
import { HourGuideCell } from './HourGuideCell'
import { HourGuideColumn } from './HourGuideColumn'

const styles = StyleSheet.create({
  nowIndicator: {
    position: 'absolute',
    zIndex: 10000,
    height: 2,
    width: '100%',
  },
})

interface CalendarBodyProps<T extends ICalendarEventBase> {
  cellHeight: number
  containerHeight: number
  dateRange: dayjs.Dayjs[]
  events: T[]
  scrollOffsetMinutes: number
  ampm: boolean
  showTime: boolean
  style: ViewStyle
  eventCellStyle?: EventCellStyle<T>
  calendarCellStyle?: CalendarCellStyle
  hideNowIndicator?: boolean
  overlapOffset?: number
  onPressCell?: (date: Date) => void
  onPressEvent?: (event: T) => void
  onSwipeHorizontal?: (d: HorizontalDirection) => void
  renderEvent?: EventRenderer<T>
  headerComponent?: React.ReactElement | null
  headerComponentStyle?: ViewStyle
  hourStyle?: TextStyle
  showHourGuide: boolean
  hourRange?: string
  multipleColumnData?: []
}

function _CalendarBody<T extends ICalendarEventBase>({
  containerHeight,
  cellHeight,
  dateRange,
  style,
  onPressCell,
  events,
  onPressEvent,
  eventCellStyle,
  calendarCellStyle,
  ampm,
  showTime,
  scrollOffsetMinutes,
  onSwipeHorizontal,
  hideNowIndicator,
  overlapOffset,
  renderEvent,
  headerComponent = null,
  headerComponentStyle = {},
  hourStyle = {},
  showHourGuide = true,
  hourRange = '0-23',
  multipleColumnData,
}: CalendarBodyProps<T>) {
  const scrollView = React.useRef<ScrollView>(null)
  const { now } = useNow(!hideNowIndicator)

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

  const panResponder = usePanResponder({
    onSwipeHorizontal,
  })

  const _onPressCell = React.useCallback(
    (date: dayjs.Dayjs) => {
      onPressCell && onPressCell(date.toDate())
    },
    [onPressCell],
  )

  const _renderMappedEvent = (event: T) => (
    <CalendarEvent
      key={`${event.start}${event.title}${event.end}`}
      event={event}
      onPressEvent={onPressEvent}
      eventCellStyle={eventCellStyle}
      showTime={showTime}
      eventCount={getCountOfEventsAtEvent(event, events)}
      eventOrder={getOrderOfEvent(event, events)}
      overlapOffset={overlapOffset}
      renderEvent={renderEvent}
      ampm={ampm}
    />
  )

  const theme = useTheme()

  return (
    <React.Fragment>
      {headerComponent != null ? <View style={headerComponentStyle}>{headerComponent}</View> : null}
      <ScrollView
        style={[
          {
            height: containerHeight - cellHeight * 3,
            backgroundColor: theme.palette.backgroundColor,
            borderWidth: 1,
            borderColor: theme.palette.borderColor,
          },
          style,
        ]}
        ref={scrollView}
        scrollEventThrottle={32}
        {...(Platform.OS !== 'web' ? panResponder.panHandlers : {})}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentOffset={Platform.OS === 'ios' ? { x: 0, y: scrollOffsetMinutes } : { x: 0, y: 0 }}
      >
        <View
          style={[
            u['flex-1'],
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            multipleColumnData && multipleColumnData.length > 0
              ? { overflow: 'scroll', paddingTop: 100 }
              : {},
          ]}
          {...(Platform.OS === 'web' ? panResponder.panHandlers : {})}
        >
          {showHourGuide ? (
            <View style={[u['z-20'], u['w-70'], { marginTop: -1 }]}>
              {hoursRange(hourRange).map((hour) => (
                <HourGuideColumn
                  key={hour}
                  cellHeight={cellHeight}
                  hour={hour}
                  ampm={ampm}
                  hourStyle={hourStyle}
                />
              ))}
            </View>
          ) : null}

          {multipleColumnData && multipleColumnData.length > 0
            ? multipleColumnData.map((column: any) => {
                return dateRange.map((date) => (
                  <View
                    style={[
                      u['flex-1'],
                      u['overflow-hidden'],
                      {
                        minWidth: Platform.OS !== 'web' ? 100 : 300,
                        position: 'relative',
                        overflow: 'visible',
                      },
                    ]}
                    key={date.toString()}
                  >
                    <View
                      style={{
                        backgroundColor: theme.palette.cellBg,
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: theme.palette.borderColor,
                        height: 100,
                        position: 'absolute',
                        top: -100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        width: '100%',
                      }}
                    >
                      {column.image_url && (
                        <View>
                          <Image
                            source={{ uri: column.image_url }}
                            style={{ width: 50, height: 50, borderRadius: 50 }}
                          />
                        </View>
                      )}
                      <View
                        style={[
                          { minWidth: Platform.OS !== 'web' ? 100 : 200, paddingVertical: 10 },
                        ]}
                      >
                        <Text style={{ color: theme.palette.headingColor, textAlign: 'center' }}>
                          {column.title}
                        </Text>
                      </View>
                    </View>
                    {hoursRange(hourRange).map((hour, index) => (
                      <HourGuideCell
                        key={hour}
                        cellHeight={cellHeight}
                        date={date}
                        hour={hour}
                        onPress={_onPressCell}
                        index={index}
                        calendarCellStyle={calendarCellStyle}
                      />
                    ))}

                    {column.data
                      .filter((data: T) => {
                        return dayjs(data.start).isBetween(
                          date.startOf('day'),
                          date.endOf('day'),
                          null,
                          '[)',
                        )
                      })
                      .map((event: T) => {
                        return {
                          ...event,
                          end: dayjs(event.end).isAfter(dayjs(event.start).endOf('day'))
                            ? dayjs(event.start).endOf('day')
                            : event.end,
                        }
                      })
                      .map(_renderMappedEvent)}

                    {/* Render events which starts before this date and ends on this date */}
                    {/* M  T  (W)  T  F  S  S */}
                    {/* S------E              */}
                    {column.data
                      .filter((data: T) => {
                        return (
                          dayjs(data.start).isBefore(date.startOf('day')) &&
                          dayjs(data.end).isBetween(
                            date.startOf('day'),
                            date.endOf('day'),
                            null,
                            '[)',
                          )
                        )
                      })
                      .map((event: T) => ({
                        ...event,
                        start: dayjs(event.end).startOf('day'),
                      }))
                      .map(_renderMappedEvent)}

                    {/* Render events which starts before this date and ends after this date */}
                    {/* M  T  (W)  T  F  S  S */}
                    {/*    S-------E          */}
                    {column.data
                      .filter((data: T) => {
                        return (
                          dayjs(data.start).isBefore(date.startOf('day')) &&
                          dayjs(data.end).isAfter(date.endOf('day'))
                        )
                      })
                      .map((event: T) => ({
                        ...event,
                        start: dayjs(event.end).startOf('day'),
                        end: dayjs(event.end).endOf('day'),
                      }))
                      .map(_renderMappedEvent)}

                    {isToday(date) && !hideNowIndicator && (
                      <View
                        style={[
                          styles.nowIndicator,
                          { backgroundColor: theme.palette.nowIndicator },
                          { top: `${getRelativeTopInDay(now)}%` },
                        ]}
                      />
                    )}
                  </View>
                ))
              })
            : dateRange.map((date) => (
                <View style={[u['flex-1'], u['overflow-hidden']]} key={date.toString()}>
                  {hoursRange(hourRange).map((hour, index) => (
                    <HourGuideCell
                      key={hour}
                      cellHeight={cellHeight}
                      date={date}
                      hour={hour}
                      onPress={_onPressCell}
                      index={index}
                      calendarCellStyle={calendarCellStyle}
                    />
                  ))}

                  {/* Render events of this date */}
                  {/* M  T  (W)  T  F  S  S */}
                  {/*       S-E             */}
                  {events
                    .filter(({ start }) =>
                      dayjs(start).isBetween(date.startOf('day'), date.endOf('day'), null, '[)'),
                    )
                    .map(_renderMappedEvent)}

                  {/* Render events which starts before this date and ends on this date */}
                  {/* M  T  (W)  T  F  S  S */}
                  {/* S------E              */}
                  {events
                    .filter(
                      ({ start, end }) =>
                        dayjs(start).isBefore(date.startOf('day')) &&
                        dayjs(end).isBetween(date.startOf('day'), date.endOf('day'), null, '[)'),
                    )
                    .map((event) => ({
                      ...event,
                      start: dayjs(event.end).startOf('day'),
                    }))
                    .map(_renderMappedEvent)}

                  {/* Render events which starts before this date and ends after this date */}
                  {/* M  T  (W)  T  F  S  S */}
                  {/*    S-------E          */}
                  {events
                    .filter(
                      ({ start, end }) =>
                        dayjs(start).isBefore(date.startOf('day')) &&
                        dayjs(end).isAfter(date.endOf('day')),
                    )
                    .map((event) => ({
                      ...event,
                      start: dayjs(event.end).startOf('day'),
                      end: dayjs(event.end).endOf('day'),
                    }))
                    .map(_renderMappedEvent)}

                  {isToday(date) && !hideNowIndicator && (
                    <View
                      style={[
                        styles.nowIndicator,
                        { backgroundColor: theme.palette.nowIndicator },
                        { top: `${getRelativeTopInDay(now)}%` },
                      ]}
                    />
                  )}
                </View>
              ))}
        </View>
      </ScrollView>
    </React.Fragment>
  )
}

export const CalendarBody = typedMemo(_CalendarBody)
