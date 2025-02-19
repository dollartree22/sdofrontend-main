import { useState, useEffect, useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import context from "../context/context";

const MiningButton = ({ currentminingtime }) => {
    const [miningStartTime, setMiningStartTime] = useState(currentminingtime ? new Date(currentminingtime) : null);
    const [timeLeft, setTimeLeft] = useState(0);
    const { startMining } = useContext(context);

    useEffect(() => {
        if (!miningStartTime) return;

        const updateTimer = () => {
            const now = new Date();
            const diff = miningStartTime.getTime() + 4 * 60 * 60 * 1000 - now.getTime();
            setTimeLeft(diff > 0 ? diff : 0);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [miningStartTime]);

    const handleStartMining = async () => {
        setMiningStartTime(new Date()); // Instantly update state to reflect UI change
        await startMining(); // Call actual mining function after updating state
    };

    const formatTime = (ms) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {timeLeft > 0 ? (
                <div className="flex flex-col items-center">
                    <CountdownCircleTimer
                        isPlaying
                        duration={4 * 60 * 60} // 4 hours in seconds
                        initialRemainingTime={timeLeft / 1000}
                        colors={["#4CAF50", "#F7B801", "#FF5733", "#A30000"]}
                        colorsTime={[14400, 7200, 3600, 0]} // Color transitions
                        size={120}
                        strokeWidth={10}
                    >
                        {({ remainingTime }) => (
                            <span className="text-lg font-semibold text-gray-800">
                                {formatTime(remainingTime * 1000)}
                            </span>
                        )}
                    </CountdownCircleTimer>
                    <p className="text-gray-600 text-sm mt-2">Mining in progress...</p>
                </div>
            ) : (
                <button
                    className="btn flex items-center px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
                    onClick={handleStartMining}
                    disabled={timeLeft > 0} // Prevent multiple clicks
                >
                    <span className="btnText mr-2">Start Mining</span>
                    <i className="fa-solid fa-money-bill-transfer fa-xl"></i>
                </button>
            )}
        </div>
    );
};

export default MiningButton;
