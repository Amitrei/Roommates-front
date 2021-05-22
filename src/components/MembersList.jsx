import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMembers, removeMember, closeMemberListWindow } from "../store/reducers/roomReducer";
import "../styles/membersList.scss";
const MembersList = ({ editMode }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.entities.room.detailedMembers);

  const handleCloseBtnClicked = () => {
    dispatch(closeMemberListWindow());
  };

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  return (
    <div className={ editMode ? "members-list-container-edit-mode" : "members-list-container"}>
      {editMode && (
        <span className="remove-member-close-btn" onClick={handleCloseBtnClicked}>
          X
        </span>
      )}
      <h3>Members list</h3>
      {members?.map((member) => (
        <div key={member.email} className="members-list-row">
          {editMode && (
            <div
              className="delete-transaction-mark"
              onClick={() => {
                dispatch(removeMember(member.email));
              }}>
              X
            </div>
          )}
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
