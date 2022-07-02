const regexExp =
	/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	return regexExp.test(param);
}
