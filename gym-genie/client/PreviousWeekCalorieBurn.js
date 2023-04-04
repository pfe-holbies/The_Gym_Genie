import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const GET_PREVIOUS_WEEK_CALORIE_BURN = gql`
  query GetUserCalorieBurnOfPreviousWeek($id: ID!) {
    getUserCalorieBurnOfPreviousWeek(id: $id) {
      date
      calories
    }
  }
`;

const PreviousWeekCalorieBurn = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_PREVIOUS_WEEK_CALORIE_BURN, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const calorieBurns = data.getUserCalorieBurnOfPreviousWeek;

  return (
    <Paper>
      <Chart data={calorieBurns}>
        <ArgumentAxis />
        <ValueAxis />
        <LineSeries
          valueField="calories"
          argumentField="date"
        />
      </Chart>
    </Paper>
  );
};

export default PreviousWeekCalorieBurn;