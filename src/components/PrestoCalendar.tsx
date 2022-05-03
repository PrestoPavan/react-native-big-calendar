import dayjs from 'dayjs';
import React from 'react'
import { View,ScrollView } from 'react-native'
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
  calendarStyle
}:any) {
  const theme = useTheme()
  const hoursRangeArr = prestoHourRange(hourRange, interval, currentDate)

  const data = formatEventData(eventData, hoursRangeArr )
  console.log('data', data);
  
  return (
      <React.Fragment>
      {headerComponent != null ? <View style={headerComponentStyle}>{headerComponent}</View> : null}
        <ScrollView contentContainerStyle={{...calendarStyle}}>
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
