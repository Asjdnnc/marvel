export default function Trailer({link}){
    return(
        <div className="main">
            <h1 style={{marginLeft:"3%",fontSize:"35px",textDecoration:"underline"}}>Trailer</h1>
            <div className="trailer">
            <iframe width="1200" height="700"
                src={link}>
            </iframe>
            </div>
        </div>
    )
}