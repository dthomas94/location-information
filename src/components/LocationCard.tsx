import React, { FC } from "react";
import { Location } from "../utils";
import { Box, Text, Button } from "grommet";

interface LocationCardProps {
	location: Location;
}

const LocationCard: FC<LocationCardProps> = ({ location }) => {
	const { name, population, location: coords } = location;
	return (
		<Box
			width="400px"
			pad={{ vertical: "10px", horizontal: "5px" }}
			style={{ justifyContent: "center" }}
			border={{ size: "1px", color: "darkgray" }}
			elevation="medium"
			margin={{ bottom: "10px" }}
		>
			<Text textAlign="center" weight="bold" size="24px" margin={{bottom: '20px'}}>
				{name}
			</Text>

			<Box gap="10px">
				<Text>{`Population: ${population}`}</Text>
				<Text>{`Lat: ${coords.lat}`}</Text>
				<Text> {`Long: ${coords.long}`}</Text>
			</Box>
			<Button
        alignSelf="end"
        title="View location in Google Maps"
        color="green"
				style={{ width: 150, fontSize: 13, padding: "5px 2px" }}
				onClick={() =>
					window.open(
						`https://www.google.com/maps/place/${coords.lat}+${coords.long}`
					)
				}
				label="Open in Google Maps"
			/>
		</Box>
	);
};

export default LocationCard;
