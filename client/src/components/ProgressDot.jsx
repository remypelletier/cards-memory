import React, { useEffect } from "react";

const ProgressDot = (props) => {

    const { categories, limit, index } = props;

    const bulletList = (categories) => {
        let results = [];
        let categoriesCpy = [...categories];
        for (let i = 0; i < categoriesCpy.length || i < limit; i++) {
            results.push(<li key={`bullet-${index}-${i}`} className={`w-3 h-3 rounded-full m-1 ${getBgColor(categoriesCpy[i])}`}></li>);
        }
        return results;
    };

    return <ul className="flex justify-center">
        { bulletList(categories) }
    </ul>
}

const getBgColor = (category) => {
    let bgColor;
    if (category === undefined) {
        category = 'NOT_ANSWERED';
    }
    switch (category) {
        case 'GOOD':
            bgColor = 'bg-green-500'
        break;
        case 'ALMOST':
            bgColor = 'bg-yellow-500'
        break;
        case 'REVIEW_NEEDED':
            bgColor = 'bg-red-500'
        break;
        default:
            bgColor = 'bg-gray-500';
    }
    return bgColor;
}

export default ProgressDot;
