export function nanoToSeconds(nanoseconds: number): number {
    return nanoseconds / 1e9;
}

export function tokensPerSecond(evalCount: number, evalDuration: number): number {
    return (evalCount / evalDuration) * 1e9;
}