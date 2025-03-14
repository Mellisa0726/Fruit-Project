import { StyleSheet } from 'react-native';
import * as defaultStyle from '../style';
import platformStyles from './platform-style';
export default function styleConstructor(theme = {}) {
    const appStyle = { ...defaultStyle, ...theme };
    const { knob, weekdays } = platformStyles(appStyle);
    return StyleSheet.create({
        container: {
            height: 330
            // flex: 0.5,
            // overflow: 'hidden',
        },
        // animatedContainer: {
        //     flex: 1
        // },
        // knob,
        weekdays,
        header: {
            overflow: 'hidden',
            justifyContent: 'flex-end',
            position: 'absolute',
            height: '100%',
            width: '100%'
        },
        // knobContainer: {
        //     flex: 1,
        //     position: 'absolute',
        //     left: 0,
        //     right: 0,
        //     height: 24,
        //     bottom: 0,
        //     alignItems: 'center',
        //     backgroundColor: appStyle.calendarBackground
        // },
        dayHeader: {
            width: 32,
            textAlign: 'center',
            fontSize: appStyle.textDayHeaderFontSize,
            fontFamily: appStyle.textDayHeaderFontFamily,
            fontWeight: appStyle.textDayHeaderFontWeight,
            color: appStyle.textSectionTitleColor
        },
        reservations: {
            // flex: 0.5,
            // marginTop: 0,
            backgroundColor: appStyle.backgroundColor
        },
        scrollPadStyle: {
            position: 'absolute',
            width: '100%',
            alignSelf: 'center',
            // backgroundColor: 'black'
        },
        // @ts-expect-error
        ...(theme['stylesheet.agenda.main'] || {})
    });
}
