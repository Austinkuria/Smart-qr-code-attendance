import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

// Material-UI
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// Third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// Project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Chart data
import todayChartData from './chart-data/total-growth-bar-chart';
import s1ChartData from './chart-data/s1-data';
import s2ChartData from './chart-data/s2-data';
import s3ChartData from './chart-data/s3-data';
import s4ChartData from './chart-data/s4-data';
import s5ChartData from './chart-data/s5-data';

const status = [
  { value: 'today', label: 'All Semesters' },
  { value: 's1', label: 'Semester 1' },
  { value: 's2', label: 'Semester 2' },
  { value: 's3', label: 'Semester 3' },
  { value: 's4', label: 'Semester 4' },
  { value: 's5', label: 'Semester 5' }
];

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState('today');
  const [error, setError] = useState(null);
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];
  // Memoize custom colors
  const customColors = useMemo(
    () => ({
      50: '#009688',
      100: '#FFC107',
      200: '#E91E63',
      300: '#4CAF50',
      500: '#9C27B0',
      600: '#FF9800',
      700: '#00BCD4'
    }),
    []
  );

  // Memoized colors array
  const colors = useMemo(
    () => [
      customColors[50],
      customColors[100],
      customColors[200],
      customColors[300],
      customColors[500],
      customColors[600],
      customColors[700]
    ],
    [customColors]
  );

  // Memoized chart data map
  const chartDataMap = useMemo(
    () => ({
      today: todayChartData,
      s1: s1ChartData,
      s2: s2ChartData,
      s3: s3ChartData,
      s4: s4ChartData,
      s5: s5ChartData
    }),
    []
  );

  useEffect(() => {
    try {
      const chartData = chartDataMap[value] || todayChartData;

      const updatedChartData = {
        ...chartData.options,
        colors,
        xaxis: {
          ...chartData.options.xaxis,
          labels: {
            style: {
              colors: Array(10).fill(primary)
            }
          }
        },
        yaxis: {
          min: 0,
          max: 300,
          labels: {
            style: {
              colors: [primary]
            }
          }
        },
        grid: {
          borderColor: grey200
        },
        tooltip: {
          theme: 'light'
        },
        legend: {
          labels: {
            colors: grey500
          }
        }
      };

      if (!isLoading) {
        ApexCharts.exec('bar-chart', 'updateOptions', updatedChartData);
      }
    } catch (err) {
      console.error('Error updating chart:', err);
      setError('Failed to load chart data. Please try again.');
    }
  }, [value, navType, primary, grey200, isLoading, grey500, chartDataMap, colors]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Absence Overview</Typography>
                    </Grid>
                    {error && (
                      <Grid item>
                        <Typography variant="body2" color="error">
                          {error}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="semester-select" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartDataMap[value]} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
