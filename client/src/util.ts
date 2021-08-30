
export const SERVER = 'https://localhost:4000'

export function setInputState(setState: (val: string) => void) {
    return function (e: any) {
        const value = e.currentTarget.value;
        setState(value);
    }
}
export const setDropDownState = (setState: any) => (e: any, data: any) => {
    setState(data.value);
}