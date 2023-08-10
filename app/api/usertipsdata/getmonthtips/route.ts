import { NextRequest, NextResponse } from "next/server";


import supabase from "@/supabase";

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
}
const asTipDataArray = (data: any[]): TipData[] => {
  return data.map((item) => ({
    tip_amount: item.tip_amount,
    shift_date: item.shift_date,
    time_worked_minutes: item.time_worked_minutes,
    jobs_table: {
      job_type: item.jobs_table.job_type,
      job_hourly_pay: item.jobs_table.job_hourly_pay,
      businesses: {
        name: item.jobs_table.businesses.name,
      },
    },
  }));
};

const currentDate = new Date(); // Get the current date
const startOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1
);
const endOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
);

export async function GET(req: NextRequest, res: NextResponse) {
  const { data, error } = await supabase
    .from("tips_table")
    .select(
      `tip_amount, 
       shift_date, 
       time_worked_minutes,
       jobs_table(
        job_type, 
        job_hourly_pay,
        businesses(
          name
          )
       )`
    )
    .eq("user_id", 1)
    .gte("shift_date", startOfMonth.toISOString()) // Greater than or equal to the start of the current month
    .lt("shift_date", endOfMonth.toISOString());

    console.log("Data:", data);

    
    
  if (data) {
    const tipDataArray = asTipDataArray(data); 
    const calculatedData = tipDataArray.map((tipData) => {
        console.log("Tip Data:", tipData);
        console.log("Jobs Table:", tipData.jobs_table);
        
        const totalPay =
          tipData.tip_amount +
          (tipData.time_worked_minutes / 60) * Number(tipData.jobs_table.job_hourly_pay);
        
        const hourlyPay = totalPay / (tipData.time_worked_minutes / 60);
        return {
          ...tipData,
          totalPay,
          hourlyPay,
        };
      
      
    });

    console.log("Calculated Data:", calculatedData);
  }
  if (error) {
    throw error;
  }

  return NextResponse.json(data);
}
