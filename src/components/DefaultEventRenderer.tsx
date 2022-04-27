import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '../theme/ThemeContext'

function getRandomColor(){
    return  "#" + Math.floor(Math.random()*16777215).toString(16)
}

export function DefaultEventRenderer({
  touchableOpacityProps,
  event,
  textColor,
  cellHeight
}: any) {
  const theme = useTheme()
  
  return (
    <TouchableOpacity {...touchableOpacityProps}>
      <View style={{height:cellHeight, backgroundColor:theme.palette.cellBg,  borderTopWidth:1, borderColor:theme.palette.gray[200], 
        flexDirection :'row', paddingHorizontal:10, paddingVertical:5 }}>
            {
                event.data && event.data.length > 0 ?
                event.data.map( (event:any, index:number) => {
                    let name = event.name && event.name.length > 2 ?  event.name.substring(0,1) : event.name
                    if(name){
                        return <View key={index} style={{ marginRight:5, backgroundColor:getRandomColor(), width:40, height:40, borderRadius:50, alignItems:'center', justifyContent:'center' }}>
                            <Text style={{textTransform:'uppercase', color:theme.palette.primary.contrastText}}>{name}</Text>
                        </View>
                    }else{
                        return null
                    }
                })
                : null
            }
      </View>
    </TouchableOpacity>
  )
}
