"use client";
import React, { useState } from "react";
import { parseAddress, ParsedAddress } from "../../../utilities/addressparser";
import SearchForm from "./components/searchform";
import { useRouter } from "next/navigation";


export default function AddJob() {
const router = useRouter();
  // State to store user input for search text and zipcode
  const [searchText, setSearchText] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  // State to store response data from the server after search
  const [responseData, setResponseData] = useState<any>(null);
  // State to store the selected business from the search results
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);

  // Handler for when the user confirms the selected business
  const handleSelected = async () => {
    // Parse selected business address
    const businessAdd: ParsedAddress = parseAddress(
      selectedBusiness.formatted_address
    );
    const business = {
      name: selectedBusiness.name,
      place_id: selectedBusiness.place_id,
      lat: selectedBusiness.geometry.location.lat,
      lng: selectedBusiness.geometry.location.lng,
      address: businessAdd,
    };
    const { address, ...rest } = business;

    // Create the updated business object by merging the rest and address objects
    const updatedBusiness = {
      ...rest,
      ...address,
    };

    try {
      // Send the updated business data to the server to insert the job
      const response = await fetch("/api/insertbusiness/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBusiness),
      });

      // Process the response from the server
      const data = await response.json();
      // Add send to dashboard/addjob/jobdetails with query param of the business id from DB
      router.push('/dashboard/addjob/jobdetails?id=' + data);
      
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  // Comment: The above function handles confirming the selected business, parsing its address,
  // and sending it to the server to insert the job. The response from the server is logged to the console.

  // Handler for the search form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestBody = {
      searchText: searchText,
      zip: zipcode,
    };
    try {
      // Send the search form data to the server for map search
      const response = await fetch("/api/mapsearch/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle the response from the server
      const data = await response.json();
      setResponseData(data);
      setSelectedBusiness(null);  // Reset selected business when new data is fetched
      
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  // Comment: The above function handles the search form submission, sending the search text
  // and zipcode to the server for map search. The response data is stored in state, and the selected
  // business is reset to null when new data is fetched.

  // Handler for selecting a business from the search results
  const handleBusinessSelection = (business: any) => {
    setSelectedBusiness(business);
  };
  // Comment: The above function handles selecting a business from the search results and
  // updates the selectedBusiness state with the chosen business.

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {!selectedBusiness ? (
        // Render the search form if no business is selected
        <SearchForm
          handleSearchSubmit={handleSubmit}
          setSearchText={setSearchText}
          setZipcode={setZipcode}
          searchText={searchText}
          zipcode={zipcode}
        />
      ) : (
        <>
          {/* Button to confirm the selected business */}
          <button onClick={handleSelected}>
            Is this the Correct Business?
          </button>
          {/* Display the selected business details */}
          <h3 className="text-lg font-bold">{selectedBusiness.name}</h3>
          <p className="text-gray-600">{selectedBusiness.formatted_address}</p>
          {selectedBusiness.formatted_phone_number && (
            <p className="text-gray-600">
              {selectedBusiness.formatted_phone_number}
            </p>
          )}
        </>
      )}
      {responseData && (
        <div>
          <h2 className="text-xl font-bold mb-4">Businesses:</h2>
          <ul className="space-y-4">
            {responseData.results.map((business: any) => (
              <li
                key={business.place_id}
              
                className={`cursor-pointer ${
                  selectedBusiness?.place_id === business.place_id
                    ? "bg-indigo-100"
                    : "hover:bg-gray-100"
                } p-4 rounded-lg`}
                onClick={() => {
                  handleBusinessSelection(business);
                }}
              >
                <h3 className="text-lg font-bold">{business.name}</h3>
                <p className="text-gray-600">{business.formatted_address}</p>
                {business.formatted_phone_number && (
                  <p className="text-gray-600">
                    {business.formatted_phone_number}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
