import { createContext, useContext, useState, ReactNode } from "react";
import { Toast } from "../components/atoms";
import { CustomToastProps } from "../typings/components/CustomToastProps";

// Définition du type correct
interface ToastContextType {
    showToast: (props: CustomToastProps) => void;
}

// Création du contexte
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [customProps, setCustomProps] = useState<CustomToastProps | null>(null);

    const showToast = (props: CustomToastProps) => {
        setCustomProps(props);
    };

    const hideToast = () => {
        setCustomProps(null);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {customProps && <Toast {...customProps} onClose={hideToast}/>}
        </ToastContext.Provider>
    );
};

// Hook personnalisé pour utiliser le toast
export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
