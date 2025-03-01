enum BroadcastType {
    LOG = 'LOG',
}

interface Broadcast {
    type: BroadcastType;
    timestamp: string;
    message: string;
}


export function sendLog(message: string){
    return {
        type: BroadcastType.LOG,
        timestamp: new Date().toISOString(),
        message,
    }
}