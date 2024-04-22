import { FaRegBell } from "react-icons/fa6";
import noAvatar from '../assets/images/noAvatar.png'
export default function Header(){
    return (
        <nav className="d-flex align-items-center justify-content-between bg-success text-white py-2">
            <h5 className="flex-grow-1 text-center">Contact</h5>
            <div className="d-flex align-items-center justify-content-center" style={{width: '200px'}}>
                <FaRegBell size={20} className="me-2"/>
                <h6 className="me-2">Khoa Nguyễn</h6>
                <img src={noAvatar} className="avatar-sm" alt="" />
            </div>
        </nav>
    )
}