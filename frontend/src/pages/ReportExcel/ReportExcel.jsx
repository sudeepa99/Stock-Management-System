import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './ReportExcel.css'
const ReportExcel = () => {

    const [reports, setReports] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchReports = async (currentPage) => {
        const response = await axios.get(`http://localhost:5000/reports`, {
            params: { page: currentPage + 1, limit: 5 },
        });
        setReports(response.data);
        setPageCount(2); // Example: Set manually or fetch total pages from backend
    };

    useEffect(() => {
        fetchReports(currentPage);
    }, [currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className="container">
            <div className="report-table">
                <table border="1" className="table">
                    <thead>
                        <tr>
                            <th>Grade</th>
                            <th>Net Each</th>
                            <th>BF</th>
                            <th>Sale No. 1 (P)</th>
                            <th>Sale No. 1 (D)</th>
                            <th>Sale No. 2 (P)</th>
                            <th>Sale No. 2 (D)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={index}>
                                <td>{report.grade}</td>
                                <td>{report.netEach}</td>
                                <td>{report.bf}</td>
                                <td>{report.sales[0]?.P || '-'}</td>
                                <td>{report.sales[0]?.D || '-'}</td>
                                <td>{report.sales[1]?.P || '-'}</td>
                                <td>{report.sales[1]?.D || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
};

export default ReportExcel;
