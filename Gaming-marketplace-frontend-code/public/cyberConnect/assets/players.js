import axios from "axios";

const getQuesters = async () => {
	const response = await axios.get("http://localhost:5000/v1/quest/leaderboard");
	const data1 = response;
	for (var i in response.data.data) {
		const random = Math.floor(Math.random() * (4 - 0 + 1) + 0);
		response.data.data[i]["img"] = require(`./img${parseInt(random) + parseInt(3)}.png`);
		response.data.data[i]["num"] = parseInt(i) + parseInt(1);
		players.push(response.data.data[i]);
	}
};
getQuesters();

export const players = [
	//  {
	//   key: "1",
	//   img:require("./img3.png"),
	//   name:"Ralph Edwards",
	//   points: "1235XP",
	//   num:"1"
	//  },
	//  {
	//   key:"2",
	//   img:require("./img4.png"),
	//   name:"Dianne Russell",
	//   points: "920XP",
	//   num:"2"
	//  },
	//  {
	//   key: "3",
	//   img:require("./img5.png"),
	//   name:"Jane Cooper",
	//   points: "920XP",
	//   num:"3"
	//  },
	//  {
	//   key: "4",
	//   img:require("./img6.png"),
	//   name:"Kristin Watson",
	//   points: "920XP",
	//   num:"4"
	//  },
	//  {
	//   key: "5",
	//   img:require("./img7.png"),
	//   name:"Mark Basa",
	//   points: "920XP",
	//   num:"5"
	//  },
	//  {
	//   key: "6",
	//   img:require("./img2.png"),
	//   name:"Darlene Robertson",
	//   points: "920XP",
	//   num:"6"
	//  },
];
