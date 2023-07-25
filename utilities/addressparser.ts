export interface ParsedAddress {
  street: string;
  city: string;
  stateAbbreviation: string;
  zipcode: string;
  country: string;
}
export function parseAddress(address: string): ParsedAddress {
  const parts: string[] = address.split(", ");

  const street: string = parts[0];
  const city: string = parts[1];
  
  const stateAndZip: string[] = parts[2].split(" ");
    const stateAbbreviation: string = stateAndZip[0];
    const zipcode: string = stateAndZip[1];  
  
  const country: string = parts[3];

  return {
    street,
    city,
    stateAbbreviation,
    zipcode,
    country,
  };
}
