import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMembers } from "../store/reducers/roomReducer";
import "../styles/membersList.scss";
const MembersList = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.entities.room.detailedMembers);

  useEffect(() => {
    dispatch(getMembers());
    console.log(members);
  }, []);

  return (
    <div className="members-list-container">
      <h3>Members list</h3>
      {members?.map((member) => (
        <div key={member.email} className="members-list-row">
          <span>
            <img src={member.profilePicture} />
          </span>
          <span>{member.email}</span>
        </div>
      ))}
    </div>
  );
};

export default MembersList;
