import axios from "axios";

export default async function callApi(formData) {
    const url = "http://127.0.0.1:8000/objectdetection";
    // const result = await axios.post(url, {}, {
    //     "form-data": {
    //         "image": file
    //     }
    // });
    const result = await axios.post(url, formData);
    return result
}
