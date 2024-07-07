import "./UserAccount.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROFILE } from "../Queries/user";
import { UPDATE_PROFILE } from "../Mutations/user";
import { useState } from "react";

function UserAccount() {
  const [newName, setNewName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [newEmail, setNewEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const [newPhone, setNewPhone] = useState(
    localStorage.getItem("userPhoneNumber") || ""
  );
  const [newAddress, setNewAddress] = useState(
    localStorage.getItem("userAddress") || ""
  );
  //=================GET USER PROFILE===============
  const { data, loading, error } = useQuery(GET_PROFILE);
  const user = data?.users?.[0] || {};
  if (!user) return <p>No user data found.</p>;
  console.log(user);
  //==============UPDATE PROFILE==================

  const [
    updateUserProfile,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PROFILE);

  //update information when click on button
  const handleSave = async () => {
    //set varible for update's query
    const variables = {
      where: {
        id: localStorage.getItem("userId"),
      },
      data: {
        name: newName,
        userEmail: newEmail,
        userPhone: newPhone,
        userAddress: newAddress,
      },
    };
    try {
      const result = await updateUserProfile({ variables });
      //if update success, set new information in localStrorage
      if (result.data.updateUser) {
        localStorage.setItem("userName", result.data.updateUser.name);
        localStorage.setItem("userEmail", result.data.updateUser.userEmail);
        localStorage.setItem(
          "userPhoneNumber",
          result.data.updateUser.userPhone
        );
        localStorage.setItem("userAddress", result.data.updateUser.userAddress);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.networkError) {
        console.error("Network Error:", error.networkError.result.errors);
      }
      if (error.graphQLErrors) {
        console.error("GraphQL Errors:", error.graphQLErrors);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewEmail = (event) => {
    setNewEmail(event.target.value);
  };
  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };
  const handleNewAddress = (event) => {
    setNewAddress(event.target.value);
  };
  return (
    <div className="layer">
      <div className="user">
        <div className="user__ava">
          <FaRegUserCircle />
        </div>
        <span>{localStorage.getItem("userName")}</span>
        <Link to="/">
          <button>Trờ về trang chủ</button>
        </Link>
        <Link>
          <button>Đăng xuất</button>
        </Link>
      </div>
      <div className="info">
        <h3>Thông tin cá nhân</h3>
        <form className="info__form">
          <span>Tên người dùng</span>
          <input type="text" value={newName} onChange={handleNewName}></input>
          <span>Email</span>
          <input type="text" value={newEmail} onChange={handleNewEmail}></input>
          <span>Số điện thoại </span>
          <input type="text" value={newPhone} onChange={handleNewPhone}></input>
          <span>Địa chỉ</span>
          <input
            type="text"
            value={newAddress}
            onChange={handleNewAddress}
          ></input>
        </form>
        <button onClick={handleSave}>Cập nhật thông tin</button>
        {updateLoading && <p>Updating...</p>}
        {updateError && <p>Error: {updateError.message}</p>}
        {updateData && <p>Profile updated successfully!</p>}
      </div>
    </div>
  );
}
export default UserAccount;
