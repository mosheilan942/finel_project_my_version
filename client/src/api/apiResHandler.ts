
const handleApiRes = async (res: Response) => {
    if (res.ok) {
        if (res.status === 204) {
            return null;
        }
        const data = await res.json();
        return data;
    } else {
        const errorData = await res.json();
        throw {status: res.status, ...errorData};
    }
};

export default handleApiRes;