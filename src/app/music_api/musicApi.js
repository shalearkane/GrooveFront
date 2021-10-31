import { createApi } from '@reduxjs/toolkit/query/react'
import axiosInstance from '../axiosInstance';

export const musicApi = createApi({
    reducerPath: "musicApi",
    baseQuery: axiosInstance,
    endpoints: (builder) => ({
        getTracks: builder.query({
            query: () => `tracks/`,
        }),
        getAlbums: builder.query({
            query: () => `albums/`
        })
    })
})

export const { useGetTracksQuery, useGetAlbumsQuery } = musicApi;