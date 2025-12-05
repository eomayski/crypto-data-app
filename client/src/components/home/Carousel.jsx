import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";



export default function Carousel() {
    const [topCoins, setTopCoins] = useState([])

    useEffect(() => {
        fetch('https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=10&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,PRICE,MKT_CAP,CHANGE&toplist_quote_asset=USD')
            .then(response => response.json())
            .then(result => {
                setTopCoins(result.Data.LIST);
            })
            .catch((err) => alert(err.message));
    }, []);


    const settings = {
        autoplay: true,
        dots: false,
        arrows: false,
        infinite: true,
        autoplaySpeed: 1500,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            }
        ],
    };
    return (
        <div className="">
        <div className="bg-gray-900 text-white pl-6 lg:-mt-16 mt-16">
            <Slider {...settings}>
                {topCoins.map((item) => (
                    <div key={item.ID} className="pr-6">
                        <div className="px-5 py-6 bg-[#9b87f533] bg-opacity-20 rounded-xl transform transition duration-300 hover:translate-y-3 hover:shadow-xl">
                            <div className="flex items-center gap-5">
                                <div
                                    className={`bg-gray-700 px-2 py-2 rounded-full`}
                                >
                                    <img
                                        src={item.LOGO_URL || `https://img.logokit.com/crypto/${item.SYMBOL}?token=pk_frb84544654070d00e882e`} 
                                        alt={item.SYMBOL}
                                        className="h-10 min-w-10"
                                    />
                                </div>
                                <p className="text-white text-xs font-normal ">
                                    <span className="text-16 font-bold mr-2">{item.NAME}</span>
                                    {item.SYMBOL}
                                </p>
                            </div>
                            <div className="flex items-center justify-end mt-7">
                                <div className="">
                                    <p className="text-16 font-bold mr-2 text-white mb-0 leading-none">
                                        ${(item.PRICE_USD).toFixed(2)} 
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <span className={`${(Number(item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_CONVERSION)) < 0 ? 'text-red-500' : 'text-green-500'} text-xs`}>{(item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_CONVERSION).toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
        </div>
    );
};