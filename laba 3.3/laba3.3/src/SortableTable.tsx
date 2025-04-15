import { useState } from 'react';

type SortDirection = 'asc' | 'desc' | null;

interface SortableTableProps {
  data: Record<string, any>[];
}

const SortableTable = ({ data }: SortableTableProps) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else if (sortDirection === 'desc') {
      setSortKey(null);
      setSortDirection(null);
    }
  };

  const getSortedData = () => {
    if (!sortKey || !sortDirection) return data;

    const sorted = [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const sortedData = getSortedData();
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover text-center align-middle">
        <thead className="table-light">
          <tr>
            {headers.map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                style={{ cursor: 'pointer' }}
              >
                {key}
                {sortKey === key && (
                  sortDirection === 'asc' ? ' 🔼' :
                  sortDirection === 'desc' ? ' 🔽' :
                  ''
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, idx) => (
            <tr key={idx}>
              {headers.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
