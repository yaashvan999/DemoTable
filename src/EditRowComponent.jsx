import { useState } from "react";

const EditRowComponent = (props) => {
    let { id, userId, title, body } = props.rowData;
    const initialRowFills = {
        userId,
        id,
        title,
        body
    }

    let [rowFill, setRowFill] = useState(initialRowFills)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRowFill({ ...rowFill, [name]: value })
    }

    const Cancel = () => {
        props.Cancel(false);

    }

    return (
        <div id="editForm">
            <form id="editFormContent" >
                <label htmlFor="id"> ID
                    <input type="text" placeholder="id" name="id" value={rowFill.id} onChange={handleInputChange} disabled />
                </label>
                <label htmlFor="userId"> USER ID
                    <input type="text" placeholder="userId" name="userId" value={rowFill.userId} onChange={handleInputChange} />
                </label>
                <label htmlFor="title"> TITLE
                    <input type="text" placeholder="title" name="title" value={rowFill.title} onChange={handleInputChange} />
                </label>
                <label htmlFor="body">BODY
                    <input type="text" placeholder="body" name="body" value={rowFill.body} onChange={handleInputChange} />
                </label>
                <input type="submit" value="submit" onClick={(e) => props.Submit(e, rowFill)} /><input type="submit" value="cancel" onClick={Cancel} />
            </form>
        </div>
    )
}
export default EditRowComponent;