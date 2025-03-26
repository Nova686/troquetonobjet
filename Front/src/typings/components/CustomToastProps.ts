export type CustomToastProps = {
    message: string;
    position: {vertical: "top" | "bottom", horizontal: "left" | "right" | "center"};
    closeTime?: number | null;
}