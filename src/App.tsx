import React, { FC, useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";
import LocationCard from "./components/LocationCard";
import { Location, Filters } from "./utils";
import { Box, Heading } from "grommet";
import FiltersForm from "./components/FiltersForm";

const GET_USER_DATA = gql`
	{
		client {
			ipAddress {
				city {
					name
				}
				country {
					name
				}
			}
		}
	}
`;

const GET_COUNTRY_CITIES = gql`
	query Cities($limit: Int!, $countryName: String!) {
		cities(limit: $limit, where: { countryName: { eq: $countryName } }) {
			geonamesID
			name
			population
			location {
				lat
				long
			}
		}
	}
`;

const App: FC = () => {
	const [
		getUserLocation,
		{ data: userLocationData, loading: userDataLoading },
	] = useLazyQuery(GET_USER_DATA);
	const [
		getCities,
		{ data: citiesData, loading: citiesDataLoading },
	] = useLazyQuery(GET_COUNTRY_CITIES);
	const [filters, setFilters] = useState<Filters>({
		limit: 50,
		country: "",
	});

	useEffect(() => {
		getUserLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (
      !userDataLoading &&
			userLocationData?.client?.ipAddress?.country?.name &&
			!filters.country
		) {
			setFilters((oldFilters) => ({
				...oldFilters,
				country: userLocationData.client.ipAddress.country.name,
			}));
		}
		getCities({
			variables: {
				limit: filters.limit,
				countryName: filters.country,
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters.country, filters.limit, userDataLoading]);

	if (userDataLoading) return <span>...loading</span>;
	if (!userLocationData) return null;

	const { client } = userLocationData;

	return (
		<Box>
			<Heading alignSelf="center">Welcome from {client.ipAddress.city.name} 👋🏾</Heading>
			<FiltersForm filters={filters} setFilters={setFilters} />
			{citiesDataLoading && <span>...loading</span>}
			{!citiesDataLoading && (
				<Box
					fill="vertical"
					direction="row"
					gap="10px"
					justify="between"
					wrap
					margin={{ top: "10px" }}
				>
					{citiesData &&
						citiesData.cities.map((city: Location) => (
							<LocationCard key={city.geonamesID} location={city} />
						))}
				</Box>
			)}
		</Box>
	);
};

export default App;
