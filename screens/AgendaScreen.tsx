import React, {useState, Fragment, useCallback, useMemo, useRef, Component, memo} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, TextStyle} from 'react-native';
import {Calendar, CalendarUtils} from '../node_modules/react-native-calendars/src';
import testIDs from '../testIDs';
import { Ionicons } from '@expo/vector-icons';
import { backgroundColor, textColor } from '../components/react-native-calendars/src/style';
import { api } from '../api';
import cloneDeep from 'lodash/cloneDeep';

function compareDate(a: {[key:string]: any}, b: {[key:string]: any}) {
  let aDate = new Date(a.date).getTime();
  let bDate = new Date(b.date).getTime();
  let diff = aDate - bDate;

  if ( diff > 0 ){
    return 1;
  }
  if ( diff < 0 ){
    return -1;
  }
  return 0;
}

function compareRemain(a: {[key:string]: any}, b: {[key:string]: any}) {
  if ( a.remain < b.remain ){
    return -1;
  }
  if ( a.remain > b.remain ){
    return 1;
  }
  return 0;
}

class AgendaScreen extends Component {

  currentDateStr = () => {
    let currentDate = new Date();
    const offset = currentDate.getTimezoneOffset()
    currentDate = new Date(currentDate.getTime() - (offset*60*1000))
    return currentDate.toISOString().split('T')[0]
  };

  state = {
    selected: this.currentDateStr(),
    marked: {},
    data: {}
  };

  componentDidMount() {
    const markColors = [
      '#DAF7A6', '#FFA07A', '#F08080', '#9FE2BF', '#F9E79F', '#76D7C4',
      '#DCDF89', '#89BFDF', '#6CADA5', '#EBD46B', '#E8AA83', '#EBF755',
      '#CEB3F1', '#88BCA3', '#88BCA3', '#EDB1AF', '#DF8E4C', '#13C56C'
    ];

    // marked: store formatted markedDates of react-native-calendar
    // data: store other fruit information
    // both use ISO date string as key

    api.getCalendar()
    .then(res => {
      res.sort(compareDate);
      let marked: {[key:string]: any} = {};
      let data: {[key:string]: any} = {};
      for (let i = 0; i < res.length; i++) {
        const fruit = res[i];
        const start = fruit.date;
        const end = fruit.blackdate;
        const { name, source, route } = fruit;

        let len = new Date(end).getTime() - new Date(start).getTime();
        len /= (24 * 3600 * 1000);

        // mark position
        let markIdx = undefined;
        // let startDate: any = new Date(start);
        // startDate = startDate.toISOString().split('T')[0];
        if (start in marked && marked[start].periods[0].color !== 'transparent') {
          for (let j = 1; j < marked[start].periods.length; j++) {
            if (marked[start].periods[j].color === 'transparent') {
              markIdx = j;
            }
          }
          markIdx = marked[start].periods.length;
        } else {
          markIdx = 0;
        }

        for (let j = 0; j <= len; j++) {
          let date: any = new Date(start);
          date.setDate(date.getDate() + j);
          date = date.toISOString().split('T')[0];

          if (!(date in marked)) {
            marked[date] = {periods: []};
            data[date] = [];
          }

          let period = {startingDay: false, endingDay: false, color: markColors[i]};
          if (j === 0) { period.startingDay = true; }
          if (j === len) { period.endingDay = true; }

          if (marked[date].periods.length <= markIdx) {
            for (let k = marked[date].periods.length; k <= markIdx; k++) {
              marked[date].periods.push({color: 'transparent'});
            }
          }

          marked[date].periods[markIdx] = period;
          data[date].push({ name, source, route, remain: len-j, markColor: markColors[i]});
        }
      }
      this.setState({ marked, data });
    })
    .catch(error => console.error(error));    
  }
  
  render() {
    const {selected} = this.state;

    return (
      <Fragment>
        <View style={styles.header}>
          <View style={styles.first}>
            <Text style={styles.title}> 日曆 </Text>
            <TouchableOpacity>
                <Ionicons name="notifications-outline" size={25} style={styles.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <Calendar
          style={styles.calendar}
          renderHeader={this.renderCustomHeader}
          enableSwipeMonths={true}
          onDayPress={this.handleDayPress}
          onMonthChange={this.handleMonthChange}
          theme={{
            arrowColor: 'orange',
            todayTextColor: 'orange',
            selectedDayBackgroundColor: 'orange',
            selectedDayTextColor: 'white',
          }}
          markingType={'multi-period'}
          markedDates={this.getMarkedDates()}
        />
        <View style={styles.agenda}>
          <View style={styles.agendaLeft}>
            {this.renderDateBox(selected)}
          </View>
          <View style={styles.agendaRight}>
            <ScrollView>
              {this.renderItems()}
            </ScrollView>
          </View>
        </View>
      </Fragment>
    );
  }

  renderCustomHeader = (date: any) => {
    const monthMapping: {[key:string]: string} = {
      'Jan': '1 月', 'Feb': '2 月', 'Mar': '3 月', 'Apr': '4 月',
      'May': '5 月', 'Jun': '6 月', 'Jul': '7 月', 'Aug': '8 月',
      'Sep': '9 月', 'Oct': '10 月', 'Nov': '11 月', 'Dec': '12 月'
    };
    const dateList = date.toDateString().split(" ");
    const month:string = monthMapping[dateList[1]];
    const year:string = dateList[3] + ' 年 ';
    const textStyle: TextStyle = {
      fontSize: 18,
      fontWeight: '300',
      paddingTop: 10,
      paddingBottom: 10,
      color: '#2d4150',
      paddingRight: 5
    };
  
    return (
      <View>
        <Text style={textStyle}>{year + month}</Text>
      </View>
    );
  };

  handleDayPress = (day: any) => {
    this.setState({ selected: day.dateString });
  };

  handleMonthChange = (month: any) => {
    this.setState({ selected: month.dateString });
  };

  renderDateBox = (date: string) => {
    const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let day: any = new Date(date);
    day = weekDay[day.getDay()];

    const textStyle: TextStyle = {
      color: '#2D4150',
      textAlign: 'center',
    }

    return (
      <View style={styles.dateBox}>
        <Text style={[textStyle, {fontSize: 26, fontWeight: '200'}]}>
          {date.split('-')[2]}
        </Text>
        <Text style={[textStyle, {fontSize: 10, fontWeight:'400'}]}>{day}</Text>
      </View>
    );
  };

  renderItems = () => {
    let itemList = [];

    if (this.state.selected in this.state.data) {
      const data: {[key:string]: any} = cloneDeep(this.state.data);
      let items = data[this.state.selected];
      items.sort(compareRemain);

      for (let i = 0; i < items.length; i++) {
        const {markColor, name, remain, source} = items[i];

        const textStyle: TextStyle = {
          color: '#2D4150',
          fontSize: 16
        }

        const item = <View key={'item'+i} style={styles.item}>
          <View style={[styles.circle, {backgroundColor: markColor}]}></View>
          <View style={{flex:1, marginLeft:10}}>
            <Text style={textStyle}>水果：{name}</Text>
            <Text style={textStyle}>來源：{source}</Text>
            <Text style={textStyle}>賞味期限：{remain} 天</Text>
          </View>
        </View>;

        itemList.push(item);
      }
    }
    
    return itemList;
  };

  getMarkedDates = () => {
    // add selected & disableTouchEvent properties to a marked date
    // or append the selcted date and its properties
    const marked: {[key:string]: any} = cloneDeep(this.state.marked);
    if (!(this.state.selected in marked)) {
      marked[this.state.selected] = {};
    }
    marked[this.state.selected].selected = true;
    marked[this.state.selected].disableTouchEvent = true;

    return marked;
  };
}

export default AgendaScreen;



const styles = StyleSheet.create({
  calendar: {
    // marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  first: {
      height: 210,
      width: 420,
      backgroundColor: '#FAE5A4',
      borderBottomLeftRadius: 60,
      borderBottomRightRadius: 60,
      paddingTop: 160,
      flexDirection: 'row',
  },
  title: {
      fontSize: 25,
      color: "#7E6107",
      fontWeight: 'bold',
      paddingLeft: 60,
  },
  notification: {
      color: "#7E6107",
      fontWeight: 'bold',
      paddingTop: 3,
      paddingLeft: 200,
  },
  agenda: {
    flex: 1,
    display: 'flex',
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
  },
  agendaLeft: {
    flex: 1,
    alignItems: 'center'
  },
  agendaRight: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 10,
    paddingRight: 10,
  },
  dateBox: {
    height: 60,
    width: 60,
    padding: 5,
    marginTop: 16,
  },
  item: {
    marginBottom: 10,
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
  }
});