import "./Contri.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ContributionGraph = ({ username }) => {
	const [contributionData, setContributionData] = useState(null);

	useEffect(() => {
		const fetchContributionData = async () => {
			try {
				const response = await axios.get(
					`https://api.github.com/users/${username}`,
				);
				// const data  = await response.json();
				console.log(response.data);
				setContributionData(response.data);
			} catch (error) {
				if (error.response && error.response.status === 404) {
					console.error("User not found:", username);
					// Handle user not found scenario, e.g., display a message to the user
				} else {
					console.error("Error fetching contribution data:", error);
				}
			}
		};

		fetchContributionData();
	}, [username]);

	return (
		<div>
			{<img className="owner-avatar" src={`${contributionData?.avatar_url}`} />}
			{<h3 className="repository-name">{contributionData?.name}</h3>}
			{contributionData && (
				<img
					className="contributions-image"
					src={`https://ghchart.rshah.org/${username}`}
					alt={`${username}'s GitHub Contribution Graph`}
				/>
			)}
		</div>
	);
};

export default ContributionGraph;
