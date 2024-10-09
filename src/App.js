import { useEffect, useRef, useState } from "react";
import { onKeyPress } from "./commont/utilits";
import Loader from "./component/loader";
import Pagination from "./component/pagination";
import SearchInput from "./component/search";
// Define options for the fetch API call, including headers for rapid API
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST
  }
};
function App() {
  const effectRan = useRef(false)
  const [result, setResult] = useState({})
  const [limit, setLimit] = useState(5)
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState('');
  useEffect(() => {
    if (!effectRan.current) {
      fetchData({});
    }
    return () => effectRan.current = true
  }, [])
  /**
   * Fetch data from the API.
   * @param {Object} params - Parameters for the API request.
   * @param {number} params.limit - Number of results to return per page.
   * @param {string} params.search - Search term to filter results.
   * @param {number} params.currentPage - Current page number for pagination.
   */
  const fetchData = async ({ limit = 5, search = '', currentPage = 1 }) => {
    try {
      const params = new URLSearchParams({
        limit: limit,
        namePrefix: search,
        offset: currentPage - 1
      });
      const response = await fetch(`${process.env.REACT_APP_API_URL}/geo/cities?${params}`, options);
      if (response.ok) {
        const data = await response.json();
        setResult(data)
        setTotalCount(data.metadata.totalCount)
        setIsLoading(false)
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  /**
   * Handle key down events for the search input.
   * @param {KeyboardEvent} event - The keyboard event triggered on key down.
   */
  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      if (+limit < 1 || +limit > 10) {
        alert('Max limit is 10. Please enter a value between 1 and 10')
        setLimit(limit)
      } else {
        fetchData({ limit: limit, search: search, currentPage: currentPage })
      }
    }
  }
  /**
   * Handle changes to the limit input.
   * @param {Event} e - The change event triggered by the input.
   */
  const handleLimitChange = (e) => {
    const { value } = e.target
    setLimit(value)
  }
  /**
  * Handle search input changes.
  * @param {string} value - The new search term.
  */
  const onSearch = (value = '') => {
    setIsLoading(true)
    setSearch(value)
    setCurrentPage(1)
    fetchData({ limit: limit, search: value, currentPage: currentPage })
  }
  /**
   * Handle page changes.
   * @param {number} val - The new page number to navigate to.
   */
  const onPageChange = (val) => {
    setCurrentPage(val)
    fetchData({ limit: limit, search: search, currentPage: val })
  }
  const totalPages = Math.ceil(totalCount / limit);
  return (
    <div className="sv-main">
      <div className="sv-flex sv-justify-between sv-align-center">
        <h3>Solvative Cities</h3>
        <SearchInput onSearch={onSearch} />
      </div>
      {isLoading ? <Loader /> : null}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {
            result.data?.length ?
              result.data?.map((items, key) => <tr key={key}>
                <td>{key + 1}</td>
                <td>{items.name}</td>
                <td><img src={`https://flagsapi.com/${items.countryCode}/flat/24.png`} alt={items.countryCode} title={items.countryCode} /></td>
              </tr>)
              :
              <tr>
                <td colSpan={3}>No result found</td>
              </tr>
          }
        </tbody>
      </table>
      {result.data?.length ? <div className="sv-flex sv-justify-between sv-align-center">
        <input className="sv-limit-input sv-form-input" value={limit} onChange={handleLimitChange} onKeyDown={handleKeyDown} onKeyPress={onKeyPress} />
        <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage} />
      </div> : null}
    </div>
  );
}

export default App;
