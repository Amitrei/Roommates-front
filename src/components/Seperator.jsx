const Seperator = ({ height = "200px", horizontal }) => {
  const styles = { height, width: "2px", borderLeft: "2px dashed rgba(128, 128, 128, 0.3)" };
  const rotate = horizontal ? { transform: "rotate(90deg)" } : {};
  return <div className="seperator" style={{ ...styles, ...rotate }}></div>;
};

export default Seperator;
