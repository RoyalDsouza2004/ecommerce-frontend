import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { IoHome } from "react-icons/io5"
import { Link } from "react-router-dom"
import { User } from "../types/types"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import toast from "react-hot-toast"


interface PropsType {
      user: User | null;
}

const Header = ({ user }: PropsType) => {

      const [isOpen, setIsOpen] = useState<boolean>()

      const logoutHandler = async() => {
            try {
                  await signOut(auth);
                  toast.success("Sign out Successfully");
                  setIsOpen(false);
            } catch (error) {
                  toast.error("Sign out failed")
            }
      }

      return <nav className="flex justify-end items-center gap-10 p-4 h-[8vh] sticky top-0 z-10 bg-white" >
            <Link className="text-lightblack tracking-wide text-lg hover:text-darkblue" to={"/"} onClick={() => setIsOpen(false)}>
                  <IoHome />
            </Link>
            <Link className="text-lightblack tracking-wide text-lg hover:text-darkblue" to={"/search"} onClick={() => setIsOpen(false)}><FaSearch /></Link>
            <Link className="text-lightblack tracking-wide text-lg hover:text-darkblue" to={"/cart"} onClick={() => setIsOpen(false)}><FaShoppingBag /></Link>

            {
                  user?._id ? (
                        <>
                              <button className="text-lg cursor-pointer bg-transparent hover:text-darkblue" onClick={() => setIsOpen((prev) => !prev)}><img src={user.photo} referrerPolicy="no-referrer" className="rounded-full w-8 h-8 border border-green"/> </button>
                              <dialog className="border border-gray-300 rounded-md p-3 w-24 absolute left-[calc(100%-100px)] top-16" open={isOpen} >
                                    <div className="flex flex-col justify-start items-center gap-1">
                                          {
                                                user.role === 'admin' && (
                                                      <Link to={'/admin/dashboard'} onClick={() => setIsOpen(false)}>Admin</Link>
                                                )
                                          }

                                          <Link to={"/orders"} onClick={() => setIsOpen(false)}>Orders</Link>
                                          <button className="text-lg cursor-pointer bg-transparent hover:text-darkblue" onClick={logoutHandler}><FaSignOutAlt /></button>
                                    </div>
                              </dialog>
                        </>
                  ) : (
                        <Link to={"/login"} className="flex items-center" ><span>login</span><FaSignInAlt /></Link>
                  )
            }
      </nav>
}

export default Header