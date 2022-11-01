import InputWithCaption from "../components/InputWithCaption";
import {useDispatch} from "react-redux";
import SubmitButton from "../components/SubmitButton";
import ResetButton from "../components/ResetButton";
import {getSetUser} from "../utils/getSetUser";
import {auth} from "../utils/auth";
import React, {ChangeEvent, FormEvent, useState} from "react";
import Modal from "../components/Modal";
import SubmitRemoval from "../components/SubmitRemoval";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {UpdateUserData} from "../types/getSetUser";

const ProfileSettings:React.FC = () => {
    const [showRemoveDialog, setShowRemoveDialog] = useState<boolean>(false)
    const authData = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const [newData, setNewData] = useState<UpdateUserData>({
        name: authData.fetchUserData!.name || "",
        extra_details: authData.fetchUserData!.extra_details || "",
        skills: authData.fetchUserData!.skills || "",
        profession: authData.fetchUserData!.profession || "",
        details: authData.fetchUserData!.details || "",
    })
    const [avatar, setAvatar] = useState<null | FileList>(null)

    function setField(field:string | symbol, value:string):void{
        setNewData({...newData, [field]:value})
    }

    function clearForm():void{
        window.location.href = "/profile/" + authData.fetchUserData!._id
    }

    async function sendForm(e:FormEvent<HTMLFormElement>):Promise<void>{
        e.preventDefault()
        if(avatar){
            await getSetUser.updateAvatar(authData.fetchUserData!._id, avatar)
            dispatch({type: 'SET_USER_DATA', payload:(await auth.getDataByToken()).data})
        }
        await getSetUser.updateUserData(authData.fetchUserData!._id, newData)
        dispatch({type: 'SET_USER_DATA', payload:(await auth.getDataByToken()).data})
        window.location.href = "/profile/" + authData.fetchUserData!._id
    }

    function changeAvatarHandler(e:ChangeEvent<HTMLInputElement>):void{
        setAvatar(e.target.files)
    }

    async function deleteUser():Promise<void>{
        await getSetUser.deleteUser(authData.fetchUserData!._id)
        setShowRemoveDialog(false)
    }

    return (
        <>
            <Modal>
                <SubmitRemoval
                    isShow={showRemoveDialog}
                    removeHandler={deleteUser.bind(this)}
                    hideModal={()=>setShowRemoveDialog(false)}/>
            </Modal>
            <form
                onSubmit={e=>sendForm(e)}
                className="bg-neutral-100 rounded-3xl mx-auto border-gray-200 border-4 p-7 my-14 w-4/5 space-y-8 flex flex-col">
                <div>
                    <input type="file" onChange={e=>changeAvatarHandler(e)} accept="image/*" />
                </div>
                <InputWithCaption
                    caption="Name"
                    changeHandler={(e:ChangeEvent<HTMLInputElement>)=>setField('name', e.target.value)}
                    inputValue={newData.name}
                    type="text"
                />
                <InputWithCaption
                    caption="Extra details"
                    changeHandler={(e:ChangeEvent<HTMLInputElement>)=>setField('extra_details', e.target.value)}
                    inputValue={newData.extra_details}
                    type="text"
                />
                <InputWithCaption
                    caption="Skills"
                    changeHandler={(e:ChangeEvent<HTMLInputElement>)=>setField('skills', e.target.value)}
                    inputValue={newData.skills}
                    type="text"
                />
                <InputWithCaption
                    caption="Profession"
                    changeHandler={(e:ChangeEvent<HTMLInputElement>)=>setField('profession', e.target.value)}
                    inputValue={newData.profession}
                    type="text"
                />
                <InputWithCaption
                    caption="Details"
                    changeHandler={(e:ChangeEvent<HTMLInputElement>)=>setField('details', e.target.value)}
                    inputValue={newData.details}
                    type="text"
                />
                <div className="w-44 flex justify-between">
                    <SubmitButton />
                    <ResetButton clickHandler={clearForm}/>
                </div>
                <button
                    className="bg-red-500 w-full h-10 rounded font-sans font-normal text-md text-white cursor-pointer"
                    onClick={()=>setShowRemoveDialog(true)}
                    type="button"
                >
                    Delete user
                </button>
            </form>
        </>
    )
}

export default ProfileSettings