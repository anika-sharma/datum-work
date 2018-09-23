const PORT_NO = 3004

export const URL = {
	projects: () => {
		return `http://localhost:${PORT_NO}/projects/`;
	},
	projectById: (props) => {
		return `http://localhost:${PORT_NO}/projects/${props}`;
	},
	users: () => {
		return `http://localhost:${PORT_NO}/users/`;
	},
	roles: () => {
		return `http://localhost:${PORT_NO}/roles/`;
	}
}