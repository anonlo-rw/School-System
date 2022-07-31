import React, { useState, useEffect } from "react";
import $ from "jquery";

// components
import Logout from "./components/Logout";
import LimitTable from "./components/LimitTable";
import SearchTable from "./components/SearchTable";
import SortTable from "./components/SortTable";
import CreateRecord from "./components/CreateRecord";
import EditRecord from "./components/EditRecord";

// images
import LockIcon from "../images/lock.png";
import StudentIcon from "../images/student.png";
import RefreshIcon from "../images/refresh.png";
import ViewIcon from "../images/view.png";
import EditIcon from "../images/edit.png";
import DeleteIcon from "../images/delete.png";
import MaleIcon from "../images/male.png";
import FemaleIcon from "../images/female.png";
import IDIcon from "../images/id.png";
import NameIcon from "../images/name.png";
import EmailIcon from "../images/email.png";
import PhoneIcon from "../images/phone.png";
import GradeIcon from "../images/grade.png";
import AddressIcon from "../images/address.png";
import GenderIcon from "../images/gender.png";
import BirthDateIcon from "../images/birthdate.png";

function Home()
{
    const [rows, setRows] = useState();
    const [entries, setEntries] = useState();
    const [data, setData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const ServerIP = window.location.host.split(":")[0];

    // shortened element finder
    function _(element) {
        return document.getElementById(element);
    }

    // authorization check
    useEffect(() => {
        fetch(`http://${ServerIP}/php/session.php`).then((response) => {
            if (response.ok) {
                return response.text();
            }
        })
        .then((response) => {
            if (response === "Permission Denied") {
                window.location.href = "/#/unauthorized";
            }
        })
        .catch(() => {
            window.location.href = "/#/error";
        })
    }, []);

    // fetch all from database
    function fetchDB() {
        $("#loader").show();

        fetch(`http://${ServerIP}/php/getall.php`)
        .then((result) => {
            if (result.ok) {
                return result.json();
            }
        })
        .then((result) => {
            setData(result);
            setRows(result.length);
            setEntries(result.length);
            $("#loader").hide();
        })
        .catch(() => {
            window.location.href = "/#/error";
        })
    }
    useEffect(fetchDB, []);

    // fetch individual rows from database
    function fetchStudent(id) {
        fetch(`http://${ServerIP}/php/getall.php?id=${id}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((result) => {
            setStudentData(result);
        })
    }

    // deletes row upon action
    function deleteRow(id) {
        fetch(`http://${ServerIP}/php/delete.php?id=${id}`)
        .then(() => {
            fetchDB();
        })
    }

    // display modals upon action
    function enableAddModal() {
        $("#addModal").show();
    }

    function disableAddModal() {
        _("addModal").style.display = "none";
        _("createResult").innerHTML = null;
        _("newName").value = null;
        _("newPhone").value = null;
        _("newEmail").value = null;
        _("newBirthDate").value = null;
        _("newGrade").value = null;
        _("newAddress").value = null;

        if (_("createResult").style.color === "green") {
            _("createResult").style.color = "red";
            fetchDB();
        }
    }

    function enableModal(id, modal) {
        $(`#${modal}`).show();
        fetchStudent(id);
    }

    function disableViewModal() {
        $("#viewModal").hide();
        setStudentData([]);
    }

    function disableEditModal() {
        $("#editModal").hide();
        if (_("editResult").style.color === "green") {
            fetchDB();
        
        } setStudentData([]);
    }
    
    return (
        <div className="container">
            <h1>Student Information System</h1>
            <hr/>
                <button onClick={Logout} id="logout"><img src={LockIcon} id="lock" alt="logout"/><b>Logout</b></button>
                <div id="divider"/>

                <button onClick={() => enableAddModal()} id="add">
                    <img src={StudentIcon} id="student" alt="student"/>
                    <b>Add New Student</b>
                </button>
            <hr/>

            <table className="table-sortable table-bordered table-striped table-hover" id="table">
                <caption style={{captionSide: "top"}}>
                    <b style={{color: "black"}}>Show Entries: </b>
                    <select id="entries" defaultValue={"10"} onChange={() => LimitTable()}>
                        <option value="0">All: {entries == null ? "0" : entries}</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>

                    <input
                        id="search"
                        style={{width: "25%", height: "33px", float: "right"}}
                        placeholder="Search"
                        onKeyUp={() => {
                            if ($("#search").val().length !== 0) {
                                $("#entries").attr("disabled", true);
                            
                            } else {
                                $("#entries").attr("disabled", false);
                            }

                            setRows(SearchTable(_("search").value));
                            _("entries").value = "0";
                        }}>
                    </input>

                    <button onClick={() => fetchDB()} id="refresh">
                        <img src={RefreshIcon} alt="refresh"/>
                    </button>
                </caption>

                <thead>
                    <tr>
                        <th onClick={() => SortTable(_("id"))} id="id" data-sort-type="numeric">ID</th>
                        <th onClick={() => SortTable(_("name"))} id="name" data-sort-type="text">Name</th>
                        <th onClick={() => SortTable(_("email"))} id="email" data-sort-type="text">Email</th>
                        <th onClick={() => SortTable(_("gender"))} id="gender" data-sort-type="text">Gender</th>
                        <th onClick={() => SortTable(_("grade"))} id="grade" data-sort-type="text">Grade</th>
                        <th id="thview">View</th>
                        <th id="thedit">Edit</th>
                        <th id="thdelete">Delete</th>
                    </tr>
                </thead>

                <tbody>
                {data.map(d => (
                <tr id="columns">
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.gender}</td>
                    <td>{d.grade}%</td>

                    <td className="text-center">
                        <button onClick={() => enableModal(d.id, "viewModal")} className="btn btn-success"><img src={ViewIcon} alt="view"/></button>
                    </td>
                    <td className="text-center">
                        <button onClick={() => enableModal(d.id, "editModal")} className="btn btn-warning"><img src={EditIcon} alt="edit"/></button>
                    </td>
                    <td className="text-center">
                        <button onClick={() => deleteRow(d.id)} className="btn btn-danger"><img src={DeleteIcon} alt="delete"/></button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            <div id="loader" className="stripes"/>
            {rows === 0 ? <label id="nodata">No Data to Display</label> : null}

            <div id="addModal" className="modal">
                <div className="modal-content">
                    <span onClick={() => disableAddModal()} id="close">&times;</span>
                    <h4><b><center>Add Student</center></b></h4><hr/>

                    <div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <b>Full Name</b>
                                <input type="text" id="newName" className="form-control"/>
                            </div>

                            <div className="form-group col-md-6">
                                <b>Identification Number</b>
                                <input id="newId" className="form-control" 
                                    value={Math.floor(Math.random()*(9999999999 - 1000000000) + 1000000000)} 
                                disabled/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-6">
                                <b>Phone Number</b>
                                <input type="tel" id="newPhone" className="form-control"/>
                            </div>

                            <div className="form-group col-md-6">
                                <b>Email Address</b>
                                <input type="text" id="newEmail" className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-6">
                                <b>Birth Date</b>
                                <input type="date" id="newBirthDate" className="form-control"/>
                            </div>

                            <div className="form-group col-md-6">
                                <b>Grade</b>
                                <input type="number" id="newGrade" min="0" max="100" className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-6">
                                <b>Address</b>
                                <input type="text" id="newAddress" className="form-control"/>
                            </div>

                            <div className="form-group col-md-6">
                                <b>Gender</b>
                                <select id="newGender" className="form-control">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div id="createResult"/>

                        <center>
                            <button onClick={() => CreateRecord(
                                _("newId").value,
                                _("newName").value,
                                _("newPhone").value,
                                _("newEmail").value,
                                _("newBirthDate").value,
                                _("newGrade").value,
                                _("newAddress").value,
                                _("newGender").value
                            )} id="create">Create Record</button>
                        </center>
                    </div>
                </div>
            </div>

            <div id="viewModal" className="modal">
                <div className="modal-content">
                    <span onClick={() => disableViewModal()} id="close">&times;</span>
                    {studentData.map(sd => (
                        <div>
                            {sd.gender === "Male" ?
                                <img src={MaleIcon} id="profile" alt="male"/> :
                                <img src={FemaleIcon} id="profile" alt="female"/>}

                            <h5><b><img src={NameIcon} alt="name"/></b> {sd.name}</h5>
                            <h5><b><img src={EmailIcon} alt="email"/></b> {sd.email}</h5>
                            <h5><b><img src={PhoneIcon} alt="phone"/></b> {sd.phone}</h5>
                            <h5><b><img src={GenderIcon} alt="gender"/></b> {sd.gender}</h5>
                            <h5><b><img src={BirthDateIcon} alt="birthdate"/></b> {sd.birthdate}</h5>
                            <h5><b><img src={AddressIcon} alt="address"/></b> {sd.address}</h5>
                            <h5><b><img src={IDIcon} alt="id"/></b> {sd.id}</h5>
                            <h5><b><img src={GradeIcon} alt="grade"/></b> {sd.grade}%</h5>
                        </div>
                    ))}
                </div>
            </div>

            <div id="editModal" className="modal">
                <div className="modal-content">
                    <span onClick={() => disableEditModal()} id="close">&times;</span>
                    <h4><b><center>Edit Student Details</center></b></h4><hr/>

                    {studentData.map(sd => (
                        <div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <b>Full Name</b>
                                    <input type="text" id="editName" className="form-control" defaultValue={sd.name}/>
                                </div>

                                <div className="form-group col-md-6">
                                    <b>Identification Number</b>
                                    <input id="editId" className="form-control" value={sd.id} disabled/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <b>Phone Number</b>
                                    <input type="tel" id="editPhone" className="form-control" defaultValue={sd.phone}/>
                                </div>

                                <div className="form-group col-md-6">
                                    <b>Email Address</b>
                                    <input type="text" id="editEmail" className="form-control" defaultValue={sd.email}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <b>Birth Date</b>
                                    <input type="date" id="editBirthDate" className="form-control" defaultValue={sd.birthdate}/>
                                </div>

                                <div className="form-group col-md-6">
                                    <b>Grade</b>
                                    <input type="number" id="editGrade" min="0" max="100" className="form-control" defaultValue={sd.grade}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <b>Address</b>
                                    <input type="text" id="editAddress" className="form-control" defaultValue={sd.address}/>
                                </div>

                                <div className="form-group col-md-6">
                                    <b>Gender</b>
                                    <select id="editGender" className="form-control" defaultValue={sd.gender}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div id="editResult"/>

                            <center>
                                <button onClick={() => EditRecord(
                                    _("editId").value,
                                    _("editName").value,
                                    _("editPhone").value,
                                    _("editEmail").value,
                                    _("editBirthDate").value,
                                    _("editGrade").value,
                                    _("editAddress").value,
                                    _("editGender").value
                                )} id="edit">Submit Changes</button>
                            </center>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Home;