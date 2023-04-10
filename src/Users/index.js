export default function Users({ usersLoading, usersFetchTriggered, users, selectedPlanet }) {

  return (
    <>
      {usersLoading ?
        // when API is triggered
        (
          <div style={{ padding: "10px", position: "absolute", width: "800px", top: "0", right: "0", height: "400px", border: "2px solid red" }}>
            <h2>Loading Users...</h2>
          </div>
        ) :

        // after getting response from API
        (
          usersFetchTriggered && users && (
            <div style={{ padding: "10px", position: "absolute", width: "800px", top: "0", right: "0", height: "400px", border: "2px solid red" }}>
              {users.length > 0 ?
                <>
                  <h3>Below users blongs to {selectedPlanet} planet.</h3>
                  <ul>
                    {users.map(user => (<div>
                      <li key={user.name}>{user.name}</li>
                    </div>))
                    }
                  </ul>
                </>
                :
                <h2>No Data Found!!!</h2>
              }
            </div>
          ))
      }    </>
  );
}
