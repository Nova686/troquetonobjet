import {Dispatch, FC, SetStateAction} from "react";
import {useTheme} from "@mui/material/styles";
import {Button} from "../../atoms";

interface PaginationProps
{
    currentPage: number;
    totalPage: number;
    onPageChange: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({currentPage, totalPage, onPageChange}: PaginationProps) =>
{
    const theme = useTheme();

    const changePageClick = (page: number) =>
    {
        onPageChange(page);
    }

    return (
        <nav role="navigation"
             style={{display: "flex", marginTop: '16px', alignItems: 'center', justifyContent: 'center'}}>
            <ul style={{
                position:       'relative',
                display:        "inline-flex",
                listStyle:      'none',
                justifyContent: 'center',
                padding:        0,
                gap:            '12px'
            }}>
                {/* Previous Page Link */}
                {currentPage === 1 ?
                    <li className="disabled">
                                <span>
                                    <Button
                                        disabled
                                        style={{
                                            border:      '1px solid',
                                            borderColor: theme.palette.secondary.main,
                                            background:  theme.palette.secondary.main,
                                            color:       theme.palette.background.default
                                        }}
                                        aria-hidden="true">
                                        <svg style={{height: '25px', width: '25px'}} fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </Button>
                                </span>
                    </li>
                    :
                    <li>
                        <a onClick={() => changePageClick(Math.max(1, currentPage - 1))} rel="prev">
                            <Button
                                style={{
                                    border:      '1px solid',
                                    borderColor: theme.palette.primary.main,
                                    background:  theme.palette.primary.main,
                                    color:       theme.palette.background.default
                                }}
                                aria-hidden="true">
                                <svg style={{height: '25px', width: '25px'}} fill="currentColor"
                                     viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </Button>
                        </a>
                    </li>
                }

                {currentPage > 3 &&
                    <li className="hidden-xs">
                        <Button onClick={() => changePageClick(Math.max(1, currentPage - 1))}
                                style={{
                                    fontWeight:  600,
                                    border:      '1px solid',
                                    borderColor: theme.palette.primary.main,
                                    color:       theme.palette.primary.main
                                }}>
                            1
                        </Button>
                    </li>
                }
                {currentPage > 4 &&
                    <li>
                        <Button
                            disabled
                            style={{
                                fontWeight:  600,
                                border:      '1px solid',
                                borderColor: theme.palette.secondary.main,
                                background:  theme.palette.secondary.main,
                                color:       theme.palette.background.default
                            }}>
                            ...
                        </Button>
                    </li>
                }
                {Array.from({length: totalPage}, (_, i) => i).map(i => i + 1).map(i =>
                    {
                        return (
                            <>
                                {(i >= currentPage - 2 && i <= currentPage + 2) &&
                                    (i === currentPage ?
                                            <li className="active">
                                                <Button
                                                    disabled
                                                    style={{
                                                        fontWeight:  600,
                                                        border:      '1px solid',
                                                        borderColor: theme.palette.secondary.main,
                                                        color:       theme.palette.secondary.main
                                                    }}>
                                                    {i}
                                                </Button>
                                            </li>
                                            :
                                            <li>
                                                <Button onClick={() => changePageClick(Math.min(totalPage, i))}
                                                        style={{
                                                            fontWeight:  600,
                                                            border:      '1px solid',
                                                            borderColor: theme.palette.primary.main,
                                                            color:       theme.palette.primary.main
                                                        }}>
                                                    {i}
                                                </Button>
                                            </li>
                                    )
                                }
                            </>
                        )
                    }
                )}
                {currentPage < totalPage - 3 &&
                    <li>
                        <Button
                            disabled
                            style={{
                                fontWeight:  600,
                                border:      '1px solid',
                                borderColor: theme.palette.secondary.main,
                                background:  theme.palette.secondary.main,
                                color:       theme.palette.background.default
                            }}>
                            ...
                        </Button>
                    </li>
                }
                {currentPage < totalPage - 2 &&
                    <li className="hidden-xs">
                        <Button onClick={() => changePageClick(Math.min(totalPage, currentPage + 1))}
                                style={{
                                    fontWeight:  600,
                                    border:      '1px solid',
                                    borderColor: theme.palette.primary.main,
                                    color:       theme.palette.primary.main
                                }}>
                            {totalPage}
                        </Button>
                    </li>
                }

                {/* Next Page Link */}
                {currentPage + 1 <= totalPage ?
                    <li>
                        <a onClick={() => changePageClick(Math.min(totalPage, currentPage + 1))} rel="next">
                            <Button
                                style={{
                                    border:      '1px solid',
                                    borderColor: theme.palette.primary.main,
                                    background:  theme.palette.primary.main,
                                    color:       theme.palette.background.default
                                }}
                                aria-hidden="true">
                                <svg style={{height: '25px', width: '25px'}} fill="currentColor"
                                     viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </Button>
                        </a>
                    </li>
                    :
                    <li className="disabled">
                                <span>
                                    <Button
                                        disabled
                                        style={{
                                            border:      '1px solid',
                                            borderColor: theme.palette.secondary.main,
                                            background:  theme.palette.secondary.main,
                                            color:       theme.palette.background.default
                                        }}
                                        aria-hidden="true">
                                        <svg style={{height: '25px', width: '25px'}} fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </Button>
                                </span>
                    </li>
                }
            </ul>
        </nav>
    );
};

export default Pagination;