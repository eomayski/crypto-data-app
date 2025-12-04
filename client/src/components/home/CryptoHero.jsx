import { useEffect, useState } from "react";
import { Link } from "react-router";

const COINDESK_SEARCH_API = 'https://data-api.coindesk.com/asset/v1/search';

// Debouncing delay
const DEBOUNCE_DELAY = 500;

export default function CryptoHero() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Benefits
  const benefits = [
    { label: '24h Обем на търговия', value: '$76 млрд+' },
    { label: 'Листвани криптовалути', value: '600+' },
    { label: 'Регистрирани потребители', value: '90 млн.' },
  ];
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 1) {
        fetchCryptoAssets(searchTerm);
      } else {
        setSearchResults([]);
        setShowResults(false);
        setIsLoading(false);
      }
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);


  const fetchCryptoAssets = async (value) => {
    setIsLoading(true);
    setShowResults(true);
    
    try {
      const response = await fetch(`${COINDESK_SEARCH_API}?search_string=${value}&limit=5`);
      
      if (!response.ok) {
        throw new Error('Грешка при извличане на данни от CoinDesk');
      }

      const data = await response.json();
      
      const assets = data.Data.LIST || []; 

      console.log(assets);
      
      setSearchResults(assets.map(asset => ({
        id: asset.ID,
        symbol: asset.SYMBOL, 
        name: asset.NAME,
        logo: asset.LOGO_URL, 
        detailsLink: `/crypto/${asset.URI.toLowerCase()}`,
      })));

    } catch (error) {
      console.error("Fetch Error:", error);
      setSearchResults([]); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputFocus = () => {
    if (searchTerm.length > 1 || searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowResults(false), 150); 
  };
  

    return (
        <div className="bg-gray-900 text-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">

                    <div className="lg:col-span-6">
                        {/* Title */}
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Know your</span>{' '}
                            <span className="block text-indigo-400 xl:inline">Crypto</span>
                        </h1>

                        {/* Description */}
                        <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                            Follow the latest trends in the world of decentralized assets. <br /> Build and monitor your crypto portfolio.
                        </p>

                        {/* Search Field */}
                        <div className="mt-10 relative">
                            <div className="flex justify-center">
                                <input
                                    type="text"
                                    name="crypto-search"
                                    id="crypto-search"
                                    className="block rounded-md w-3/4 border-gray-300 bg-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                                    placeholder="Search currencies (e.g., BTC, Ethereum)"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                                {/* Results */}
                                {showResults && searchResults.length > 0 && (
                                    <div className="absolute mt-12 w-3/4 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            {searchResults.map((asset) => (
                                                <Link
                                                    key={asset.id}
                                                    to={asset.detailsLink}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                                                    role="menuitem"
                                                >
                                                    <img src={asset.logo} alt={asset.symbol} className="h-6 w-6 mr-3" />
                                                    <span className="font-semibold">{asset.symbol}</span>
                                                    <span className="ml-2 text-gray-400"> - {asset.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {showResults && searchResults.length === 0 && searchTerm.length > 0 && (
                                    <div className="absolute z-10 mt-12 w-3/4 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="py-1 px-4 text-sm text-gray-400">Nothing found!</div>
                                    </div>
                                )}

                                {isLoading && (
                                    <div className="absolute z-10 mt-12 w-3/4 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="py-1 px-4 text-sm text-gray-400">Loading results...</div>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Benefits Section 
                        <div className="mt-12">
                            <div className="grid grid-cols-3 gap-6">
                                {benefits.map((benefit) => (
                                    <div key={benefit.label} className="text-center">
                                        <p className="text-2xl font-bold text-indigo-400 sm:text-3xl">{benefit.value}</p>
                                        <p className="mt-1 text-sm font-medium text-gray-400">{benefit.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>*/}
                    </div>

                    {/* Visual Element */}
                    <div className="mt-12 lg:col-span-6 lg:mt-0 flex justify-center items-center">
                        <div className="w-full flex items-center justify-center p-6">
                            <span className="text-indigo-200 text-xl font-semibold">
                                <img src="https://www.i-s-p.co.uk/wp-content/uploads/2022/10/Globe-v5.gif" className="h-120 min-w-120" alt="crypto" />
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};