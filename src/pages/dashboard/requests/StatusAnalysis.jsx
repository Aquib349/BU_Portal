import { useState } from "react";
import ReactApexChart from "react-apexcharts";

function StatusAnalysis() {
  const [state, setState] = useState({
    series: [
      {
        data: [21, 22, 10, 28, 16, 21],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      colors: [
        "#2563eb",
        "#22c55e",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
      ],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          distributed: true,
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        grid: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        grid: {
          show: false, // Remove background lines on x-axis
        },
      },
    },
  });

  return (
    <>
      <div className="chart-component">
        <div className="main w-3/12">
          <div className="chart">
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
          <div className="chart-label p-2 bg-slate-400"></div>
        </div>
      </div>
    </>
  );
}

export default StatusAnalysis;
