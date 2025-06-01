import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

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
        console.log(responseData);
        setLoadedPlaces(responseData);
      };
      fetchPlaces();
    } catch (err) {
      console.log(err.message);
    }
  }, [sendRequest, userId]);

  const placeDeleteHandler = (placeId) => {
    setLoadedPlaces((prev) => {
      const v = prev.places.filter((place) => place.id !== placeId);

      return { places: v };
    });
  };

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner overlay />
        </div>
      )}
      <ErrorModal onClear={clearError} error={error} />
      {!isLoading && loadedPlaces && (
        <PlaceList
          items={loadedPlaces}
          placeDeleteHandler={placeDeleteHandler}
        />
      )}
      ;
    </>
  );
}
