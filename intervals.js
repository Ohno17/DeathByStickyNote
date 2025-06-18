
const MIN_TIMEOUT = 10;

var intervals = [];

function createSubIntervals(func, time) {
    if (time < MIN_TIMEOUT) {
        return [...createSubIntervals(func, time * 2), ...createSubIntervals(func, time * 2)];
    }
    return [setInterval(func, time)];
}

// Insert or add set of intervals
function createInterval(func, time) {
    let id;

    for (id = 0; id < intervals.length; id++) {
        if (intervals[id] === null) {
            intervals[id] = createSubIntervals(func, time);
            return id;
        }
    }

    id = intervals.push(createSubIntervals(func, time)) - 1;
    return id;
}

// Clear associated interval and set entry to null
function deleteInterval(id) {
    const subIntervals = intervals[id];
    if (!subIntervals) return;
    for (let i = 0; i < subIntervals.length; i++) {
        clearInterval(subIntervals[i]);
    }
    intervals[id] = null;
}
