import axios from "axios";
//here consuming API from backend
export const getDataAPI = async (url, page) => {
	const res = await axios.get(`/api/${url}?page=${page}`);
	return res;
};

export const postDataAPI = async (url, post, token) => {

	const res = await axios.post(`/api/${url}`, post, {
		headers: { Authorization: token },
	});
	return res;
};

export const putDataAPI = async (url, post, token) => {
	const res = await axios.put(`/api/${url}`, post, {
		headers: { Authorization: token },
	});
	return res;
};

export const deleteDataAPI = async (url, id, token) => {
	const res = await axios.delete(`/api/${url}/${id}`, {
		headers: { Authorization: token },
	});
	return res;
};

export const getClaimAPI = async (url, address) => {
	const res = await axios.get(`/api/${url}/${address}`);
	return res;
};

export const getClaimData = async (url, addpage) => {
	const res = await axios.get(`/api/${url}?page=${addpage}`);
	return res;
};

export const getTierAPI = async (url,data) => {
	const res = await axios.get(`/api/${url}/${data}`);
	return res;
};

