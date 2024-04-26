import { Modal } from "bootstrap";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../loading";
import axios from "axios";
import axiosClient from "../../api-client/axios-client";
import contactService from "../../services/contact-service";

const schema = yup
    .object({
        name: yup.string().required(),
        phonenumber: yup.string().required(),
        mobilePhone: yup.string().required(),
        department: yup.string().required(),
        jobTitle: yup.string().required(),
        email: yup.string().email().required(),
        company: yup.string().required(),
        notes: yup.string(),
        avatar: yup.string(),
        dob: yup.date().required().min('1900-01-01').typeError('dob is a required field')
    })

export default function ModifyContact({ modalRef, modifyContact, setIsModifyContact }) {
    const [isLoading, setIsLoading] = useState(false)
    const [avtarUrl, setAvatarUrl] = useState(null)
    const hideModifyContact = () => {
        let modalElement = Modal.getInstance(modalRef.current)
        modalElement.hide()
        reset()
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: async () => {
            // let res = await fetch(`https://contact-restful-api.vercel.app/contact/${modifyContact?.id}`)
            // let contact = await res.json()
            // let res = await axios.get(`https://contact-restful-api.vercel.app/contact/${modifyContact?.id}`)
            // let data = await axiosClient.get(`/contact/${modifyContact?.id}`)
            let data = await contactService.getContactById(modifyContact?.id)
            return {
                ...data,
                dob: dayjs(data?.dob).format('YYYY-MM-DD')
            }
        }
    })

    const handleModifyContact = async (values) => {
        values = {
            ...values,
            avatar: avtarUrl ? avtarUrl : modifyContact.avatar
        }

        try {
            setIsLoading(true)
            // let res = await fetch(`https://contact-restful-api.vercel.app/contact/${modifyContact?.id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": 'application/json'
            //     },
            //     body: JSON.stringify(values)
            // })

            // let result = await res.json()
            // let result = await axios.put(`https://contact-restful-api.vercel.app/contact/${modifyContact?.id}`, values)
            // let data = await axiosClient.put(`/contact/${modifyContact?.id}`, values)
            let data = await contactService.modifyContact(modifyContact?.id, values)
            if (Object.keys(data).length) {
                toast.success(`Contact modified success`)
                reset()
                hideModifyContact()
                setAvatarUrl('')
                setIsModifyContact(result?.id)
            }

        } catch (error) {
            toast.error('Something went wrong, please contact adminstrator')
        }
        setIsLoading(false)
    }

    return (
        <>
            <div
                className="modal fade"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
                ref={modalRef}
            >
                <div className="modal-dialog modal-xl">
                    <form onSubmit={handleSubmit(handleModifyContact)} className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" onClick={() => hideModifyContact()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className="col-4">
                                    <div className="form-group mb-2">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name?.message ? 'is-invalid' : ''}`}
                                            placeholder="Name..."
                                            {...register("name")}
                                        />
                                        <span className="invalid-feedback">{errors.name?.message}</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Department</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.department?.message ? 'is-invalid' : ''}`}
                                            placeholder="Department..."
                                            {...register("department")}
                                        />
                                        <span className="invalid-feedback">{errors.department?.message}</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Company</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.company?.message ? 'is-invalid' : ''}`}
                                            placeholder="Company..."
                                            {...register("company")}
                                        />
                                        <span className="invalid-feedback">{errors.company?.message}</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Job Title</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.jobTitle?.message ? 'is-invalid' : ''}`}
                                            placeholder="Job Title..."
                                            {...register("jobTitle")}
                                        />
                                        <span className="invalid-feedback">{errors.jobTitle?.message}</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.email?.message ? 'is-invalid' : ''}`}
                                            placeholder="email..."
                                            {...register("email")}
                                        />
                                        <span className="invalid-feedback">{errors.email?.message}</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group mb-2">
                                        <label className="form-label">Dob</label>
                                        <input
                                            type="date"
                                            className={`form-control ${errors.dob?.message ? 'is-invalid' : ''}`}
                                            placeholder="Dob..."
                                            {...register("dob")}
                                        />
                                        <span className="invalid-feedback">{errors.dob?.message}</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.phonenumber?.message ? 'is-invalid' : ''}`}
                                            placeholder="Phone Number..."
                                            {...register("phonenumber")}
                                        />
                                        <span className="invalid-feedback">{errors.phonenumber?.message}</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Mobile Phone</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.mobilePhone?.message ? 'is-invalid' : ''}`}
                                            placeholder="Mobile Phone..."
                                            {...register("mobilePhone")}
                                        />
                                        <span className="invalid-feedback">{errors.mobilePhone?.message}</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Notes</label>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            placeholder="Notes..."
                                            {...register('notes')}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group mb-2">
                                        <img src={avtarUrl || modifyContact?.avatar} className='w-50' alt="" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Avatar URL</label>
                                        <input
                                            type="url"
                                            className={`form-control`}
                                            placeholder="Avatar URL..."
                                            onInput={(e) => setAvatarUrl(e.target.value)}
                                            {...register('avatar')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => hideModifyContact()}>Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}