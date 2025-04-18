export type CustomToastProps = {
    message: string;
    position: {vertical: "top" | "bottom", horizontal: "left" | "right" | "center"};
	type: 'success' | 'error';
    closeTime?: number | null;
}