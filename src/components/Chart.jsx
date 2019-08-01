import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush
} from 'recharts';

import { genMaterialColor } from 'generate-color'


export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/zjb47e83/';
  onClick = (e) => {
    console.log(e);
  }
  render() {
    const { data, shops }  = this.props;
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
          onMouseDown={this.onClick}
          onMouseUp={this.onClick}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <Tooltip />
          <Legend />
          {
            shops.map(
              shop => {
                const color = genMaterialColor();
                return (<Line
                  key={shop}
                  yAxisId="left"
                  type="monotone"
                  dataKey={shop}
                  stroke={color}
                  strokeWidth={2}
                 />)
             }
            )
          }
          <Brush />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
