import React, { useCallback } from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import TablePagination from './TablePagination'
const SearchTable = (props) => {
    const handleSearch = (e) => {
        props.handleSearchParent(e.target.value)
    }
    return (
        <div>
            Search: <input type="search" id="search" onChange={handleSearch} />
        </div>
    )
}
const Hoc = (WrappedComponent) => {
    return function Hoc() {
        let [userData, setUserData] = useState([])
        let [start, setStart] = useState(0)
        let [nxtCount, setNxtCount] = useState(1);
        let [editSubmitted, setEditSubmitted] = useState(false);
        let limit = 10;
        let userLimit = 100 / limit;

        const getData = useCallback(() => {
            let api = "https://jsonplaceholder.typicode.com/posts?_start=" + start + "&_limit=" + limit;
            fetch(api).then((res) => res.json())
                .then((data) => setUserData(data))
                .catch((err) => userData(err));
        }, [start]);

        useEffect(() => {
            getData()
        }, [getData]);

        const handleSearch = (data) => {
            let filtereddata;
            if (isNaN(data)) {
                filtereddata = userData.filter((i) => i.body.includes(data))
            } else {
                filtereddata = userData.filter((i) => i.userId === parseInt(data, 10));
            }
            setUserData(filtereddata);
            if (data === '') {
                getData()
            }
        }

        const getPageType = (type) => {
            if (type === 'previous' && start >= 0) {
                setStart((start) => start - 10);
                setNxtCount((nxtCount) => nxtCount - 1);
            } else if (type === 'next' && start <= 90) {
                setStart((start) => start + 10);
                setNxtCount((nxtCount) => nxtCount + 1);
            } else {
                setStart(limit * (type - 1));
                setNxtCount((nxtCount) => nxtCount + (parseInt(type) - 1));
            }
        }

        const DeleteRow = (id) => {
            let editedArr;
            editedArr = userData.filter(obj => obj.id !== id);
            setUserData(editedArr)
        }

        const Submit = (e, data) => {
            let editedArr;
            e.preventDefault();
            setEditSubmitted(true)
            editedArr = userData.map(obj => [data].find(o => o.id === obj.id) || obj);
            setUserData(editedArr)
        }

        return (
            <div>
                <SearchTable handleSearchParent={handleSearch} />
                <WrappedComponent userData={userData} DeleteRow={DeleteRow} Submit={Submit} editSubmitted={editSubmitted} />
                <TablePagination parentcallback={getPageType} start={start} userLimit={userLimit} nxtCount={nxtCount} />
            </div>
        );
    }
}
export default Hoc;
