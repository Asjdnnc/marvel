export default function Music({link}){
    return(
        <div style={{width:"700px"}}>
        <h1 style={{marginLeft:"19%",fontSize:"35px",textDecoration:"underline"}}>Music</h1>
        <div className="music">
            <iframe style={{borderRadius:"12px"}} 
            src={link}
             width="80%" height="450" 
             allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            ></iframe>
            </div>
        </div>
    );
}