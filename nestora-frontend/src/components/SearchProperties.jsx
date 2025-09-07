import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const NavbarSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { properties } = useAppContext();

  // 🔎 Fetch results (debounced)
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      try {
        setLoading(true);
        const filtered = properties.slice().filter((property) => {
          return (
            property.address.city.toLowerCase().includes(query.toLowerCase()) ||
            property.address.state
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            property.address.country
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            property.property_type
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            property.title.toLowerCase().includes(query.toLowerCase())
          );
        });
        setResults(filtered);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchResults, 300);
    return () => clearTimeout(delay);
  }, [query]);

  // 🔗 Handle selection
  const handleSelect = (property) => {
    setQuery("");
    setResults([]);
    navigate(`/property-details/${property._id}`);
  };

  // ⌨️ Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(results[activeIndex]);
    }
  };

  return (
    <div className="relative w-[400px] max-w-xl">
      <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full w-full">
        <input
          type="text"
          placeholder="Search properties..."
          className="py-2 w-full bg-transparent outline-none placeholder:text-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* Loader or Search Icon */}
        {loading ? (
          <Loader2 className="animate-spin text-gray-400 w-4 h-4" />
        ) : (
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 cursor-pointer"
          />
        )}
      </div>

      {/* Dropdown Results */}
      {results.length > 0 && (
        <ul className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg max-h-72 overflow-y-auto z-50">
          {results.map((property, index) => (
            <li
              key={property._id}
              className={`px-3 py-2 cursor-pointer flex items-center space-x-3 ${
                index === activeIndex ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(property)}
            >
              <img
                src={property.image || "/placeholder.jpg"}
                alt={property.title}
                className="w-12 h-12 object-cover rounded-md border"
              />
              <div>
                <p className="font-medium">{property.title}</p>
                <p className="text-sm text-gray-500">
                  {property.address?.city}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavbarSearch;
