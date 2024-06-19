export async function UploadToS3(file: any, locType: string, location: string) {
	// const file = e.target.files?.[0];
	// let targetLoc = location;

	// if (locType === "NewUser") {
	// 	targetLoc = location;
	// } else if (locType === "NewLivestream") {
	// 	targetLoc = location;
	// }

	// @kanishk type locTypeType = "NewUser" | "NewLivestream"... async function UploadToS3(file: any, locType: locTypeType, location: string)

	const filename = file.name;
	const fileType = file.type;

	console.log("filename", file, filename, fileType, location);

	const res = await fetch(`/api/s3?file=${location}/${filename}&fileType=${fileType}`);
	const { url } = await res.json();

	const upload = await fetch(url, {
		method: "PUT",
		body: file,
		headers: { "Content-Type": fileType, "Access-Control-Allow-Origin": "*" },
	});

	if (upload.ok) {
		console.log("Uploaded successfully!");
		console.log(upload);
		const text = upload.url;
		const regex = /^https?:\/\/[^?]+/;
		const match = text.match(regex);
		if (match) {
			console.log(match[0]);
			return match[0];
		} else {
			throw new Error("Error uploading image: url invalid");
		}
	}
	console.error("Upload failed.");
	throw new Error("Error uploading image: request failed");
}
