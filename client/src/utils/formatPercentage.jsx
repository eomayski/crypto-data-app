export default function formatPercentage(percent) {
        const colorClass = percent >= 0 ? 'text-green-400' : 'text-red-500';
        return (
            <span className={colorClass}>
                {percent > 0 ? '▲' : '▼'} {percent ? (percent)?.toFixed(2) : 'Loading...'}%
            </span>
        );
}