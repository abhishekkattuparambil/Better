var date: Date = null

export function getDate(seconds) {
    date = new Date(1970, 0, 1); // Epoch
    date.setSeconds(seconds);
}

export function formatDate() {
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()%1000}`
}

export function formatTime() {
    return date.toLocaleString('en-US', { minute: 'numeric', hour: 'numeric', hour12: true })
}