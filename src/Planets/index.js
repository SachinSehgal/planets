import axios from "axios";
import { useState, useEffect } from "react";
import Users from '../Users'
import LoadPlanets from "./loadPlanets.js";

export default function Planets() {

    const [planets, setPlanets] = useState([])
    const [planetsLoading, setPlanetsLoading] = useState(false)
    const [selectedPlanet, setSelectedPlanet] = useState("")
    const [usersData, setUsersData] = useState([])
    const [usersFetchTriggered, setUsersFetchTriggered] = useState(false)
    const [usersLoading, setUsersLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    useEffect(() => {
        setPlanetsLoading(true)
        axios.get(`https://swapi.dev/api/planets/?page=${currentPage}`)
            .then((res) => {
                setPlanetsLoading(false)
                setPlanets(res.data.results);
                setTotalPage(Math.ceil(res.data.count / 10));
            })
    }, [currentPage]);

    function handlePageChange(data) {
        setUsersLoading(false);
        setUsersFetchTriggered(false);

        if (data == "next") {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(currentPage - 1)
        }
    }

    function usersApiCall(usersApiUrls, name) {
        setUsersLoading(true);
        setUsersFetchTriggered(true);
        setSelectedPlanet(name)

        if (usersApiUrls && usersApiUrls.length > 0) {
            const promises = usersApiUrls.map(url => axios.get(url));
            Promise.all(promises).then(responses => {
                let data = [];
                responses.forEach(response => {
                    data = data.concat(response.data);
                });
                setUsersData(data)
                setUsersLoading(false)
            });
        } else {
            setUsersData([])
            setUsersLoading(false)
        }
    }


    return (
        <div style={{ padding: "10px", position: "relative" }}>
            {/* Users */}
            <Users
                users={usersData}
                usersLoading={usersLoading}
                usersFetchTriggered={usersFetchTriggered}
                selectedPlanet={selectedPlanet}
            />

            {/* Planets */}
            <h3>Click the buttons to see the users..</h3>
            <LoadPlanets
                planets={planets}
                planetsLoading={planetsLoading}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalPage={totalPage}
                usersApiCall={usersApiCall}
                selectedPlanet={selectedPlanet}
            />
        </div>
    );
}
