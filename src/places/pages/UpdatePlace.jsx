import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./PlaceForm.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Darjiling City",
    description: "Most Beautiful area city",
    imageUrl:
      "https://images.unsplash.com/photo-1622308644420-b20142dc993c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyamVlbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    address: "27WC+9V2 Darjeeling, West Bengal, India",
    location: {
      lat: 27.0458959,
      lng: 88.2672631,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "meghalaya",
    description: "Most Beautiful site",
    imageUrl:
      "https://www.shutterstock.com/image-photo/magnificent-view-nohkalikai-fallsmeghalayaindia-600nw-1127211419.jpg",
    address: "27WC+9V2 meghalaya, India",
    location: {
      lat: 25.3125179,
      lng: 91.7663951,
    },
    creator: "u2",
  },
  {
    id: "p3",
    title: "syhlet",
    description: "Most Beautiful area ",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/Jaflong_Sylhet.jpg",
    address: "27WC+9V2 syhlet, Bangladesh",
    location: {
      lat: 24.9261249,
      lng: 91.8825551,
    },
    creator: "u3",
  },
];
export default function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

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

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
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
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
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
  );
}
