import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

function StatusAnalysis({ data }) {
  // all types of status
  const status = [
    { id: 1, name: "Completed", color: "bg-[#2563eb]" },
    { id: 2, name: "New", color: "bg-[#22c55e]" },
    { id: 3, name: "On Hold", color: "bg-[#eb2323]" },
    { id: 4, name: "Awaiting", color: "bg-[#FEB019]" },
    { id: 5, name: "Approved", color: "bg-[#2563eb]" },
    { id: 6, name: "Cancelled", color: "bg-[#546E7A]" },
  ];

  const [state, setState] = useState({
    series: [
      {
        name: "",
        data: data,
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
        "#eb2323",
        "#FEB019",
        "#2563eb",
        "#546E7A",
      ],
      plotOptions: {
        bar: {
          columnWidth: "30%",
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
        axisBorder: {
          show: false,
        },
        axisTicks: {
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
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        grid: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: function (value, { dataPointIndex}) {
            return `${status[dataPointIndex].name}: ${value}`;
          },
        },
        x: {
          show: false,
      },
      },
    },
  });

  return (
    <>
      <div className="chart-component">
        <div className="main">
          <div className="chart">
            <h1 className="text-lg font-semibold px-4">Status</h1>
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="bar"
              height={200}
            />
            {status.map((val) => (
              <div
                key={val.id}
                className="status-name-and-color flex gap-4 items-center text-sm py-1 px-6"
              >
                <span className={`w-3 h-3 ${val.color} rounded-full`}></span>
                <span className="">{val.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

StatusAnalysis.propTypes = {
  data: PropTypes.array.isRequired,
};

export default StatusAnalysis;
