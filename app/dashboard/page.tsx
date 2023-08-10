"use client";
import { useState, useEffect } from 'react';

// Define the interface for the tip data
interface TipData {
  tip_id: number;
  tip_amount: number;
  time_worked_minutes: number;
  job_type: string;
  job_hourly_pay: string;
  business_name: string;
  total_earnings: number;
    shift_date: string;
}

function TipsComponent() {
  const [tipsData, setTipsData] = useState<TipData[]>([]);

  useEffect(() => {
    async function fetchTips() {
      const response = await fetch('/api/usertipsdata/getmonthtips/');
      const data = await response.json();
      console.log(data);
      await setTipsData(data);
    }
    fetchTips();
    
  }, []);

  return (
   <>
   <h1> Dash Board</h1>
    <h2> Tips </h2>
    <div>
        {tipsData.map((tip) => (
            <div key={tip.tip_id}>
                <p>Tip Amount: {tip.tip_amount}</p>
                <p>Tip Date: {tip.shift_date}</p>
            </div>
            ))}
    </div>
   </>
  );
}

export default TipsComponent;
