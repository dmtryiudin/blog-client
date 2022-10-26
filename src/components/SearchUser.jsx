import {getSetUser} from "../utils/getSetUser";
import {useEffect, useState} from "react";
import InputWithCaption from "./InputWithCaption";

const SearchUser = () => {
    const [allUsers, setAllUsers] = useState(null)
    const [searchString, setSearchString] = useState('')

    useEffect(()=>{
        getSetUser.getAllUsers()
            .then((e)=>{
                setAllUsers(e)
            })
    }, [])

    const filteredUsers = (
        allUsers?.data
            .filter(e=>e?.name?.trim().toLowerCase().indexOf(searchString.trim().toLowerCase())>=0)
            .map(e=><div><a href={`/profile/${e._id}`}>{e?.name}</a></div>)
    )

    return (
        <div className="bg-neutral-100 rounded-3xl border-gray-200 border-4 p-2">
            <InputWithCaption
                caption="Search user"
                changeHandler={(e)=>setSearchString(e.target.value)}
                inputValue={searchString}
                type="text"
            />

            {searchString.trim() &&
            <div className="absolute bg-white w-1/2 rounded-b-3xl h-80 overflow-y-scroll border-gray-200 border-b-4 p-2 ml-2">
                {
                    filteredUsers.length ? filteredUsers : 'No users found'
                }
            </div>}
        </div>
    )
}

export default SearchUser