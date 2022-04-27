import dayjs from 'dayjs'
import * as React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
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
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  nowIndicator: {
    position: 'absolute',
    zIndex: 10000,
    height: 2,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
    justifyContent: 'space-evenly',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  receivingZone: {
    height: 200,
    borderRadius: 10,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  incomingPayload: {
    marginTop: 10,
    fontSize: 24,
  },
  received: {
    marginTop: 10,
    fontSize: 18,
  },
  palette: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  draggableBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  green: {
    backgroundColor: '#aaffaa',
  },
  blue: {
    backgroundColor: '#aaaaff',
  },
  red: {
    backgroundColor: '#ffaaaa',
  },
  yellow: {
    backgroundColor: '#ffffaa',
  },
  cyan: {
    backgroundColor: '#aaffff',
  },
  magenta: {
    backgroundColor: '#ffaaff',
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  stagedCount: {
    fontSize: 18,
  },
})

interface CalendarBodyForMultiUserProps<T extends ICalendarEventBase> {
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
  multipleColumnData?: [],
  numberOfColumn?:number
}

function _CalendarBodyForMultiUser<T extends ICalendarEventBase>({
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
  numberOfColumn
}: CalendarBodyForMultiUserProps<T>) {
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
  var multipleData:any = [];
  let defaultNoOfColumns:any = numberOfColumn || 3
  if(multipleColumnData && multipleColumnData.length > 0 ){
    if(multipleColumnData.length >= defaultNoOfColumns ){
      for (var i=0; i<multipleColumnData.length; i+=defaultNoOfColumns) {
        multipleData.push(multipleColumnData.slice(i,i+defaultNoOfColumns));
      }
    } else {
      multipleData.push(multipleColumnData)
    }
  }

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
        stickyHeaderIndices={[0]}
      >
         {/* <DraxView
            style={[styles.centeredContent, styles.draggableBox, styles.blue]}
            draggingStyle={styles.dragging}
            dragReleasedStyle={styles.dragging}
            hoverDraggingStyle={styles.hoverDragging}
            dragPayload={'B'}
            longPressDelay={0}
          >
            <Text>Blue</Text>
          </DraxView> */}
        <View
          style={[
            u['flex-1'],
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            multipleColumnData && multipleColumnData.length > 0
              ? { overflow: 'scroll',  }
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
          {dateRange.map((date) => (
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

export const CalendarBodyForMultiUser = typedMemo(_CalendarBodyForMultiUser)
