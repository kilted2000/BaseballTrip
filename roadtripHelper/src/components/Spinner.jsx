const Spinner = () => {
    return (
        <img 
          src="/spinner.gif" 
          alt="Loading..." 
          style={{ 
            margin: "0 auto", 
            display: "block" 
          }} 
        />
      );
}

export default Spinner;

//import spinner to gamefinder
//moniter state of loading in gamefinder-isLoading, setIsLoading
//if true then display spinner
//else show results
//button clicked && isLoading == true ? <Spinner /> : <Results />