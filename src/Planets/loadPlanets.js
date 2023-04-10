export default function Loads({ planetsLoading, planets, usersApiCall, handlePageChange, currentPage, totalPage, selectedPlanet }) {
    return (
        <>
            {planetsLoading ?
                // when API is triggered
                (<h2>Loading Planets...</h2>) :

                // after getting response from API
                (planets && planets.map((planet, i) => {
                    return (
                        <div key={planet.name} style={{ margin: "5px", display: "flex", flexDirection: "column", width: "200px" }}>
                            <button
                                className={selectedPlanet == planet.name ? "selected-button" : ""}
                                key={i}
                                onClick={() => usersApiCall(planet.residents, planet.name)}
                            >
                                {planet.name}
                            </button>
                        </div>
                    )
                }))
            }

            {planets && planets.length > 0 && (
                <div>
                    <button onClick={() => handlePageChange("prev")} disabled={currentPage == 1}>Previous</button>
                    <button onClick={() => handlePageChange("next")} disabled={currentPage == totalPage}>Next</button>
                </div>
            )}


        </>
    );
}
