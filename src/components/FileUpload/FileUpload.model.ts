export interface InputProps {
    label: string, 
    updateFileCb: (contentFile: string ) => void, 
    accept: string,
    isInError: boolean
}