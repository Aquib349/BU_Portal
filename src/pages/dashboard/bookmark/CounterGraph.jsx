import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function CounterGraph({ length }) {
  const [GraphData, setGraphData] = useState({
    series: [0],
    options: {
      chart: {
        height: 100,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "40%",
          },
          track: {
            background: "#c5c2c2",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: true,
              fontSize: "12px",
              offsetY: 5,
              formatter: function (val) {
                return parseInt(val);
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    setGraphData({
      series: [180],
      options: {
        chart: {
          height: 100,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "40%",
            },
            track: {
              background: "#c5c2c2",
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: true,
                fontSize: "12px",
                offsetY: 5,
                formatter: function (val) {
                  return parseInt(val);
                },
              },
            },
          },
        },
        labels: ["Cricket"],
      },
    });
  }, [length]);

  return (
    <>
      <ReactApexChart
        options={GraphData.options}
        series={GraphData.series}
        type="radialBar"
        height={100}
      />
    </>
  );
}

export default CounterGraph;
