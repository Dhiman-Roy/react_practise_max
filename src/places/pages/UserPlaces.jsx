import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Darjiling City",
//     description: "Most Beautiful area city",
//     imageUrl:
//       "https://images.unsplash.com/photo-1622308644420-b20142dc993c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyamVlbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
//     address: "27WC+9V2 Darjeeling, West Bengal, India",
//     location: {
//       lat: 27.0458959,
//       lng: 88.2672631,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "meghalaya",
//     description: "Most Beautiful site",
//     imageUrl:
//       "https://www.shutterstock.com/image-photo/magnificent-view-nohkalikai-fallsmeghalayaindia-600nw-1127211419.jpg",
//     address: "27WC+9V2 meghalaya, India",
//     location: {
//       lat: 25.3125179,
//       lng: 91.7663951,
//     },
//     creator: "u2",
//   },
//   {
//     id: "p3",
//     title: "syhlet",
//     description: "Most Beautiful area ",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/4/4d/Jaflong_Sylhet.jpg",
//     address: "27WC+9V2 syhlet, Bangladesh",
//     location: {
//       lat: 24.9261249,
//       lng: 91.8825551,
//     },
//     creator: "u3",
//   },
// ];
export default function UserPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const userId = useParams().userId;
  useEffect(() => {
    try {
      const fetchPlaces = async () => {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData);
      };
      fetchPlaces();
    } catch (err) {
      console.log(err.message);
    }
  }, [sendRequest, userId]);

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner overlay />
        </div>
      )}
      <ErrorModal onClear={clearError} error={error} />
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />};
    </>
  );
}
