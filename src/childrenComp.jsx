import React, { useEffect, useState } from "react";
import EditRowComponent from "./EditRowComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons'

const ChildenCom = (props) => {
    let { userData, editSubmitted } = props;
    let [showEditForm, setShowEditForm] = useState(false);
    let [rowData, setRowData] = useState([])
    useEffect(() => {
        if (editSubmitted) {
            setShowEditForm(false)
        }
    }, [editSubmitted])

    const EditRow = (i) => {
        setShowEditForm(true)
        setRowData(i);
    }

    const Cancel = (toClose) => {
        setShowEditForm(toClose)
    }

    const tableBody = () => {
        return userData.map((items) => {
            return <tr key={items.id}>
                <td>{items.userId}</td>
                <td>{items.title}</td>
                <td><button id="edit" onClick={(e) => EditRow(items)}><FontAwesomeIcon icon={faEdit} /></button></td>
                <td><button id="delete" onClick={(e) => props.DeleteRow(items.id)}><FontAwesomeIcon icon={faDeleteLeft} /></button></td>
            </tr>
        })
    }

    if (userData === undefined) return;
    return (
        <div>
            <table>
                <thead>
                    <tr><th>USER ID</th>
                        <th>TITLE</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody()}
                </tbody>
            </table>
            {showEditForm && <EditRowComponent rowData={rowData} Submit={props.Submit} Cancel={Cancel} />}
        </div>
    )
}
export default ChildenCom;
