export default function CryptoHero () {
  // Примерен масив за статистики
  const stats = [
    { label: '24h Обем на търговия', value: '$76 млрд+' },
    { label: 'Листвани криптовалути', value: '600+' },
    { label: 'Регистрирани потребители', value: '90 млн.' },
  ];

  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Съдържание на Hero секцията (Заглавие, Описание, CTA) */}
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

            {/* Бутони за призив за действие (CTA) */}
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                >
                  Започни търговия
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:ml-3 sm:mt-0">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
                >
                  Научи повече
                </a>
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