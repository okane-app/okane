import CircularProgress from "react-native-circular-progress-indicator";

const JaugeDepenses = ({ dpt, max, pourcentage }) => {
	return (
		<>
			{dpt <= max && (
				<CircularProgress
					value={dpt}
					valueSuffix={`,${(dpt - Math.floor(dpt)).toFixed(2).split(".")[1]} €`}
					radius={120}
					duration={2000}
					textColor={"#ecf0f1"}
					maxValue={max}
					title={`${pourcentage}% dépensés`}
					titleColor={"white"}
					titleStyle={{ fontSize: 16, fontWeight: "400" }}
					textStyle={{ fontSize: 40, fontWeight: "500" }}
				/>
			)}

			{dpt > max && (
				<CircularProgress
					value={dpt}
					valueSuffix={`,${(dpt - Math.floor(dpt)).toFixed(2).split(".")[1]} €`}
					radius={120}
					duration={2000}
					textColor={"#ecf0f1"}
					maxValue={dpt}
					title={`${pourcentage}% dépensés`}
					titleColor={"white"}
					titleStyle={{ fontSize: 16, fontWeight: "400" }}
					textStyle={{ fontSize: 40, fontWeight: "500" }}
				/>
			)}
		</>
	);
};

export default JaugeDepenses;
