export const calculateSkip = (currentPage: number, pageSize: number): number => {
    return (currentPage - 1) * pageSize;
}

