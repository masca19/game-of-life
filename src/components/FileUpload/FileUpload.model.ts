export interface InputProps {
    title: string,
    label: string, 
    updateFileCb: (contentFile: string ) => void, 
    accept: string,
    isInError: boolean
}