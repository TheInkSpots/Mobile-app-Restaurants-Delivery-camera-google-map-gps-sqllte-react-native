import {StyleSheet, View, Text} from 'react-native';
import { TopBar } from '../components/TopBar';
import React, { useState , useEffect} from 'react'
import Wall from '../components/Wall'
import { CommonActions,useFocusEffect } from '@react-navigation/native';
import { COLORS, SIZES, icons } from '../constants';
import {
    LineChart
  } from "react-native-chart-kit";
  import { Dimensions } from "react-native";
  const screenWidth = Dimensions.get("window").width;



export default function StateScreen({navigation, route}) {
    const [data, setdata] = useState([]);
    const [data2, setdata2] = useState([]);

    const {visitationData,uuid} = route.params;
    
    visitationData.forEach( row =>{
        row.duration;
        let sum = 0
        row.menu.forEach( rowmenu => {
            let vlaue = rowmenu.price;
            if( isNaN(vlaue)) {vlaue = 0;}
            //console.log('!!!!!!!!', vlaue, " -- ", isNaN(vlaue))
            sum += Number(vlaue);
            
        });
        data.push({'time': row.duration, 'datsum': sum});

    })
    //console.log('data sum: ',data);
    
    let result = [];
    data.reduce(function(res, value) {
        let onlyDate = value.time;
        
        
        if (!res[onlyDate]) {
          res[onlyDate] = { date: onlyDate, datsum: 0 };
          result.push(res[onlyDate])
        }
        res[onlyDate].datsum += value.datsum;
        return res;
      }, {});

      console.log('result: ',result);


      const valueSumByDates = result.map(item => item.datsum);
        const uniqueDates = result.map(item => item.date);

    const dummydata = {
        labels: uniqueDates.reverse(),
        datasets: [
          {
            data: valueSumByDates.reverse(),
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Cost By Date"] // optional
      };


    return (
        <Wall>
        {/*<BackButton goBack={navigation.goBack} />*/}
        <TopBar
          leftIcon={icons.list}
          rightIcon={icons.search}
          headerText={''}
          leftPress={()=>{}}
          rightPress={()=>{}}
        />
        <LineChart
            data={dummydata}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            />
            <LineChart
            data={dummydata}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            />
            <LineChart
            data={dummydata}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            style={{marginBottom : 30}}
            />



        </Wall >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
})

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(6, 25, 46, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
