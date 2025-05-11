interface Response {
    success: boolean;
    message: string;
    data: object | null;
}

export const sendResponse = (message: string, success: boolean = false, data: object | null = null): Response => {
    return {
        success,
        message,
        data,
    };
};
