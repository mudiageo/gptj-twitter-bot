import fs from 'fs';
export const get = async (event) => {
	//console.log(process.cwd())
	let url = new URL(event.request.url);
	let users = fs.readFileSync('C:/node/messaging-app/src/routes/api/users.json');
	let myData = JSON.parse(users);
	let userid = url.searchParams.get('userid');
	let data;
	if (userid) {
		data = myData.find((user) => {
			if (user.id === userid) return user;
		});
	} else {
		data = myData;
	}
	return {
		status: 200,
		body: data
	};
};
export const post = async ({ request, params }) => {
	let data = await request.text();
	let messages = fs.writeFileSync('C:/node/messaging-app/src/routes/api/users.json', data);

	return {
		status: 200,
		body: 'done'
	};
};
