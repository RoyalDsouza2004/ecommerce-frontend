
import React, { useState } from 'react'
import { useNewCouponMutation } from '../../../redux/api/paymentAPI'

import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CustomError } from '../../../types/api-types'
import { UserReducerInitialState } from '../../../types/reducer-types'
import { responseToast } from '../../../utils/features'

const NewDiscount = () => {

      const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);


      const [btnLoading, setBtnLoading] = useState<boolean>(false)

      const navigate = useNavigate()



      const [code, setCode] = useState<string>("")
      const [amount, setAmount] = useState<number>(0)

      const [newCoupon] = useNewCouponMutation()


      const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setBtnLoading(true)

            const toastID = toast.loading("Creating Coupon...")

            try {
                  const res = await newCoupon({ userId: user?._id!, code, amount })

                  responseToast(res, navigate, "/admin/discount")

            } catch (err) {
                  const error = err as CustomError
                  toast.error(error.data.message, { id: toastID })
            } finally {
                  toast.dismiss(toastID)
                  setBtnLoading(false)
            }
      }


      return <main className="flex justify-center gap-4 relative p-8 max-xl:p-8 max-sm:flex-col max-sm:items-center h-aut ">

            <article className="h-full p-8 w-full max-w-[400px] bg-white rounded-md shadow-md pt-0">

                  <form onSubmit={submitHandler} className="flex flex-col items-center gap-6">
                        <h2 className="uppercase tracking-[2px] font-semibold mb-5 mt-5">Create Coupon</h2>

                        <div className="w-full relative">
                              <label className="absolute left-0 -top-6">Coupon code</label>
                              <input type="text" placeholder="Coupon code" value={code} onChange={e => setCode(e.target.value)} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
                        </div>
                        <div className="w-full relative">
                              <label className="absolute left-0 -top-6">Amount</label>
                              <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(Number(e.target.value))} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
                        </div>



                        <button type="submit" disabled={btnLoading} className="w-full bg-blue-600 p-4 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Create</button>
                  </form>
            </article>
      </main>
}


export default NewDiscount