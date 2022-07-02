export function api(method, resource, data) {
	return fetch(`https://chatapp.com/${resource}`);
}
