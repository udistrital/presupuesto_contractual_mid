interface StandardResponse<T> {
    success: boolean;
    status: number;
    message: string;
    data?: T;
}
