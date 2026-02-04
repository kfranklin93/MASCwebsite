// ================================================================
// DATA TABLE COMPONENT
// Reusable table with sorting, filtering, and pagination
// ================================================================

import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

const TableContainer = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const TableHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
`;

const SearchBox = styled.div`
    position: relative;
    flex: 1;
    max-width: 400px;

    svg {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #6b7280;
        width: 20px;
        height: 20px;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px 12px 10px 40px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Thead = styled.thead`
    background: #f9fafb;
`;

const Th = styled.th`
    padding: 12px 20px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: ${props => props.$sortable ? 'pointer' : 'default'};
    user-select: none;
    white-space: nowrap;

    &:hover {
        background: ${props => props.$sortable ? '#f3f4f6' : 'transparent'};
    }
`;

const ThContent = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
    border-bottom: 1px solid #e5e7eb;
    transition: background 0.2s;

    &:hover {
        background: #f9fafb;
    }

    &:last-child {
        border-bottom: none;
    }
`;

const Td = styled.td`
    padding: 16px 20px;
    font-size: 14px;
    color: #374151;
`;

const Pagination = styled.div`
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e5e7eb;
    flex-wrap: wrap;
    gap: 12px;
`;

const PaginationInfo = styled.div`
    font-size: 14px;
    color: #6b7280;
`;

const PaginationButtons = styled.div`
    display: flex;
    gap: 8px;
`;

const PageButton = styled.button`
    padding: 6px 12px;
    border: 1px solid #d1d5db;
    background: ${props => props.$active ? '#4CAF50' : 'white'};
    color: ${props => props.$active ? 'white' : '#374151'};
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background: ${props => props.$active ? '#45a049' : '#f3f4f6'};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const EmptyState = styled.div`
    padding: 60px 20px;
    text-align: center;
    color: #6b7280;
`;

const DataTable = ({ 
    columns, 
    data, 
    searchable = true,
    pagination = true,
    itemsPerPage = 10,
    emptyMessage = 'No data available'
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);

    // Filter data based on search
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data;

        return data.filter(row => {
            return columns.some(column => {
                const value = column.accessor ? row[column.accessor] : '';
                return String(value).toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
    }, [data, searchTerm, columns]);

    // Sort data
    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return filteredData;

        const sorted = [...filteredData].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [filteredData, sortConfig]);

    // Paginate data
    const paginatedData = React.useMemo(() => {
        if (!pagination) return sortedData;

        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage, pagination]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const renderSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) return null;
        return sortConfig.direction === 'asc' ? 
            <ChevronUp size={16} /> : 
            <ChevronDown size={16} />;
    };

    return (
        <TableContainer>
            {searchable && (
                <TableHeader>
                    <SearchBox>
                        <Search />
                        <SearchInput
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </SearchBox>
                </TableHeader>
            )}

            <Table>
                <Thead>
                    <tr>
                        {columns.map(column => (
                            <Th
                                key={column.accessor || column.header}
                                $sortable={column.sortable}
                                onClick={() => column.sortable && handleSort(column.accessor)}
                            >
                                <ThContent>
                                    {column.header}
                                    {column.sortable && renderSortIcon(column.accessor)}
                                </ThContent>
                            </Th>
                        ))}
                    </tr>
                </Thead>
                <Tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <Td colSpan={columns.length}>
                                <EmptyState>{emptyMessage}</EmptyState>
                            </Td>
                        </tr>
                    ) : (
                        paginatedData.map((row, rowIndex) => (
                            <Tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <Td key={colIndex}>
                                        {column.render 
                                            ? column.render(row) 
                                            : row[column.accessor]}
                                    </Td>
                                ))}
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>

            {pagination && sortedData.length > 0 && (
                <Pagination>
                    <PaginationInfo>
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                        {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
                        {sortedData.length} results
                    </PaginationInfo>
                    <PaginationButtons>
                        <PageButton
                            onClick={() => setCurrentPage(p => p - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </PageButton>
                        {[...Array(totalPages)].map((_, i) => (
                            <PageButton
                                key={i + 1}
                                $active={currentPage === i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </PageButton>
                        ))}
                        <PageButton
                            onClick={() => setCurrentPage(p => p + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </PageButton>
                    </PaginationButtons>
                </Pagination>
            )}
        </TableContainer>
    );
};

export default DataTable;
