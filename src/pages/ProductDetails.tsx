import { CarouselButtonType, MyntraCarousel, Slider, useRating } from "6pp"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { CiEdit } from "react-icons/ci"
import { FaArrowLeft, FaArrowRight, FaRegStar, FaStar, FaTrash } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { SkeletonLoader } from "../components/Loader"
import RatingsComponent from "../components/Ratings"
import { useAllReviewsOfProductQuery, useDeleteReviewMutation, useNewReviewMutation, useProductDetailsQuery } from "../redux/api/productAPI"
import { addToCart } from "../redux/reducer/cartReducer"
import { RootState } from "../redux/store"
import { CartItem, Review } from "../types/types"
import { responseToast } from "../utils/features"

const ProductDetails = () => {

      const { id } = useParams()
      const dispatch = useDispatch()

      const { user } = useSelector((state: RootState) => state.userReducer)

      const { data, isLoading, isError } = useProductDetailsQuery(id!)
      const reviewsResponse = useAllReviewsOfProductQuery(id!)

      const [caroselOpen, setCaroselOpen] = useState<boolean>(false)

      const reviewDialogRef = useRef<HTMLDialogElement>(null)
      const [reviewComment, setReviewComment] = useState<string>("")
      const [reviewSubmitLoading, setReviewSubmitLoading] = useState<boolean>(false)

      const [createReview] = useNewReviewMutation()
      const [deleteReview] = useDeleteReviewMutation()


      const existingReview = reviewsResponse.data?.reviews.find(
            (rev: Review) => rev.user._id === user?._id
      )

      useEffect(() => {
            setReviewComment(existingReview?.comment || "")
      }, [existingReview])


      const [quantity, setQuantity] = useState<number>(1)
      const incrementHandler = () => {
            if (quantity >= data?.product.stock!) return toast.error(`there are only ${data?.product.stock} items in stock`);
            setQuantity(prev => prev + 1)
      }
      const decrementHandler = () => {
            if (quantity <= 1) return
            setQuantity(prev => prev - 1)
      }

      const addToCartHandler = (cartItem: CartItem) => {
            if (cartItem.stock < 1) return toast.error("Out of Stock");
            dispatch(addToCart(cartItem))
            toast.success("Added To Cart")
      }

      if (isError) return <Navigate to="/404" />

      const showDialog = () => {
            if (existingReview) {
                  setReviewComment(existingReview.comment)
                  setRating(existingReview.rating)
            } else {
                  setReviewComment("")
                  setRating(0)
            }
            reviewDialogRef.current?.showModal()
      }

      const reviewCloseHandler = () => {
            if (!existingReview) {
                  setRating(0)
                  setReviewComment("")
            }
            reviewDialogRef.current?.close()
      }

      const { Ratings: RatingsEditable, rating, setRating } = useRating({
            IconFilled: <FaStar />,
            IconOutline: <FaRegStar />,
            value: 0,
            selectable: true,
            styles: {
                  fontSize: "1.5rem",
                  color: "#f59e0b",
                  gap: "0.2rem",
                  justifyContent: "flex-start"
            }
      })

      const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setReviewSubmitLoading(true)
            reviewCloseHandler()
            try {
                  const res = await createReview({ comment: reviewComment, rating, productId: id!, userId: user?._id })
                  responseToast(res, null, "")
            } catch (error) {
                  toast.error("Failed to submit review")
            } finally {
                  setReviewSubmitLoading(false)
            }

      }

      const handleDeleteReview = async (reviewId: string) => {
            if (!user) return toast.error("You must be logged in to delete a review")
            try {
                  const res = await deleteReview({ reviewId, userId: user._id })
                  responseToast(res, null, "")
            } catch (error) {
                  toast.error("Failed to delete review")
            }
      }

      return (
            <section className="p-16 h-full w-full items-stretch gap-8 max-md:p-2 max-md:flex max-md:flex-col max-md:items-center max-md:justify-center max-md:h-auto">

                  {isLoading ? <ProductLoader /> :
                        <>
                              <main className="flex w-full items-center justify-center h-full gap-4 max-w-[1920px] m-auto max-xl:flex-col">
                                    <section className="w-[40%] h-[70vh] max-xl:w-full max-xl:h-[50vh] relative ">
                                          <Slider
                                                onClick={() => window.innerWidth < 1000 ? setCaroselOpen(false) : setCaroselOpen(true)}
                                                showThumbnails
                                                showNav={false}
                                                showDots
                                                images={data?.product?.photos.map(i => i.url) || []}
                                                objectFit="contain"

                                          />
                                          {
                                                caroselOpen && <MyntraCarousel images={data?.product?.photos.map(i => i.url) || []}
                                                      setIsOpen={setCaroselOpen}
                                                      NextButton={NextButton}
                                                      PrevButton={PrevButton}
                                                      objectFit="contain"


                                                />
                                          }
                                    </section>
                                    <section className="w-[60%] min-h-[80vh] p-4 mt-0 max-xl:w-full max-xl:min-h-[50vh] max-xl:p-8 flex flex-col justify-start items-start">
                                          <h1 className=" text-3xl font-bold tracking-wider uppercase mx-0 my-4"> {data?.product.name}</h1>
                                          <p className="my-4 "><span className=" font-mono bg-blue-700 text-white p-2 rounded-lg my-8">{data?.product.category}</span> </p>
                                          <span className={`${data?.product.stock! < 10 ? 'text-red-600 ' : 'text-green'} font-bold `}>{data?.product.stock! === 0 ? 'Out of Stock' : `There are only ${data?.product.stock} items in stock`}</span>
                                          <p className="mt-2 flex gap-2 items-center"> <RatingsComponent value={data?.product.ratings || 0} /> <span className="text-gray-500 text-sm">({data?.product.numOfReviews} Reviews)</span></p>
                                          <p className="text-black text-xl font-semibold  my-4">₹{data?.product.price}</p>
                                          <article className="flex gap-4 w-full my-4 flex-col items-start ">
                                                <div className="flex justify-start items-center gap-2 ">
                                                      <button className="h-8 w-8 rounded-md border-2 flex justify-center items-center cursor-pointer text-lg hover:bg-lightblack hover:text-white" onClick={decrementHandler}>-</button>
                                                      <span className="text-sm">{quantity}</span>
                                                      <button className="h-8 w-8 rounded-md border-2 flex justify-center items-center cursor-pointer text-lg hover:bg-lightblack hover:text-white" onClick={incrementHandler}>+</button>
                                                </div>
                                                <button className="bg-darkblue text-white p-2 rounded-lg w-32 " onClick={() => addToCartHandler({
                                                      productId: data?.product._id!,
                                                      name: data?.product.name!,
                                                      price: data?.product.price!,
                                                      stock: data?.product.stock!,
                                                      quantity,
                                                      photo: data?.product.photos[0].url || ""
                                                })}>Add to Cart</button>
                                          </article>


                                          <p className="text-gray-600 mt-2 font-light">{data?.product.description}</p>

                                    </section>
                              </main>


                        </>
                  }

                  <dialog ref={reviewDialogRef} className="w-[30rem]  p-6 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md">
                        <button onClick={reviewCloseHandler} className="absolute top-2 right-2 text-white hover:text-gray-700 bg-red-600 rounded-full w-4 h-4 text-center">
                              <IoCloseSharp />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Write a review</h2>
                        <form className="m-4 flex items-center justify-center gap-4 flex-col" onSubmit={submitReview}>
                              <textarea className=" w-full min-h-[30vh] p-4 border border-slate-800 rounded-xl text-lg" rows={4} placeholder="Write your review here..." value={reviewComment} onChange={(e) => setReviewComment(e.target.value)}></textarea>
                              <RatingsEditable />
                              <button disabled={reviewSubmitLoading} type="submit" className=" w-full mt-2 bg-black text-white p-3 rounded-md text-md">Submit</button>
                        </form>

                  </dialog>

                  <section className="max-w-[1000px] w-full m-auto p-4">
                        <article className="flex justify-between items-center mb-4">
                              <h2 className="text-2xl font-bold">Reviews</h2>
                              {
                                    reviewsResponse.isLoading ? null : (
                                          user && (
                                                <button onClick={showDialog} className=" w-12 h-12 flex items-center justify-center text-slate-600 hover:text-slate-800 text-2xl"><CiEdit /></button>
                                          )
                                    )
                              }
                        </article>
                        {
                              reviewsResponse.isLoading ? <>
                                    <SkeletonLoader width="w-[45rem]" length={3} />
                                    <SkeletonLoader width="w-[45rem]" length={3} />
                                    <SkeletonLoader width="w-[45rem]" length={3} />
                              </> : <div className="flex flex-row gap-4  flex-nowrap overflow-x-auto p-4 max-md:flex max-md:flex-col max-md:items-center max-md:gap-8 max-md:justify-center max-md:w-auto max-md:p-8">
                                    {
                                          reviewsResponse.data?.reviews.map(review => (
                                                <ReviewCard key={review._id} review={review} showDialog={showDialog} userId={user?._id} handleDeleteReview={handleDeleteReview} />
                                          ))
                                    }
                              </div>
                        }
                  </section>
            </section>
      )
}





const ProductLoader = () => {
      return <div className=" w-full h-full flex gap-8 max-xl:flex-col">
            <section className="w-full h-full">
                  <SkeletonLoader width="w-full" height="h-full" containerHeight="h-full" length={1} />
            </section>
            <section className="w-full flex flex-col gap-8 p-8">
                  <SkeletonLoader width="w-[60%]" length={2} />
                  <SkeletonLoader width="w-[50%]" length={3} />
                  <SkeletonLoader width="w-[40%]" length={4} />
                  <SkeletonLoader width="w-full" length={6} />
            </section>
      </div>
}

const NextButton: CarouselButtonType = ({ onClick }) => <button onClick={onClick} className="bg-gray-400 text-white rounded-full p-2"><FaArrowRight /></button>
const PrevButton: CarouselButtonType = ({ onClick }) => <button onClick={onClick} className="bg-gray-400 text-white rounded-full p-2"><FaArrowLeft /></button>

export default ProductDetails


const ReviewCard = ({ 
      review,
      showDialog,
      userId = "",
      handleDeleteReview 
   }: {
      review: Review,
      showDialog: () => void,
      userId?: string,
      handleDeleteReview: (reviewId: string) => void
   }) => (
      <div
            key={review._id}
            className="
      bg-slate-200 rounded-md p-6 
      flex flex-col gap-3 
      w-full max-w-xl mx-auto
      shadow-sm relative
    "
      >
            <div className="mb-2 ">
                  <RatingsComponent value={review.rating} />
                  {
                        review.user._id === userId && (
                              <button onClick={showDialog} className="absolute top-2 right-4 w-12 h-12 flex items-center justify-center text-2xl text-slate-600 hover:text-slate-800"><CiEdit /></button>
                        )
                  }
            </div>
            <p className="text-sm text-gray-800 break-words min-h-24">{review.comment}</p>
            <div className="flex items-center gap-4 mt-2 ">
                  <img
                        src={review.user.photo}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                  />
                  <p className="font-semibold">{review.user.name}</p>
            </div>
                  {
                        review.user._id === userId && (
                              <button onClick={() => handleDeleteReview(review._id)} className="absolute -top-3 -right-3 bg-black hover:bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center"><FaTrash /></button>
                        )
                  }
      </div>
);
