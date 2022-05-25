import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '../theme/ThemeContext'

export default function DefaultEmptySlotRenderer({
  touchableOpacityProps,
  event,
  cellHeight
}: any) {
  const theme = useTheme()
 
  return (
    <TouchableOpacity {...touchableOpacityProps}>
      <View style={{
        height:cellHeight, backgroundColor:theme.palette.cellBg,  borderTopWidth:1, borderColor:theme.palette.gray[200], 
        flexDirection :'row', paddingHorizontal:10, paddingVertical:5, 
        width:'100%'
        }}>
            {
                event.data && event.data.length === 0 ?
                  <Text>Available for booking</Text>
                : null
            }
      </View>
    </TouchableOpacity>
  )
}
