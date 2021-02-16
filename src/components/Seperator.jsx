const Seperator = ({ height = "200px" }) => {
  return (
    <div
      className="seperator"
      style={{ height, width: "2px", borderLeft: "2px dashed rgba(128, 128, 128, 0.3)" }}></div>
  );
};

export default Seperator;
