import React from 'react';
import ChartistGraph from 'react-chartist';

class Pie extends React.Component {
  render() {

    var data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, 2, 7, 8, 8, 7]
      ]
    };

    var options = {
      high: 10,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    };

    var type = 'Bar'

    return (
      <div>
        <ChartistGraph data={data} options={options} type={type} className={'ct-octave'}/>
      </div>
    )
  }
}

export default Pie