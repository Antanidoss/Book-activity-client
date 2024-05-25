import { useSelector } from "react-redux";
import { getFilter, getPageSize, getPaginationSkip } from "../../../redux/activeBooks/selectors";
import { SortBy } from "../../../common/models/activeBooks";
import { Order } from "../../../query/apolloClient";

export const useTransformFilter = () => {
    const activeBookFilter = useSelector(getFilter);
    const pageSize = useSelector(getPageSize);
    const paginationSkip = useSelector(getPaginationSkip);

    let order = {};

    if (activeBookFilter.sortBy === SortBy.CreateDate) {
        order = { timeOfCreation: Order.ASC }
    } else if (activeBookFilter.sortBy === SortBy.CreateDateDescending) {
        order = { timeOfCreation: Order.DESC }
    } else {
        order = { timeOfUpdate: Order.DESC }
    }

    return {
        skip: paginationSkip,
        take: pageSize,
        withFullRead: activeBookFilter.withFullRead,
        order,
        filter: activeBookFilter.bookTitle === undefined ? undefined : {
            and: [
                {
                    book: { title: { contains: activeBookFilter.bookTitle } },
                },
            ]
        }
    }
}