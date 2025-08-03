
function MyInformation({id, name, email}:{id: String, name: string, email?: string}) {
    return (
        <div className="my-info">
        <h1 style={{background: "black", color:"white"}}>My Information</h1>
        <p>Id: {id}</p>
        <p>Name: {name} </p>
        {email ? <p>email: {email}</p> : <p>Email not provided</p>}

        </div>
       
    );
}
export default MyInformation;