import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface TipData {
  tip_amount: number;
  shift_date: string;
  time_worked_minutes: number;
  jobs_table: {
    job_type: string;
    job_hourly_pay: string;
    businesses: {
      name: string;
    };
  };
  hourlyPay: number;
  totalPay: number;
}

interface TotalPayByDay {
  [key: string]: {
    totalPay: number;
    totalHourlyPay: number;
    totalTips: number;
  };
}

export default function LastSevenDayEarnings({
  tipsData,
}: {
  tipsData: TipData[];
}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const totalPayByDay: TotalPayByDay = {
    Sunday: { totalPay: 0, totalHourlyPay: 0, totalTips: 0 },
    Monday: { totalPay: 0, totalHourlyPay: 0, totalTips: 0 },
    Tuesday: { totalPay: 0, totalHourlyPay: 0, totalTips: 0 },
    Wednesday: { totalPay: 0, totalHourlyPay: 0, totalTips: 0 },
    Thursday: { totalPay: 0, totalHourlyPay: 0, totalTips: 0 },
    Friday: { totalPay: 0, totalHourlyPay: 0, totalTips: 0 },
    Saturday: { totalPay: 0, totalHourlyPay: 0, totalTips: 0 },
  };

  tipsData.forEach((tip) => {
    // Parse the shift_date and account for the time zone offset
    const shiftDate = new Date(`${tip.shift_date}T00:00:00Z`);
    console.log(shiftDate);
    const localShiftDate = new Date(
      shiftDate.getTime() - shiftDate.getTimezoneOffset() * 60000
    );
    console.log(localShiftDate);
    const dayOfWeek = localShiftDate.toLocaleDateString(undefined, {
      weekday: "long",
    });
  console.log(dayOfWeek);
    totalPayByDay[dayOfWeek].totalPay += tip.totalPay;
    totalPayByDay[dayOfWeek].totalHourlyPay += tip.hourlyPay;
    totalPayByDay[dayOfWeek].totalTips += tip.tip_amount;
  });

  const maxTipTotal = Math.max(
    ...Object.values(totalPayByDay).map((day) => day.totalPay)
  );
  const maxAxisValue = Math.ceil(maxTipTotal / 100) * 100;

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: maxAxisValue,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Week To Date Earnings",
      },
      tooltip: {
        callbacks: {
          label: ({ dataIndex }) => {
            const day = labels[dataIndex].split("\n")[0]; // Extract the day of the week
            const { totalHourlyPay, totalTips } = totalPayByDay[day];
            return `Total Hourly Pay: $${totalHourlyPay.toFixed(
              2
            )}\nTips: $${totalTips.toFixed(2)}`;
          },
        },
      },
    },
  };

  const labels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const currentDayIndex = today.getDay();

  // Calculate the date for the previous Sunday
  const previousSunday = new Date(today);
  previousSunday.setDate(today.getDate() - currentDayIndex);

  // Calculate the target dates based on the previous Sunday
  const targetDates = labels.map((_, index) => {
    const targetDate = new Date(previousSunday);
    targetDate.setDate(previousSunday.getDate() + index);
    return targetDate.toLocaleDateString(undefined, {
      month: "numeric",
      day: "numeric",
    });
  });

  const data = {
    labels: labels.map((day, index) => `${day}\n${targetDates[index]}`),
    datasets: [
      {
        label: "Total Day Earnings",
        data: labels.map((day) => totalPayByDay[day].totalPay || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="w-full h-screen">
      <Bar options={options} data={data} />
    </div>
  );
}
