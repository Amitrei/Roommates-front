import { validateEmailField } from "./../inputs/validators/inviteMembersValidator";
import { useState } from "react";
import Form from "./../inputs/Form";
import { useDispatch } from "react-redux";
import { closeInviteMemberWindow, inviteMember } from "./../../store/reducers/roomReducer";
import "../../styles/inviteMember.scss";
const InviteMember = ({ dashboardPopup }) => {
  const dispatch = useDispatch();
  const [memberEmail, setMemberEmail] = useState("");
  const [error, setError] = useState({ inviteMembersForm: null });

  const handleInviteMember = (event) => {
    const { error } = validateEmailField(event.target.value);
    const updatedError = { ...error };
    if (error) {
      updatedError.inviteMembersForm = error.details[0].message;
      setError(updatedError);
    } else {
      updatedError.inviteMembersForm = null;
      setError(updatedError);
    }
    setMemberEmail(event.target.value);
  };

  const formFields = {
    inviteMembersForm: [
      {
        value: memberEmail,
        onChange: handleInviteMember,
        label: "user email address",
        error: error.inviteMembersForm,
      },
    ],
  };

  const handleCloseBtnClicked = () => {
    return dispatch(closeInviteMemberWindow());
  };
  return !dashboardPopup ? (
    <Form
      fieldsArray={formFields["inviteMembersForm"]}
      error={error.inviteMembersForm ? true : false}
      onSubmit={() => dispatch(inviteMember(memberEmail))}
    />
  ) : (
    <div className="invite-member-container">
      <span className="invite-member-close-btn" onClick={handleCloseBtnClicked}>
        X
      </span>
      <h1>Invite member</h1>
      <Form
        fieldsArray={formFields["inviteMembersForm"]}
        error={error.inviteMembersForm ? true : false}
        onSubmit={() => dispatch(inviteMember(memberEmail))}
      />
    </div>
  );
};

export default InviteMember;
