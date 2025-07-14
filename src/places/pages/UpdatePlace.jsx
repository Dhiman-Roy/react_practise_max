import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PlaceForm.css";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
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
export default function UpdatePlace() {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const placeId = useParams().placeId;
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlaces(responseData.place);
        console.log(responseData);
        console.log("render");
        console.log(loadedPlaces);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };

    fetchData();
  }, []);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(placeId);
    try {
      console.log("data sent");
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}

    history.push("/" + auth.userId + "/places");
  };

  if (!loadedPlaces) {
    return (
      <div className="center">
        <Card>
          <h2>could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner overLay />
      </div>
    );
  }
  console.log(formState.inputs);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlaces && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description. (at least 5 character)"
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}
