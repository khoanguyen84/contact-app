import { useEffect, useState } from "react"
import dayjs from "dayjs"
import Loading from "../loading"

export default function ContactList() {
    const [contactList, setContactList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        async function fetchContactList() {
            setIsLoading(true)
            let res = await fetch('https://662274e727fcd16fa6c9e60b.mockapi.io/contact')
            let data = await res.json()
            data = data.sort((contact_1, contact_2) => Number(contact_2.id) - Number(contact_1.id))
            setContactList(data)
            setIsLoading(false)
        }
        fetchContactList()
    }, [])
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
                                    <td></td>
                                </tr>
                            ))
                        )

                    }
                </tbody>
            </table>
        </>
    )
}