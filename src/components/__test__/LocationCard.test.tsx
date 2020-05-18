import React from "react";
import { render } from "@testing-library/react";
import LocationCard from "../LocationCard";
import { location } from "./mocks";

test("LocationCard displays details of a location", () => {
	const { getByText } = render(<LocationCard location={location} />);

	// ideally use {container} matchInlineSnapshot if classnames weren't randomly autogened
	getByText("Chicago");
	getByText("Population: 35000");
	getByText("Lat: 35");
	getByText("Long: 26");
});
