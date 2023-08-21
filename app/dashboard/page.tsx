"use client";
import { useState, useEffect } from 'react';
import LastSevenDayEarnings from './components/charts/lastsevendayearnings';

// Define the interface for the tip data

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

function TipsComponent() {
  const [tipsData, setTipsData] = useState<TipData[]>([]);

  useEffect(() => {
    async function fetchTips() {
      const response = await fetch('/api/usertipsdata/getmonthtips/');
      const data = await response.json();
      console.log(data);
      setTipsData(data);
    }
    fetchTips();
    
  }, []);

  return (
   <>
   <h1> Dash Board</h1>
    <h2> Tips </h2>
    <div>
        {tipsData.map((tip) => (
            <div key={tip.shift_date}>
                <p>Tip Amount: {tip.tip_amount}</p>
                <p>Tip Date: {tip.shift_date}</p>
            </div>
            ))}
    </div>
    <LastSevenDayEarnings tipsData={tipsData}/>
   </>
  );
}

export default TipsComponent;
