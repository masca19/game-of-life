export interface InputProps {
    label: string, 
    updateFileCb: (contentFile: string | ArrayBuffer | null) => void, 
    accept: string
}