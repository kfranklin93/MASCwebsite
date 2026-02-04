// ================================================================
// DATA TABLE COMPONENT
// Reusable table with sorting, filtering, pagination
// ================================================================

import React, { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  th {
    background: #f7fafc;
    font-weight: 600;
    color: #2d3748;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    user-select: none;
    
    &:hover {
      background: #edf2f7;
    }
  }
  
  td {
    color: #4a5568;
    font-size: 14px;
  }
  
  tbody tr {
    transition: background 0.2s ease;
    
    &:hover {
      background: #f7fafc;
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
`;

const SortIcon = styled.span`
  margin-left: 8px;
  opacity: ${({ $active }) => ($active ? 1 : 0.3)};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const PaginationInfo = styled.div`
  color: #718096;
  font-size: 14px;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  background: ${({ $active }) => ($active ? '#3182ce' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#4a5568')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? '#2c5282' : '#f7fafc')};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  padding: 48px;
  text-align: center;
  color: #718096;
  
  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    opacity: 0.3;
  }
  
  p {
    margin: 0;
    font-size: 16px;
  }
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  margin-right: 8px;
  border: none;
  background: #3182ce;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background 0.2s ease;
  
  &:hover {
    background: #2c5282;
  }
  
  &:last-child {
    margin-right: 0;
  }
  
  ${({ $variant }) => {
    if ($variant === 'secondary') {
      return `
        background: #e2e8f0;
        color: #4a5568;
        &:hover { background: #cbd5e0; }
      `;
    }
    if ($variant === 'danger') {
      return `
        background: #e53e3e;
        &:hover { background: #c53030; }
      `;
    }
    return '';
  }}
`;

const DataTable = ({ 
  columns, 
  data, 
  loading = false,
  emptyMessage = 'No data available',
  pageSize = 10,
  onRowAction
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <TableContainer>
        <EmptyState>
          <p>Loading...</p>
        </EmptyState>
      </TableContainer>
    );
  }

  if (!data || data.length === 0) {
    return (
      <TableContainer>
        <EmptyState>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p>{emptyMessage}</p>
        </EmptyState>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  {column.label}
                  {column.sortable !== false && (
                    <SortIcon $active={sortConfig.key === column.key}>
                      {sortConfig.key === column.key && sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </SortIcon>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={row.id || index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {totalPages > 1 && (
        <Pagination>
          <PaginationInfo>
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length} entries
          </PaginationInfo>
          <PaginationButtons>
            <PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </PageButton>
            {[...Array(totalPages)].map((_, i) => (
              <PageButton
                key={i + 1}
                $active={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PageButton>
            ))}
            <PageButton
              onClick={() => handlePageChange(currentPage + 1)}
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

export { DataTable, ActionButton };
export default DataTable;
