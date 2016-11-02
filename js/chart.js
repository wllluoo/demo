/*chart.js*/

var alfa = 0.8;   
var valuePlotBaud = [{ // Light air
	from: 0,
	to: 50,
	color: 'rgba(0, 254, 3, ' + alfa + ')',
	label: {
	text: '优',
	style: {
	  color: '#606060'
	}
	}
}, { // Light breeze
	from: 51,
	to: 100,
	color: 'rgba(254, 245, 0, ' + alfa + ')',
	label: {
	text: '良',
	style: {
	  color: '#606060'
	}
	}
}, { // Gentle breeze
	from: 101,
	to: 150,
	color: 'rgba(254, 125, 0, ' + alfa + ')',
	label: {
	text: '轻度污染',
	style: {
	  color: '#606060'
	}
	}
}, { // Moderate breeze
	from: 151,
	to: 200,
	color: 'rgba(255, 3, 3, ' + alfa + ')',
	label: {
	text: '中度污染',
	style: {
	  color: '#606060'
	}
	}
}, { // Fresh breeze
	from: 201,
	to: 300,
	color: 'rgba(188, 3,205 , ' + alfa + ')',
	label: {
	text: '重度污染',
	style: {
	  color: '#606060'
	}
	}
}, { // Strong breeze
	from: 301,
	to: 600,
	color: 'rgba(72, 0, 78, ' + alfa + ')',
	label: {
	text: '严重污染',
	style: {
	  color: '#606060'
	}
	}
}];

// line chart
function showLineChart(container,name,data,unit,type,avg)
{	
   
    var dateTypeFormat;
    if(type=="HOUR")
    {
     dateTypeFormat = '%Y-%m-%d %H:%M';
    } 
    else if(type=="DAY")
    {
     dateTypeFormat = '%Y-%m-%d';
    } 
    else if(type=="MONTH")
    {
     dateTypeFormat = '%Y-%m';
    } 

    var markerShowFlag;
    if(data.length<50)
    {
     markerShowFlag = true;
    }
    else
    {
     markerShowFlag = false;
    }
	$('#' + container).highcharts({		    
  	chart: {
	    type: 'spline',
            zoomType: 'x',
            spacingLeft: 0,
            spacingRight: 0
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats:{
      			millisecond: '%H:%M:%S.%L',
      			second: '%H:%M:%S',
      			minute: '%H:%M',
      			hour: '%H:%M',
      			day: '%m-%d',
      			week: '%m-%d',
      			month: '%Y-%m',
      			year: '%Y'
      		  },
      		  
        },
        yAxis:{
            title: {
                text: ''
            },
            min:0
        },
        tooltip: {
            //shared: true,
            enabled: true,
            formatter: function() {
                var tip = '' + Highcharts.dateFormat(dateTypeFormat, this.x) +'<br/>' + 
                this.series.name +': <b>'+ this.y + '</b>' + unit;
                if(this.point.primary_pollutant!=null)
                {
                    tip = tip + "<br/>首要污染物：" + this.point.primary_pollutant;
                }
                return tip;

            }
        },
        plotOptions:{           	
        	series:{
        		marker: {
                	enabled: markerShowFlag,
                    radius:5
            	},
            	enableMouseTracking:true,
        		turboThreshold: 0
        	} 
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled:false
        },
        series: [{
            name: name,
            data: data
        }]
    });
   var chartObj = $('#' + container).highcharts();
   
        chartObj.yAxis[0].addPlotLine({
            value: avg,
            color: 'blue',
            label: {
                text: '平均值'+avg.toFixed(2),
                align: 'left',
                x: 5,
                color: 'green'
            },
            width: 2,
            id: 'base-fuel'
        });
    
}

function showLineChartCompare(container,name,city1,city2,city3,city4,city5,data1,data2,data3,data4,data5,unit,type)
{   
	//console.info(data1);
    var dateTypeFormat;
    if(type=="HOUR")
    {
     dateTypeFormat = '%Y-%m-%d %H:%M';
    } 
    else if(type=="DAY")
    {
     dateTypeFormat = '%Y-%m-%d';
    } 
    else if(type=="MONTH")
    {
     dateTypeFormat = '%Y-%m';
    } 

    var markerShowFlag;
    if(data1.length<50)
    {
     markerShowFlag = true;
    }
    else
    {
     markerShowFlag = false;
    }

    $('#' + container).highcharts({         
    chart: {
        type: 'spline',
        backgroundColor: 'rgba(0,0,0,0)',
            zoomType: 'x',
            spacingLeft: 0,
            spacingRight: 0
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats:{
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
              },
            labels: {
                style: {
                    color: 'white',//颜色
                    fontSize:'14px'  //字体
                }
            }
        },
        yAxis:{
            title: {
                text: name,
                style:{
                    color:'white'
                },
            },
            labels: {
                style: {
                    color: 'white',//颜色
                    fontSize:'14px'  //字体
                }
            }
        },
        tooltip: {
            shared: true,
            useHTML:true,
            formatter: function() {
                var arr=[];
                tip = '' + Highcharts.dateFormat(dateTypeFormat, this.x) +'<br/><hr style="margin:3px 0;"/>'
                    + "<table width='120px'>";
                    for (i = 0; i < this.points.length; i++) {
					arr.push({value:this.points[i].y,name:this.points[i].series.name,color:this.points[i].series.color}); 
				}
				arr.sort(function(a,b){  
				    return a.value<b.value?1:-1;  
				}) 
				for (i = 0; i < this.points.length; i++) {
					if (this.points[i].point.winddirection != null){
						winddirection = " " + this.points[i].point.winddirection;
					}else{
						winddirection = "";
					}
					tip = tip + "<tr><td style='color:" + arr[i].color + "'>" + arr[i].name + ": </td><td align='right'><b>" +arr[i].value + "</b>" + unit + winddirection + "</td></tr>";
				}
                    tip = tip + "</table>";
                    return tip;

            }
        },
        plotOptions:{               
            series:{
                marker: {
                    enabled: markerShowFlag,
                    radius:5
                },
                enableMouseTracking:true,
                turboThreshold: 0
            } 
        },
        legend: {
            enabled: true,
            itemStyle:{
                color: 'white',//颜色
            }
        },
        credits: {
            enabled:false
        },
        series: [{
            name: city1,
            data: data1,
            color:'#3399CC'
        },{
            name: city2,
            data: data2,
            color:'#D26900'
        },{
            name: city3,
            data: data3,
            color:'#A5A000'
        },{
            name: city4,
            data: data4,
            color:'#A50052'
        },{
            name: city5,
            data: data5,
            color:'#00A552'
        }]
    });
}

function showLineChartWithAQI(container,name,data,dataAQI,unit,type,avg)
{   
   
    var dateTypeFormat;
    var aqicolor = "#3399CC";
    var itemcolor = "#D26900";
    if(type=="HOUR")
    {
     dateTypeFormat = '%Y-%m-%d %H:%M';
    } 
    else if(type=="DAY")
    {
     dateTypeFormat = '%Y-%m-%d';
    } 
    else if(type=="MONTH")
    {
     dateTypeFormat = '%Y-%m';
    } 

    var markerShowFlag;
    if(data.length<50)
    {
     markerShowFlag = true;
    }
    else
    {
     markerShowFlag = false;
    }

    $('#' + container).highcharts({         
    chart: {
        type: 'spline',
            zoomType: 'x',
            spacingLeft: 0,
            spacingRight: 0
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats:{
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
              }               
        },
        yAxis:[{
            title: {
                text: 'AQI',
                style: {
                    color: aqicolor
                },
            },
            labels:{
                format: '{value}',//格式化Y轴刻度  
                style: {  
                    color: aqicolor  
                }  
            },
            min:0
        },{
            title: {
                text: name,
                style: {
                    color: itemcolor
                },
            },
            labels:{
                format:'{value}' + unit,
                style: {
                    color: itemcolor
                },
            },
            opposite: true
        }],
        tooltip: {
            shared: true,
            useHTML:true,
            formatter: function() {
                    if(this.points.length==2)
                    {
                        var tip = '' + Highcharts.dateFormat(dateTypeFormat, this.x) +'<br/>' + 
                        this.points[0].series.name +': <b>'+ this.points[0].y + '</b>' + '<br/>' +
                        this.points[1].series.name +': <b>'+ this.points[1].y + '</b>' + unit; 
                        if(this.points[1].point.winddirection!=null)
                        {
                            tip = tip + '<br/>风向:<b>' + this.points[1].point.winddirection + '</b>';
                        } 
                    } 
                    else
                    {
                        var tip = '' + Highcharts.dateFormat(dateTypeFormat, this.x) +'<br/>' + 
                        this.points[0].series.name +': <b>'+ this.points[0].y + '</b>';
                        if(this.points[0].series.name!='AQI')
                        {
                            tip = tip + unit;
                        }
                        if(this.points[0].point.winddirection!=null)
                        {
                            tip = tip + '<br/>风向:<b>' + this.points[0].point.winddirection + '</b>';
                        } 
                    }
                    return tip;
            }
        },
        plotOptions:{               
            series:{
                marker: {
                    enabled: markerShowFlag,
                    radius:5
                },
                enableMouseTracking:true,
                turboThreshold: 0
            } 
        },
        legend: {
            enabled: true
        },
        credits: {
            enabled:false
        },
        series: [{
            name: 'AQI',
            data: dataAQI,
            color: aqicolor,
            yAxis:0
        },{
            name: name,
            data: data,
            color: itemcolor,
            yAxis:1
        }]
    });
    var chartObj = $('#' + container).highcharts();
   
        chartObj.yAxis[1].addPlotLine({
            value: avg,
            color: 'blue',
            label: {
                text: name+'平均值'+avg,
                align: 'right',
                x: 5,
                color: 'green'
            },
            width: 2,
            id: 'base-fuel'
        });
}

function showLineChartAll(container,type,dataAQI,dataPM25,dataPM10,dataSO2,dataNO2,dataCO,dataO3,dataTemp,dataHumi,dataWind)
{   
   
    var dateTypeFormat;
    var aqicolor = "#3399CC";
    var itemcolor = "#D26900";
    if(type=="HOUR")
    {
     dateTypeFormat = '%Y-%m-%d %H:%M';
    } 
    else if(type=="DAY")
    {
     dateTypeFormat = '%Y-%m-%d';
    } 
    else if(type=="MONTH")
    {
     dateTypeFormat = '%Y-%m';
    } 

    var markerShowFlag;
    if(dataAQI.length<50)
    {
     markerShowFlag = true;
    }
    else
    {
     markerShowFlag = false;
    }

    $('#' + container).highcharts({         
    chart: {
        type: 'spline',
        backgroundColor: 'rgba(0,0,0,0)',
            zoomType: 'x',
            spacingLeft: 0,
            spacingRight: 0
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats:{
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
              },
            labels:{
                style: {
                    color: 'white',//颜色
                    fontSize:'14px'  //字体
                }
            }

        },
        yAxis:[{
            title: {
                text: 'TOTAL',
                style:{
                    color:'white'
                },
            },
            labels:{
                format: '{value}',
                style: {
                    color: 'white',//颜色
                    fontSize:'14px'  //字体
                }
            },
            min:0,

        },
//         {
//          title: {
////              text: 'PM2.5 PM10 SO2 NO2 O3',
//              text: 'PM2.5',
//              enabled:false
//          },
//          labels:{
//              format:'{value}' + 'ug/m3',
//              enabled:false
//          },
//          opposite: false
//      },{
//          title: {
//              text: 'PM10',
//              enabled:false
//          },
//          labels:{
//              format:'{value}' + 'ug/m3',
//              enabled:false
//          },
//          opposite: false
//      },{
//          title: {
//              text: 'SO2',
//              enabled:false
//          },
//          labels:{
//              format:'{value}' + 'ug/m3',
//              enabled:false
//          },
//          opposite: false
//      },{
//          title: {
//              text: 'NO2',
//              enabled:false
//          },
//          labels:{
//              format:'{value}' + 'ug/m3',
//              enabled:false
//          },
//          opposite: false
//      },{
//          title: {
//              text: 'O3',
//              enabled:false
//          },
//          labels:{
//              format:'{value}' + 'ug/m3',
//              enabled:false
//          },
//          opposite: false
//      },
           {
            title: {
                text: 'CO',
                enabled:false
            },
            labels:{
                format:'{value}' + 'mg/m3',
                enabled:false
            },
            opposite: false
        },{
            title: {
                text: '温度',
                enabled:false
            },
            labels:{
                format:'{value}' + '℃',
                enabled:false
            },
            opposite: true
        },{
            title: {
                text: '湿度',
                enabled:false
            },
            labels:{
                format:'{value}' + '%',
                enabled:false
            },
            opposite: true
        },{
            title: {
                text: '风级',
                enabled:false
            },
            labels:{
                format:'{value}' + '级',
                enabled:false
            },
            opposite: true
        }],
        tooltip: 
        {
            shared: true,
            useHTML:true,
            formatter: function() 
            {
            	
                tip = '' + Highcharts.dateFormat(dateTypeFormat, this.x) +'<br/><hr style="margin:3px 0;"/>'
                    + "<table id='table1' style='width:166px;font-size:12px;line-height:22px;'>";
                    var tq =null;
                    var level =null;
                    var color =null;
                    for (i=0;i<this.points.length;i++)
                    {
                        if(this.points[i].series.name=="风级")
                        {
                        	if(this.points[i].y==25){this.points[i].y=1;}
                        	if(this.points[i].y==75){this.points[i].y=2;}
                        	if(this.points[i].y==125){this.points[i].y=3;}
                        	if(this.points[i].y==175){this.points[i].y=4;}
                        	if(this.points[i].y==225){this.points[i].y=5;}
                        	if(this.points[i].y==275){this.points[i].y=6;}
                        	if(this.points[i].y==325){this.points[i].y=7;}
                        	if(this.points[i].y==375){this.points[i].y=8;}
                        	
                            tip = tip + "<tr><td style='color:" +  this.points[i].series.color  +  "'>" + this.points[i].series.name +": </td><td align='right'><b>"+ this.points[i].y + "</b>级 " + this.points[i].point.winddirection + "</td></tr>";
                            tq = this.points[i].point.weather;
                        }
                        else
                        {

                            unit = "";
                            name = this.points[i].series.name;
                            if(name=="PM2.5" || name=="PM10" || name=="SO2" || name=="NO2" ||name=="O3")
                            {
                                unit = "ug/m3";
                            }
                            else if(name=="CO")
                            {
                                unit = "mg/m3";
                            }
                            else if(name=="温度")
                            {
                                unit = "℃";
                            }
                            else if(name=="湿度")
                            {
                                unit = "%";
                            }

                            tip = tip +  "<tr><td style='color:" +  this.points[i].series.color  +  "'>" + this.points[i].series.name +": </td><td align='right'><b>"+ this.points[i].y + "</b>" + unit + "</td></tr>"; 
                            if(name=="AQI")
                            {
                                //obj = getColor(this.points[i].y);
                                //level = obj.quality;
                                //color = obj.color;
                                
                            }
                        }
                    }
                    if(level!=null)
                    {
                        tip = tip + "<tr><td >等级: </td><td align='right' >" + level + "</td></tr>";
                    }
                    if(tq!=null && tq!="" && type!="MONTH")
                    {
                        tip = tip + "<tr><td >天气: </td><td align='right'>" + tq + "</td></tr>";
                    }
                    tip = tip + "</table>";
                    return tip;

            }
        },
        plotOptions:{               
            series:{
                marker: {
                    enabled: markerShowFlag,
                    radius:5
                },
                enableMouseTracking:true,
                turboThreshold: 0
            } 
        },
        legend: {
            enabled: true,
            itemStyle:{
                    color: 'white',//颜色
            }

        },
        credits: {
            enabled:false
        },
        series: [
        {
            name: 'AQI',
            data: dataAQI,
            yAxis:0
        },
        {
            name: 'PM2.5',
            data: dataPM25,
            yAxis:0
        },
        {
            name: 'PM10',
            data: dataPM10,
            yAxis:0
        },
        {
            name: 'SO2',
            data: dataSO2,
            yAxis:0
        },
        {
            name: 'CO',
            data: dataCO,
            yAxis:1
        },
        {
            name: 'NO2',
            data: dataNO2,
            yAxis:0
        },
        {
            name: 'O3',
            data: dataO3,
            yAxis:0
        },
        {
            name: '温度',
            data: dataTemp,
            yAxis:2
        },
        {
            name: '湿度',
            data: dataHumi,
            yAxis:3
        },
        {
            name: '风级',
            data: dataWind,
            yAxis:4
        }]
    });
    
}

// line chart
function showRankChart(container,city,name,data,unit,type,subtitle,chartstype)
{   
   

    var dateTypeFormat;
    if(type=="HOUR")
    {
     dateTypeFormat = '%Y-%m-%d %H:%M';
     typestr = "小时";
     
    } 
    else if(type=="DAY")
    {
     dateTypeFormat = '%Y年%m月%d日';
     typestr = "日";
     label = 'AQI';
     name=name+'（AQI）';
    } 
    else if(type=="MONTH")
    {
     dateTypeFormat = '%Y年%m月';
     typestr = "月";
     label = '综合指数';
     name=name+'（综合指数）';
    } 

    var markerShowFlag;
    var isshownum;
    if(data.length<60)
    {
   	 isshownum=true;
     markerShowFlag = true;
    }
    else
    {
    isshownum=false;
     markerShowFlag = false;
    }

    $('#' + container).highcharts({  
    	
    chart: {
           type: chartstype,
		    backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            text: city + name + typestr + "变化",
            style: {
                    color: '#fff',
                    fontSize: '30px'
            }
        },
        subtitle: {
            text: subtitle,
             style: {
                    color: '#fff',
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats:{
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
              },
              labels: {
				style: {
					color: 'white',//颜色
				}
			}
        },
        yAxis:{
            title: {
                text: ''
            },  
            labels:
            {
				style: {
					color: 'white',//颜色
				}
            },
            min:0
        },
        tooltip: {
            //shared: true,
            enabled: true,
            formatter: function() {
                return '' + Highcharts.dateFormat(dateTypeFormat, this.x) + this.point.type +'<br/>' + 
                this.series.name +': <b>'+ this.y + '</b>' + unit +'<br/>' + 
                label + ": " + data[this.point.index].index + '<br/>' +
                '首要污染物: ' + this.point.primary_pollutant;
            }
        },
        plotOptions:{               
            series:{
                marker: {
                    enabled: markerShowFlag,
                    radius:6
                },
                enableMouseTracking:true,
                turboThreshold: 0
            } 
        },
        legend: {
            enabled: true,
            itemStyle:{
					color:'white'
			}
            
        },
        credits: {
            enabled:false
        },
        exporting:{  
			enabled:false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示  
		}, 
        series: [{
            name: name,
            data: data,
            dataLabels: {
                enabled: isshownum,
                rotation: -90,
                color: '#FFFFFF',
                align: 'center',
                x: 0,
                y: 12,
               
            }
        }]
    });

    var chartObj = $('#' + container).highcharts();
    if(chartObj!=null)
    {
        chartObj.yAxis[0].addPlotLine({
            value: 10,
            color: 'blue',
            label: {
                text: '',
                style:{
                	color:"white"
                },
                align: 'left',
                x: 5,
                color: 'blue'
            },
            width: 2,
            id: 'base-fuel'
        });
    }
}

// show pie chart
function showPieChart(container,name,data)
{
	$('#' + container).highcharts({
		chart: {
		    plotBackgroundColor: null,
		    plotBorderWidth: null,
		    plotShadow: false
		},
		title: {
		    text: name + '分布情况'
		},
		tooltip: {
		    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		
		plotOptions: {
		    pie: {
		        allowPointSelect: true,
		        cursor: 'pointer',
		        dataLabels: {
		            enabled: false,
		            color: '#000000',
		            connectorColor: '#000000',
		            format: '<b>{point.name}</b>'
		        },
                showInLegend:true,
		        events: { 
				  click: function(e) { 
				  	//alert('You just clicked the graph:' + e.point.name); 
				  } 
				} 
		    }
		},
		legend: {
		    enabled: true
		},
		credits: {
		    enabled:false
		},
		series: [{
		    type: 'pie',
		    name: '百分率',
		    data: data
		}]
	});
	
    
} 

// show column chart
function showColumnChart(container,name,category,data,city,bestpoint,worstpoint,unit)
{
    $('#' + container).highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: city + '监测站点' + name + '比较',
            style: {
                    color: '#3E576F',
                    fontSize: '30px'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>' + unit
        },
        subtitle: {
            text: '【'+bestpoint + '】站点最好,【' + worstpoint + '】站点最差'
        },
        xAxis: {
            categories: category
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        plotOptions: {
            column: {
				pointPadding: 0.2,
                borderWidth: 0,
                events: { 
				  click: function(e) { //就是这里的事件响应不了。而且我不太会调试，希望得到大家指点！ 
				  	//alert('You just clicked the graph:' + e.point.name); 
				  	//$('#info').html(e.point.key);
				  } 
				} 
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 50,
            verticalAlign: 'top',
            y: 30,
            floating: true,
            backgroundColor: '#FFFFFF',
            enabled:false
        },
        credits: {
            enabled:false
        },
    	exporting:{
         	enabled:false
        },
        series: [{
            name: name,
            data: data,
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFFFFF',
                align: 'right',
                x: 0,
                y: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        }]
	});
} 


//获取字符串长度 区分中英文, 中文两个字节
String.prototype.getBytes = function () {
    var cArr = this.match(/[^\x00-\xff]/ig);
    return this.length + (cArr == null ? 0 : cArr.length);
};
//截取字符串长度 区分中英文, 中文两个字节. 超出部分中指定字符串代替 需引用 String.prototype.getBytes
String.prototype.cutBytes = function (strLen, replaceStr) {
    var str = this.toString();
    if (str.getBytes() <= strLen)
        return str;
    var returnStr = "";
    var tempLen = 0;
    for (var i = 0; i < str.length; i++) {
        var tempChar = str[i].match(/[^\x00-\xff]/ig);
        returnStr += str[i];
        tempLen += tempChar == null ? 1 : 2;
        if (tempLen >= strLen) {
            return i + 1 < str.length ? returnStr + replaceStr : returnStr;
        }
    }
    return "";
};

/**      <br>
 * 对Date的扩展，将 Date 转化为指定格式的String       <br>
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符       <br>
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)       <br>
 * eg:       <br>
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423       <br>
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04       <br>
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04       <br>
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04       <br>
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18       <br>
 */ 
Date.prototype.pattern = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份        
        "d+": this.getDate(), //日        
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时        
        "H+": this.getHours(), //小时        
        "m+": this.getMinutes(), //分        
        "s+": this.getSeconds(), //秒        
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度        
        "S": this.getMilliseconds() //毫秒        
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if ( /(y+)/ .test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if ( /(E+)/ .test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

// convert time format for Firefox and IE
function converTimeFormat(time)
{
    if(time!=null)
    {
        time = time.replace("-","/");
        time = time.replace("-","/");
        return new Date(time);   
    }
    return null;            
}

function convertMonthFormat(month)
{   
    
    if(month!=null)
    {
        year = parseInt(parseInt(month)/100);
        month = parseInt(month) % 100;
        time = year + "-" + month +  "-01";
        return converTimeFormat(time);
    }
}

/**
 * 获取风向
 */
function getWindDirectionStr(wd)
{
    if(wd==null)
    {
        wdstr = '-';
    }
    else if(wd<=22.5 || wd>=337.5)
    {
        wdstr = '北风';
    }
    else if(wd>22.5 && wd<=67.5)
    {
        wdstr = '东北风';
    }
    else if(wd>67.5 && wd<=112.5)
    {
        wdstr = '东风';
    }
    else if(wd>112.5 && wd<=157.5)
    {
        wdstr = '东南风';
    }
    else if(wd>157.5 && wd<=202.5)
    {
        wdstr = '南风';
    }
    else if(wd>202.5 && wd<=247.5)
    {
        wdstr = '西南风';
    }
    else if(wd>247.5 && wd<=292.5)
    {
        wdstr = '西风';
    }
    else if(wd>292.5 && wd<=337.5)
    {
        wdstr = '西北风';
    }
    return wdstr;
}

function getWindDirectionUrl(wd)
{
    var wid = 0;
    var url = null;
    switch(wd)
    {
        case '东风':wid = 1;break;
        case '东南风':wid = 2;break;
        case '南风':wid = 3;break;
        case '西南风':wid = 4;break;
        case '西风':wid = 5;break;
        case '西北风':wid = 6;break;
        case '北风':wid = 7;break;
        case '东北风':wid = 8;break;
    }
    if(wid>0)
    {
        url = 'url(../resource/img/arrow/' + wid + '.png)';
    }
    return url;
}

function getColorByIndex(index)
{

    switch(index)
    {
        case 0: color = '#999';break;
        case 1: color = '#43ce17';break;
        case 2: color = '#efdc31';break;
        case 3: color = '#fa0';break;
        case 4: color = '#ff401a';break;
        case 5: color = '#d20040';break;
        case 6: color = '#9c0a4e';break;
    }
    return color;
}

function getQualityByIndex(index)
{

    switch(index)
    {
        case 0: quality = '无';break;
        case 1: quality = '优';break;
        case 2: quality = '良';break;
        case 3: quality = '轻度污染';break;
        case 4: quality = '中度污染';break;
        case 5: quality = '重度污染';break;
        case 6: quality = '严重污染';break;
    }
    return quality;
}

function getQualityByAqi(val)
{
   var value = null;
   if(val<=0)
   {
     value = '无';
   }
   else if(val<=50)
   {
     value = '优';
   }
   else if(val<=100)
   {
    value = '良';
   }
   else if(val<=150)
   {
    value = '轻度污染';
   }
   else if(val<=200)
   {
    value = '中度污染';
   }
   else if(val<=300)
   {
    value = '重度污染';
   }
   else
   {
    value = '严重污染';
   }
   return value; 
}

function getAQILevelIndex(aqi)
{
    if(aqi==0)
    {
        level = 0;
    }
    else if(aqi<=200)
    {
       level = Math.ceil(aqi/50);
       if(level<0)
       {
         level = 1;
       }
    }
    else if(aqi<300)
    {
       level = 5;
    }
    else 
    {
       level = 6;
    }
    return level;
}

function getPM25LevelIndex(pm2_5)
{
    if(pm2_5==0)
    {
        level=0;
    }
    else if(pm2_5<=35)
    {
      level=1;
    }
    else if(pm2_5<=75)
    {
      level=2;
    }
    else if(pm2_5<=115)
    {
      level=3;
    }
    else if(pm2_5<150)
    {
      level=4;
    }
    else if(pm2_5<=250)
    {
      level=5;
    }
    else
    {
      level=6;
    }
    return level;
}

function getPM10LevelIndex(pm10)
{
    if(pm10==0)
    {
        level=0;
    }
    else if(pm10<=50)
    {
      level=1;
    }
    else if(pm10<=150)
    {
      level=2;
    }
    else if(pm10<=250)
    {
      level=3;
    }
    else if(pm10<350)
    {
      level=4;
    }
    else if(pm10<=420)
    {
      level=5;
    }
    else
    {
      level=6;
    }
    return level;
}

function getSO2LevelIndex(so2)
{
    if(so2==0)
    {
        level=0;
    }
    else if(so2<=150)
    {
      level=1;
    }
    else if(so2<=500)
    {
      level=2;
    }
    else if(so2<=650)
    {
      level=3;
    }
    else if(so2<800)
    {
      level=4;
    }
    else
    {
      level=5;
    }
    return level;
}

function getNO2LevelIndex(no2)
{
    if(no2==0)
    {
        level=0;
    }
    else if(no2<=100)
    {
      level=1;
    }
    else if(no2<=200)
    {
      level=2;
    }
    else if(no2<=700)
    {
      level=3;
    }
    else if(no2<1200)
    {
      level=4;
    }
    else if(no2<2340)
    {
      level=5;
    }
    else
    {
      level=6;
    }
    return level;
}

function getO3LevelIndex(o3)
{
    if(o3==0)
    {
        level=0;
    }
    else if(o3<=160)
    {
      level=1;
    }
    else if(o3<=200)
    {
      level=2;
    }
    else if(o3<=300)
    {
      level=3;
    }
    else if(o3<400)
    {
      level=4;
    }
    else if(o3<800)
    {
      level=5;
    }
    else
    {
      level=6;
    }
    return level;
}

function getCOLevelIndex(co)
{
    if(co==0)
    {
        level=0;
    }
    else if(co<=5)
    {
      level=1;
    }
    else if(co<=10)
    {
      level=2;
    }
    else if(co<=35)
    {
      level=3;
    }
    else if(co<60)
    {
      level=4;
    }
    else if(co<90)
    {
      level=5;
    }
    else
    {
      level=6;
    }
    return level;
}

