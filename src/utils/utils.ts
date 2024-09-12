export default function stringToBoolean(str: string): boolean {
	return JSON
	 .parse(str.toLowerCase());
}