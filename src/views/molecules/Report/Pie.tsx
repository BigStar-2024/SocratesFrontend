import { Box }                          from '@mui/material';
import { FC }                           from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { LSText }                       from 'views/molecules/Setting/utils/Style';

const data01 = [
  { name: 'Group A', value: 400, color: '#F4C222'},
  { name: 'Group B', value: 300, color: '#21B95C' },
  { name: 'Group C', value: 300, color: '#EC5858' },
]
const colors = ['#F4C222', '#21B95C', '#EC5858', '#CC5B1D']
export const SocratesPie: FC = () => {

  return (
    <Box >
      <LSText textAlign='center' >{'Knowledge progress'}</LSText>
      <PieChart width={400} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={90}
          fill={colors[0]}
          label
        >
          {
            data01.map((entry) => <Cell fill={entry.color}/>)
          }
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  )
}
