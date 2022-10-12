import { getStorage, ref, uploadString } from "firebase/storage"

const storage = getStorage();
const storageRef = ref(storage, 'some-child');

