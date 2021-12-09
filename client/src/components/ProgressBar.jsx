import React from "react";

const ProgressBar = (props) => {

    const { score } = props;

    let progressBgColor = 'bg-red-600';
    if (score > 70) {
        progressBgColor = 'bg-green-600';
    } else if (score > 30) {
        progressBgColor = 'bg-yellow-400';
    }

    return <div>
        <span className="text-sm">{`${score}%`}</span>
        <div className="w-full w-min-64 h-2 rounded-full bg-gray-200">
            <div style={{width: `${score}%`}} className={`w-full h-full rounded-full ${progressBgColor}`}>

            </div>
        </div>
    </div>
}

export default ProgressBar;
