import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AllDiscountResponse, CouponRequest, CouponResponse, MessageResponse, NewCouponRequest } from "../../types/api-types";

export const paymentAPI = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/` }),
  tagTypes: ["payment"],
  endpoints: (builder) => ({
    allCoupons: builder.query<AllDiscountResponse, string>({
      query: (id) => `coupon/all?id=${id}`,
      providesTags: ["payment"]
    }),
    newCoupon: builder.mutation<MessageResponse, NewCouponRequest>({
      query: ({ userId, code, amount }) => ({
        url: `coupon/new?id=${userId}`,
        method: "POST",
        body: { userId, code, amount },
      }),
      invalidatesTags: ["payment"]
    }),

    getCoupon: builder.query<CouponResponse, CouponRequest>({
      query: ({ id, userId }) => `coupon/${id}?id=${userId}`,
      providesTags: ["payment"],
    }),

    updateCoupon: builder.mutation<MessageResponse, CouponRequest>({
      query: ({ userId, id, code, amount }) => ({
        url: `coupon/${id}?id=${userId}`,
        method: "PUT",
        body: { code, amount },
      }),
      invalidatesTags: ["payment"]
    }),
    deleteCoupon: builder.mutation<MessageResponse, CouponRequest>({
      query: ({ userId, id }) => ({
        url: `coupon/${id}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payment"]
    }),
  }),
});

export const { useAllCouponsQuery, useNewCouponMutation, useUpdateCouponMutation , useGetCouponQuery, useDeleteCouponMutation } = paymentAPI;