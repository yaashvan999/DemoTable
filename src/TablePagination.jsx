import { useState } from "react";

const TablePagination = (props) => {
    let { start, userLimit, nxtCount } = props;
    const [inputVal, setInputVal] = useState(null)
    const [pageType, setPageType] = useState(null)
    const ChangePage = (type) => {
        setPageType(pageType);
        props.parentcallback(type)
    }
    return (
        <div>
            <div>
                Page: <input type="text" id="pagenum" onChange={(e) => setInputVal(e.target.value)} /><button onClick={() => ChangePage(inputVal)}>Go</button>
            </div>
            <button disabled={start <= 0} onClick={() => ChangePage('previous')}>Prev</button><button disabled={userLimit - nxtCount === 0} onClick={() => ChangePage('next')}>Next</button>
        </div>
    )
}
export default TablePagination;