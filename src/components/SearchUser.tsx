import InputWithCaption from "./InputWithCaption";
import {useEffect, useState} from "react";
import {User} from "../types/fetchSchemas";
import {getSetUser} from "../utils/getSetUser";

const SearchUser:React.FC = () => {
    const [searchStr, setSearchStr] = useState<string>('')
    const [users, setUsers] = useState<User[] | null>(null)

    const updateUsersDebounce = debounce(()=>updateUsers())

    useEffect(updateUsersDebounce, [searchStr])

    function updateUsers(){
        if(searchStr){
            getSetUser.getAllUsers(searchStr)
                .then(res=>setUsers(res))
        }
        else {
            setUsers(null)
        }
    }

    function debounce(func:any, timeout = 300){
        let timer:any;
        return (...args:any) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func(args); }, timeout);
        };
    }

    const usersList = (
        <div className="absolute bg-white w-fit rounded-b-3xl h-80 overflow-y-scroll border-gray-200 border-b-4 p-2 ml-2 border-neutral-200 border-2">
            {users?.length && users.map(e =>
            {
                return (
                    <div key={e._id} title={e?.name}>
                        <a href={`/profile/${e._id}`}>{e?.name.length >= 20 ? e?.name.slice(0, 20) + '...' : e?.name}</a>
                    </div>
                )
            })
            }
        </div>)

    return (
        <div className="bg-neutral-100 rounded-3xl border-gray-200 border-4 p-2">
            <InputWithCaption
                caption="Search user"
                changeHandler={(e)=>setSearchStr(e.target.value)}
                inputValue={searchStr}
                type="text"
            />
            {searchStr && !!users?.length && usersList}
        </div>
    )
}

export default SearchUser
