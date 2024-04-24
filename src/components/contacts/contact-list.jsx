import { useEffect, useRef, useState } from "react"
import dayjs from "dayjs"
import Loading from "../loading"
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUserTimes, FaUserEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Modal } from "bootstrap";
import ModifyContact from "./modify-contact";


export default function ContactList() {
    const [contactList, setContactList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [removeContact, setRemoveContact] = useState(null)
    const [modifyContact, setMoifyContact] = useState(null)
    const [isModifyContact, setIsModifyContact] = useState(null)
    const modalRef = useRef()
    useEffect(() => {
        async function fetchContactList() {
            setIsLoading(true)
            let res = await fetch('https://contact-restful-api.vercel.app/contact?_sort=id&_order=desc')
            let data = await res.json()
            setContactList(data)
            setIsLoading(false)
        }
        fetchContactList()
    }, [removeContact, isModifyContact])

    const handleRemoveContact = (contact) => {
        Swal.fire({
            title: `Are you sure to remove contact ${contact?.name}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let res = await fetch(`https://contact-restful-api.vercel.app/contact/${contact?.id}`, {
                        method: "DELETE"
                    })
                    let data = await res.json()
                    toast.success('Contact removed success')
                    setRemoveContact(contact?.id)
                } catch (error) {
                    toast.error('Can not remove contact, please try again!')
                }

            }
        });
    }

    const openModifyContact = (contact) => {
        const modalElement = new Modal(modalRef.current)
        modalElement.show()
        setMoifyContact(contact)
    }
    return (
        <>
            <table className="table table-striped">
                <thead className="table-success">
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Company</th>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>Phonenumber</th>
                        <th>Mobile phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? <Loading /> : (
                            contactList?.map((contact) => (
                                <tr key={contact.id}>
                                    <td>
                                        <img className="rounded w-50" src={contact.avatar} alt="" />
                                    </td>
                                    <td>{contact.name}</td>
                                    <td>{dayjs(contact.dob).format('MMM-DD-YYYY')}</td>
                                    <td>{contact.company}</td>
                                    <td>{contact.department}</td>
                                    <td>{contact.jobTitle}</td>
                                    <td className="text-end">{contact.phonenumber}</td>
                                    <td className="text-end">{contact.mobilePhone}</td>
                                    <td>
                                        <Link to={`/detail/${contact.id}`}>
                                            <BiSolidUserDetail role="button" size={25} className="text-warning me-2" />
                                        </Link>
                                        <FaUserTimes role="button" size={25} className="text-danger me-2"
                                            onClick={() => handleRemoveContact(contact)}
                                        />
                                        <FaUserEdit role="button" size={25} className="text-primary"
                                            onClick={() => openModifyContact(contact)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
            <ModifyContact modalRef={modalRef} modifyContact={modifyContact} setIsModifyContact={setIsModifyContact}/>
        </>
    )
}