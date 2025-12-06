import { Link } from "react-router";

export default function NewsCard({
    GUID,
    IMAGE_URL,
    TITLE,
}) {

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <Link to={`/news/${GUID}`} className="block">
                <img
                    className="w-full h-80 object-cover object-top"
                    src={IMAGE_URL}
                    alt={TITLE}
                />
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-white leading-tight">
                        {TITLE}
                    </h3>
                </div>
            </Link>
        </div>
    );
}