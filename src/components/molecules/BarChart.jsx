import "./BarChart.css";

const data = [
  { mes: "Enero",    value: 25 },
  { mes: "Febrero",  value: 25 },
  { mes: "Marzo",    value: 38 },
  { mes: "Abril",    value: 33 },
  { mes: "Mayo",     value: 26 },
  { mes: "Junio",    value: 27 },
];

const max = Math.max(...data.map(d => d.value));

const BarChart = () => {
  return (
    <div className="bar-chart">
      {data.map(d => (
        <div key={d.mes} className="bar-chart__col">
          <span className="bar-chart__value">{d.value}</span>
          <div
            className="bar-chart__bar"
            style={{ height: `${(d.value / max) * 100}%` }}
          />
          <span className="bar-chart__label">{d.mes}</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;