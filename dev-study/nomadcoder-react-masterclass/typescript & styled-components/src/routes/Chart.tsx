import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface IData {
	time_open: number;
	time_close: number;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: number;
}
interface IChart {
	coinId: string;
}

const Chart = ({ coinId }: IChart) => {
	const { isLoading, data } = useQuery<IData[]>(['ohlcv', coinId], () =>
		fetchCoinHistory(coinId),
	);

	return (
		<div>
			{isLoading ? (
				'Loading Chart...'
			) : (
				<ApexChart
					type='line'
					series={[
						{
							name: 'Price',
							data: data?.map((price) => parseFloat(price.close)) ?? [],
						},
					]}
					options={{
						theme: {
							mode: 'dark',
						},
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false,
							},
							background: 'transparent',
						},
						grid: { show: false },
						stroke: {
							curve: 'smooth',
							width: 4,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							axisBorder: { show: false },
							axisTicks: { show: false },
							labels: { show: false },
							type: 'datetime',
							categories: data?.map((price) => price.time_close),
						},
						fill: {
							type: 'gradient',
							gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
						},
						colors: ['#0fbcf9'],
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
};

export default Chart;
