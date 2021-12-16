
const secondsToDhms = (seconds) => {
    seconds = parseInt(seconds);
    return {
        d: Math.floor(seconds / (3600*24)),
        h: Math.floor(seconds % (3600*24) / 3600),
        m: Math.floor(seconds % 3600 / 60),
        s: Math.floor(seconds % 60)
    };
}

const dhmsShortFormat = (dhms) => {
    if (dhms.d > 0) {
        return `${dhms.d}d ${dhms.h}h`; 
    }
    if (dhms.h > 0) {
        return `${dhms.h}h ${dhms.m}m`; 
    }
    if (dhms.m > 0) {
        return `${dhms.m}m`; 
    }
}

const dhmsLongFormat = (dhms) => {
    if (dhms.d > 0) {
        return dhms.d > 1 ? `${dhms.d} days` : `${dhms.d} day`; 
    }
    if (dhms.h > 0) {
        return dhms.h > 1 ? `${dhms.h} hours` : `${dhms.h} hour`; 
    }
    if (dhms.m > 0) {
        return dhms.m > 1 ? `${dhms.m} mins`: `${dhms.m} min`; 
    }
}

export { secondsToDhms, dhmsShortFormat, dhmsLongFormat };
