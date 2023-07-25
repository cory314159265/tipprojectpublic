export default function SearchForm({setSearchText, setZipcode, handleSubmit, searchText, zipcode}: {setSearchText: any, setZipcode: any, handleSubmit: any, searchText: any, zipcode: any}) {
    
    
    return (
    <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Search Query:
            </label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              placeholder="Enter your search query"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Zip Code:
            </label>
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              placeholder="Enter your zipcode"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Submit
          </button>
        </form>
    )
}