export default interface PageContext<T = { [key: string]: string }> {
    params: T;
    searchParams: { [key: string]: string };
}