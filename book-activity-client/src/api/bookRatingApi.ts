import instanceAxios from "./instanceAxios";

export const bookRatingApi = {
    update(bookRatingId: string, grade: number, description: string) {
        instanceAxios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization") as string;
        return instanceAxios.put("/bookRating/update", {
            bookRatingId: bookRatingId,
            bookOpinion: {
                grade: grade,
                description: description
            }
        });
    }
} 