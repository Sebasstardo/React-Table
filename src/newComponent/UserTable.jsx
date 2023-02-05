import React, { useEffect, useState } from "react";

const HeaderCell = ({ column, sorting, sorTable }) => {
  const isDescSorting = sorting.column === column && sorting.order === "desc";
  const isAscSorting = sorting.column === column && sorting.order === "asc";
  const futureSortingOrder = isDescSorting ? "asc" : "desc";

  return (
    <th
      key={column}
      onClick={() => sorTable({ column, order: futureSortingOrder })}
    >
      {column}
      {isDescSorting && <span> - </span>}
      {isAscSorting && <span> + </span>}
    </th>
  );
};

const Header = ({ columns, sorting, sorTable }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <HeaderCell
            column={column}
            sorting={sorting}
            key={column}
            sorTable={sorTable}
          />
        ))}
      </tr>
    </thead>
  );
};

const Content = ({ entries, columns }) => {
  return (
    <tbody>
      {entries.map((entry) => (
        <tr key={entry.id}>
          {columns.map((column) => (
            <td key={column}>{entry[column]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const SearchBar = ( {searchTable} ) => {
  const [searchValue, setSearchValue] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    searchTable(searchValue);
  };
  return (
    <div>
      <form  onSubmit={submitForm}>
        <input
          type="text"
          placeholder="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </div>
  );
};

export const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [sorting, setSorting] = useState({ columns: "id", order: "asc" });
  const [searchValue, setSearchValue] = useState("");
  const columns = ["id", "first_name", "last_name"];
  const sorTable = (newSorting) => {
    setSorting(newSorting);
  };
  const searchTable = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };

  console.log(users)
  
  useEffect(() => {
    const url = `http://localhost:3004/users?_sort=${sorting.column}&_order=${sorting.order}&first_name_like=${searchValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      });
  }, [sorting, searchValue]);

  return (
    <div>
      <SearchBar searchTable={searchTable} />
      <table>
        <Header columns={columns} sorting={sorting} sorTable={sorTable} />
        <Content entries={users} columns={columns} />
      </table>
    </div>
  );
};
