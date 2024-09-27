function App(props) {
  const interests = ["Coding", "Reading", "Gaming"];
  return (
    <div style={style.card}>
      <h2 style={style.name}>PROKS</h2>
      <p style={style.description}>
        A god like coder who can master anything within 1st time and not belongs
        to here
      </p>
      <h3 style={style.interests}>INTEREST</h3>
      <ul style={style.interestsList}>
        {interests.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a>
        
      </a>
    </div>
  );
}

const style = {
  card: {
    border: "2px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    margin: "20px",
    maxWidth: "400px",
    boxShadow: "10px 10px 9px",
    backgroundColor: "#FFDAB9",
  },
  name: {
    fontSize: "24px",
    margin: "10px",
    color: "#FF4500",
  },
  description: {
    fontSize: "16px",
    marginLeft: "20px",
    marginBottom: "18px",
    color: "#FF7F50",
  },
  interests: {
    fontSize: "18px",
    marginBottom: "1px",
    color: "#FF4500",
  },
  interestsList: {
    listStyle: "none",
    marginLeft: "20px",
    padding: 0,
    margin: 0,
    color: "#FF7F50",
  },
  
};

export default App;
