const pagination = ({currentPage, }) => {
    if(!pageInfo) return null;
    return(
        <nav aria-label="Standard pagination example" style={{ float: "right" }}>
            <ul className="pagination">
                <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => currentPage > 1 && changePage(currentPage - 1)}
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>

                {Array.from(
                    { length: pageInfo.endPage - pageInfo.startPage + 1 },
                    (_, index) => pageInfo.startPage + index
                ).map((pageNum) => (
                    <li
                        className={`page-item ${currentPage == pageNum ? "active" : ""}`}
                        key={pageNum}
                    >
                        <button className="page-link" onClick={() => changePage(pageNum)}>
                            {pageNum}
                        </button>
                    </li>
                ))}

                <li className={`page-item ${currentPage >= pageInfo.maxPage ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => currentPage < pageInfo.maxPage && changePage(currentPage + 1)}
                        disabled={currentPage >= pageInfo.maxPage}
                        aria-label="Next"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    
    );























}
export default pagination;