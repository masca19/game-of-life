export interface InputProps {
    title: string,
    label: string, 
    accept: string,
    updateFileCb: (contentFile: string ) => void,
    cleanAll: () => void
}