"use client";
import { useEffect } from "react";
import LastSevenDaysEarnings from "./components/charts/lastsevendayearnings";

export default function Dashboard() {
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/usertipsdata/gettipsweektodate/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: "1" }),
                });

                const data = await response.json();
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); 
    
    return (
        <>
            <h1>DASHBOARD</h1>
            <LastSevenDaysEarnings />
        </>
    );
}


