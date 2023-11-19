import instanceAxios from "./instanceAxios";

export const bookRatingApi = {
    update(bookRatingId: string, grade: number, description: string) {
        return instanceAxios.put("/bookRating/update", { bookRatingId, grade, description });
    }
} 