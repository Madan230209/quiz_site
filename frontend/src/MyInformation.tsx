import "./css/MyInformation.css"

function MyInformation({ id, name, email }: { id: string; name: string; email?: string }) {
  return (
    <div className="info-container">
      <h1 className="info-title">Informations</h1>
      <div className="info-details">
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Name:</strong> {name}</p>
        {email ? <p><strong>Email:</strong> {email}</p> : <p className="info-missing">Email not provided</p>}
      </div>
    </div>
  );
}

export default MyInformation;
