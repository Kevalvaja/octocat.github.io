import React, { useEffect, useState } from 'react'
import api from './utils/api'

const UserDetails = ({ userData, setUserData, formik }) => {
    const [repoData, setRepoData] = useState([])
    console.log("userData", userData)
    useEffect(() => {
        if (userData) {
            const fetchRepoData = async () => {
                try {
                    const res = await api.get(`/users/${userData?.login}/subscriptions`)
                    console.log(res?.data)
                    if (res?.status === 200) {
                        setRepoData(res?.data)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchRepoData()
        }
    }, [userData])
    return (
        <>
            <div className='text-end mx-2 my-2'>
                <button className="btn btn-primary mx-2" onClick={() => { setUserData([]); formik?.handleReset() }}>Back</button>
            </div>
            <div className='card w-auto mx-2 bg-base-100 shadow-sm'>
                <div className='flex'>
                    <div className="avatar px-2 py-2">
                        <div className="w-24 rounded-full">
                            <img src={`${userData?.avatar_url}`} />
                        </div>
                    </div>
                    <div className='block mt-2'>
                        <div className='font-bold'>Name: {userData?.name}</div>
                        <div className='font-bold'>Company Name: {userData?.company}</div>
                        <div className='font-bold'>Location: {userData?.location}</div>
                        <div className='font-bold'>View Profile: {userData?.user_view_type}</div>
                    </div>
                </div>

            </div>

            {repoData?.map((item, index) => (
                <div className="card shadow-sm w-auto mx-2 my-2" key={index}>
                    <div className="px-2 py-2 flex-col lg:flex-row">
                        <div>
                            <h1 className="text-2xl font-bold">{item?.name}</h1>
                            <p className="">
                                {item?.description ? <>{item?.description}<br /></> : ""}
                                <b>Language: </b>{item?.language}<br />
                                <b>forks: </b>{item?.forks}<br />
                                <b>visibility: </b>{item?.visibility}<br />
                            </p>
                            <a href={`${item?.html_url}`} target='_blank'>
                                <button className="btn btn-primary">Visit Repository</button>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default UserDetails
