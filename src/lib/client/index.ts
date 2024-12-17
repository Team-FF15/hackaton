export type FetchSuccess<T> = {
    success: true;
    data: T;
}

export type FetchFailure = {
    success: false;
    error: Error;
}