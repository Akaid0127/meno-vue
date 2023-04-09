function objToJson(objData) {
	const jsonData = JSON.stringify(objData, null, 2);
	return jsonData
}

export default objToJson