import { useState } from "react";

export default function CryptoHero () {
  // Примерен масив за статистики
  const stats = [
    { label: '24h Обем на търговия', value: '$76 млрд+' },
    { label: 'Листвани криптовалути', value: '600+' },
    { label: 'Регистрирани потребители', value: '90 млн.' },
  ];

  // Примерен масив с криптовалути за търсене
  const cryptoAssets = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579', detailsLink: '/crypto/bitcoin' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880', detailsLink: '/crypto/ethereum' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', logo: 'https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860', detailsLink: '/crypto/cardano' },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB', logo: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615', detailsLink: '/crypto/binancecoin' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP', logo: 'https://assets.coingecko.com/coins/images/44/standard/xrp-symbol-white-128.png?1696501442', detailsLink: '/crypto/ripple' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png?1640133427', detailsLink: '/crypto/solana' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', logo: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547033577', detailsLink: '/crypto/dogecoin' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredResults = cryptoAssets.filter(asset =>
        asset.name.toLowerCase().includes(value.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Малко забавяне, за да позволи клик върху резултат преди да скрие
    setTimeout(() => setShowResults(false), 100); 
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Съдържание на Hero секцията (Заглавие, Описание, Търсене) */}
          <div className="lg:col-span-6">
            {/* Заглавие */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Децентрализирано за</span>{' '}
              <span className="block text-indigo-400 xl:inline">по-добро утре</span>
            </h1>

            {/* Описание */}
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Купувайте, търгувайте и съхранявайте над 600 криптовалути с лекота и сигурност. 
              Започнете своето пътешествие в света на Web3 днес.
            </p>

            {/* Поле за търсене и резултати */}
            <div className="mt-10 relative">
              <div className="flex justify-center rounded-md shadow-sm">
                <input
                  type="text"
                  name="crypto-search"
                  id="crypto-search"
                  className="block rounded-md w-3/4 border-gray-300 bg-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                  placeholder="Търси криптовалути (напр. BTC, Ethereum)"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  />
              {/* Показване на резултати */}
              {showResults && searchResults.length > 0 && (
                  <div className="absolute mt-12 w-3/4 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {searchResults.map((asset) => (
                        <a
                        key={asset.id}
                        href={asset.detailsLink}
                        className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                        role="menuitem"
                        >
                        <img src={asset.logo} alt={asset.name} className="h-6 w-6 mr-3" />
                        <span className="font-semibold">{asset.symbol}</span>
                        <span className="ml-2 text-gray-400"> - {asset.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
               {showResults && searchResults.length === 0 && searchTerm.length > 0 && (
                   <div className="absolute z-10 mt-12 w-3/4 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1 px-4 text-sm text-gray-400">Няма намерени резултати.</div>
                </div>
              )}

              </div>
            </div>

            {/* Секция със Статистики */}
            <div className="mt-12">
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-indigo-400 sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-sm font-medium text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Визуален елемент (Изображение или 3D Модел) */}
          <div className="mt-12 lg:col-span-6 lg:mt-0 flex justify-center items-center">
            {/* Тук може да добавиш 3D модел, анимирана графика или впечатляващо изображение */}
            <div className="h-64 w-full rounded-lg bg-indigo-900/50 flex items-center justify-center p-6 shadow-2xl">
              <span className="text-indigo-200 text-xl font-semibold">
                



[Image of Cryptocurrency 3D Chart or abstract crypto design]


              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};