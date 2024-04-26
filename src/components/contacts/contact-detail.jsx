import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaBirthdayCake } from "react-icons/fa";
import dayjs from "dayjs";
import Loading from "../loading";
import axios from "axios";
import axiosClient from "../../api-client/axios-client";
import contactService from "../../services/contact-service";

export default function ContactDetail() {
    const { contactid } = useParams()
    const [contactDetail, setContactDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        async function fetchContactById() {
            // let res = await fetch(`https://contact-restful-api.vercel.app/contact/${contactid}`)
            // let data = await res.json()
            // let res = await axios.get(`https://contact-restful-api.vercel.app/contact/${contactid}`)
            // setContactDetail(res?.data)

            // let data = await axiosClient.get(`/contact/${contactid}`)
            let data = await contactService.getContactById(contactid)
            setContactDetail(data)
            setIsLoading(false)
        }
        fetchContactById()
    }, [contactid])
    return (
        <>
            {isLoading ? <Loading /> : (
                <>
                    <h3>{contactDetail?.name}'s Contact Detail</h3>
                    <div className="row">
                        <div className="col-4">
                            <img className="avatar-xl" src={contactDetail?.avatar} alt="" />
                        </div>
                        <div className="col-8">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <span className="fw-bolder">Name: </span> {contactDetail?.name}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bolder">
                                        <FaBirthdayCake size={20} className="me-2" />
                                        Dob:&nbsp;
                                    </span>
                                    {dayjs(contactDetail?.dob).format('MMM DD YYYY')}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bolder">Email: </span> {contactDetail?.email}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bolder">Company: </span> {contactDetail?.company}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bolder">Department: </span> {contactDetail?.department}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bolder">Job title: </span> {contactDetail?.jobTitle}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bolder">Mobile Phone: </span> {contactDetail?.mobilePhone}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bolder">Phone Number: </span> {contactDetail?.phonenumber}
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bolder">Notes: </span> {contactDetail?.notes}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <Link to={'/list'} className="btn btn-link">
                            Back to contact list
                        </Link>
                    </div>
                </>
            )}

        </>
    )
}
