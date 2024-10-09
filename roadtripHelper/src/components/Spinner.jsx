const Spinner = () => {
    return (
      <div style={{backgroundColor:"white", height:"100%"}}>
        <img 
          src="/spinner.gif" 
          alt="Loading..." 
          style={{ 
            margin: "0 auto", 
            display: "block"
          }} 
        />
        </div>
      );
}

export default Spinner;

