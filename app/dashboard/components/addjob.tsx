import React, { useState } from "react";
import { parseAddress, ParsedAddress } from "../../../utilities/addressparser";
import SearchForm from "./searchform";
export default function AddJob() {
  const [searchText, setSearchText] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [responseData, setResponseData] = useState<any>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);

  const handleSeclected = async () => {
    
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

    const updatedBusiness = {
      ...rest,
      ...address,
    };
    try {
      const response = await fetch("/api/insertjob/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBusiness),
      });
      const data = await response.json();
      console.log("response", data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  // insert into supabase database table updatedBusiness unless it already exists

  // check if business exists in supabae

  // if yes, bring up job details form

  // if no, create new business in supabase, then bring up job details form

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestBody = {
      searchText: searchText,
      zip: zipcode,
    };
    try {
      const response = await fetch("/api/mapsearch/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle the response from the server
      const data = await response.json();
      setResponseData(data);
      setSelectedBusiness(null); // Reset selected business when new data is fetched
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleBusinessSelection = (business: any) => {
    setSelectedBusiness(business);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {!selectedBusiness ? (
        <SearchForm
          handleSubmit={handleSubmit}
          setSearchText={setSearchText}
          setZipcode={setZipcode}
          searchText={searchText}
          zipcode={zipcode}
        />
      ) : (
        <>
          <button onClick={handleSeclected}>
            Is this the Correct Business?
          </button>
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
