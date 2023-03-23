import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

const ChartUC = ({chartTitle, array}) => {
    console.log(array)
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        scales: {
            y: {
                grace: '5%',
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                // position: 'top',
                display: false
            },
            title: {
                display: true,
                text: chartTitle
            },
        },
    };

    const labels = [];
    array.forEach(item => labels.push(item.label))


    const data = {
        labels,//вісь х
        datasets: [
            {
                label: 'restaurant_name',
                data: array.map((item) => item.value),//вісь у
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };

    return <Line options={options} data={data}/>
};

export {ChartUC}
