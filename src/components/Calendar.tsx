import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { merge } from 'merge-anything'
import React from 'react'

import { ICalendarEventBase } from '../interfaces'
import { defaultTheme } from '../theme/defaultTheme'
import { ThemeContext } from '../theme/ThemeContext'
import { ThemeInterface } from '../theme/ThemeInterface'
import { DeepPartial } from '../utility-types'
import { typedMemo } from '../utils'
import { CalendarContainer, CalendarContainerProps } from './CalendarContainer'

export interface CalendarProps<T extends ICalendarEventBase> extends CalendarContainerProps<T> {
  theme?: DeepPartial<ThemeInterface>
  isRTL?: boolean,
  showHourGuide?:boolean,
  hourRange?:string,
}

dayjs.extend(isBetween)

function _Calendar<T extends ICalendarEventBase>({
  theme = defaultTheme,
  isRTL,
  showHourGuide,
  hourRange,
  ...props
}: CalendarProps<T>) {
  
  const _theme = merge(defaultTheme, theme, { isRTL }) as ThemeInterface
  return (
    <ThemeContext.Provider value={_theme}>
      <CalendarContainer {...props} showHourGuide={showHourGuide} hourRange={hourRange}  />
    </ThemeContext.Provider>
  )
}

export const Calendar = typedMemo(_Calendar)
