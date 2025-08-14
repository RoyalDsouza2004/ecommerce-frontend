import React, { useEffect, useState } from 'react'
import { SkeletonLoader } from '../../../components/Loader'
import { FaTrash } from 'react-icons/fa'
import { useDeleteCouponMutation, useGetCouponQuery, useUpdateCouponMutation } from '../../../redux/api/paymentAPI'

import { Navigate, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CustomError } from '../../../types/api-types'
import { responseToast } from '../../../utils/features'
import { useSelector } from 'react-redux'
import { UserReducerInitialState } from '../../../types/reducer-types'

const DiscountManagement = () => {

      const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);


      const { id } = useParams()

      const [btnLoading, setBtnLoading] = useState<boolean>(false)

      const navigate = useNavigate()
      const { data, isLoading, isError } = useGetCouponQuery({ id: id!, userId: user?._id! })

      const { code, amount } = data?.coupon || {
            code: "",
            amount: 0
      }

      const [codeUpdate, setCodeUpdate] = useState<string>(code)
      const [amountUpdate, setAmountUpdate] = useState<number>(amount)


      const [updateCoupon] = useUpdateCouponMutation()
      const [deleteCoupon] = useDeleteCouponMutation()

      useEffect(() => {
            if (data) {
                  setCodeUpdate(data.coupon.code)
                  setAmountUpdate(data.coupon.amount)
            }

      }, [data])



      const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setBtnLoading(true)

            const toastID = toast.loading("Updating Coupon...")

            try {
                  const res = await updateCoupon({ userId: user?._id!, id: id!, code: codeUpdate, amount: amountUpdate })

                  responseToast(res, navigate, "/admin/discount")

            } catch (err) {
                  const error = err as CustomError
                  toast.error(error.data.message, { id: toastID })
            } finally {
                  toast.dismiss(toastID)
                  setBtnLoading(false)
            }
      }

      const deleteHandler = async () => {
            setBtnLoading(true)
            const toastID = toast.loading("Deleting Coupon...")

            try {
                  const res = await deleteCoupon({ userId: user?._id!, id: id! })

                  responseToast(res, navigate, "/admin/discount")

            } catch (err) {
                  const error = err as CustomError
                  toast.error(error.data.message, { id: toastID })
            } finally {
                  toast.dismiss(toastID)
                  setBtnLoading(false)
            }
      }

      if (isError) return <Navigate to={"/404"} />

      return <main className="flex justify-center gap-4 relative p-8 max-xl:p-8 max-sm:flex-col max-sm:items-center h-aut ">
            {
                  isLoading ? <SkeletonLoader length={10} /> : <>
                        <article className="h-full p-8 w-full max-w-[400px] bg-white rounded-md shadow-md pt-0">
                              <button disabled={btnLoading} className="rounded-full bg-black flex w-12 h-12 justify-center items-center relative left-[340px]  -top-[20px] disabled:opacity-50 disabled:cursor-not-allowed" onClick={deleteHandler}><FaTrash className="text-white" /></button>
                              <form onSubmit={submitHandler} className="flex flex-col items-center gap-6">
                                    <h2 className="uppercase tracking-[2px] font-semibold mb-5">Manage Coupon</h2>


                                    <div className="w-full relative">
                                          <label className="absolute left-0 -top-6">Coupon code</label>
                                          <input type="text" placeholder="Coupon code" value={codeUpdate} onChange={e => setCodeUpdate(e.target.value)} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
                                    </div>
                                    <div className="w-full relative">
                                          <label className="absolute left-0 -top-6">Amount</label>
                                          <input type="text" placeholder="Amount" value={amountUpdate} onChange={e => setAmountUpdate(Number(e.target.value))} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
                                    </div>



                                    <button type="submit" disabled={btnLoading} className="w-full bg-blue-600 p-4 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Update</button>
                              </form>
                        </article>
                  </>
            }
      </main>
}

export default DiscountManagement