import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'; // Import the ApexCharts component

const predefinedNames = [
  'KCSE',
  'Diploma Holders',
  'Self-Sponsored (Private)',
  'Government-Sponsored',
  'Parallel Program',
  'Transfer Students'
];

const ChartComponent = () => {
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    height: 480,
    type: 'bar',
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      },
      xaxis: {
        type: 'category',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      legend: {
        show: true,
        fontSize: '14px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8
        }
      },
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: true
      }
    },
    series: predefinedNames.map((name) => ({
      name: name,
      data: Array(12).fill(0)
    }))
  });

  // Use useCallback to memoize the function
  const fetchDataAndUpdateChart = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api1/v1/liste/absencesByFiliereBySem/2');
      const data = response.data;
      console.log('API response:', data);

      const updatedSeries = chartData.series.map((seriesItem) => {
        const item = data.find((dataItem) => dataItem.filiere === seriesItem.name);
        if (item) {
          return {
            ...seriesItem,
            data: Object.values(item.absences).map((value) => parseInt(value, 10))
          };
        }
        return seriesItem;
      });

      setChartData((prevData) => ({
        ...prevData,
        series: updatedSeries
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching the data. Please try again later.');
    }
  }, [chartData.series]); // Add chartData.series as a dependency

  useEffect(() => {
    fetchDataAndUpdateChart();
  }, [fetchDataAndUpdateChart]); // Add fetchDataAndUpdateChart as a dependency

  return (
    <div>
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
      <Chart options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height} />
    </div>
  );
};

export default ChartComponent;
