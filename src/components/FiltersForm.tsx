import React, { FC } from "react";
import { Select } from "grommet";
import { Filters } from "../utils";

interface FiltersFormProps {
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
	filters: Filters;
}

const FiltersForm: FC<FiltersFormProps> = ({ filters, setFilters }) => {
	return (
		<>
      <label htmlFor="country">Country</label>
			<Select
      margin={{bottom: '15px'}}
				name="country"
				value={filters.country}
				options={["United States of America", "Canada"]}
				onChange={({ option }) =>
					setFilters((oldFilters) => ({ ...oldFilters, country: option }))
				}
			/>
      <label htmlFor="limit">Result Limit</label>
			<Select
				name="limit"
				value={filters.limit.toString()}
				options={["10", "20", "30", "40", "50"]}
				onChange={({option}) => {
					setFilters((oldFilters) => ({
						...oldFilters,
						limit: parseInt(option),
					}))
				}}
			/>
		</>
	);
};

export default FiltersForm;
