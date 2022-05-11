import dayjs from 'dayjs';
import React from 'react'
import { View,ScrollView, Platform } from 'react-native'
import { prestoHourRange } from '../utils';
import {
  formatEventData
} from '../utils'
import { DefaultEventRenderer } from './DefaultEventRenderer';
import { HourGuideColumn } from './PrestoHoursGuide';
import { useTheme } from '../theme/ThemeContext'

export default function PrestoCalendar({
  headerComponent,
  hourRange,
  headerComponentStyle,
  hourStyle,
  interval = 30,
  eventData ,
  currentDate = dayjs().startOf('d').toISOString(),
  renderCell = null,
  cellHeight = 90,
  hourContainerStyle,
  calendarStyle,
  scrollOffsetMinutes,
  style,
  containerHeight
}:any) {
  const theme = useTheme()
  const hoursRangeArr = prestoHourRange(hourRange, interval, currentDate)
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


  const data = formatEventData(eventData, hoursRangeArr )
  console.log('data', data);
  
  return (
      <React.Fragment>
      {headerComponent != null ? <View style={headerComponentStyle}>{headerComponent}</View> : null}
        <ScrollView 
          contentContainerStyle={{...calendarStyle}} 
          style={[
            {
              height: containerHeight - cellHeight * 3,
            }, style
          ]}
          ref={scrollView}
          scrollEventThrottle={32}
          showsVerticalScrollIndicator={false}
          
          nestedScrollEnabled
          contentOffset={Platform.OS === 'ios' ? { x: 0, y: scrollOffsetMinutes } : { x: 0, y: 0 }}
        >
          <View style={{flex:1, flexDirection:"row", backgroundColor:theme.palette.cellBackgroundColor, borderBottomWidth:1, borderColor:theme.palette.gray[200]}}>
            <View style={{  backgroundColor:theme.palette.cellBg, borderRightWidth:1, borderColor:theme.palette.gray[200] }}>
              { hoursRangeArr.map((item:any) => (
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
            <View style={{flex:1}}>
              {data.map( (event:any, index:any ) => {
                return <View key={index} style={{ flex:1}}>
                  {renderCell ? renderCell(event) :
                    <DefaultEventRenderer event={event} cellHeight={cellHeight}  />
                  }
                </View>
              })}
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
  )
}
