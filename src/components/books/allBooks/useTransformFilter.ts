import { useSelector } from "react-redux";
import { getBookFilter, getPageSize, getPaginationSkip } from "../../../redux/books/selectors";

export const useTransformFilter = () => {
    const bookFilter = useSelector(getBookFilter);
    const pageSize = useSelector(getPageSize);
    const paginationSkip = useSelector(getPaginationSkip);

    return {
        skip: paginationSkip,
        take: pageSize,
        averageRatingFrom: bookFilter.averageRatingFrom,
        averageRatingTo: bookFilter.averageRatingTo,
        filter: {
            and: [
                {
                    title: bookFilter.bookTitle === undefined ? undefined : { contains: bookFilter.bookTitle },
                },
                {
                    bookCategories: !bookFilter.categories.length ? undefined : {
                        all: {
                            category: {
                                or: bookFilter.categories.map(c => ({ id: { eq: c.value } }))
                            }
                        }
                    }
                }
            ]
        }
    }
}