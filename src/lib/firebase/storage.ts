import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

export async function uploadImgToFirebase(file: File, email: string) {
  const result = await uploadBytes(ref(storage, `userAvatar/${email}/` + file.name), file, {
    contentType: file.type
  });
  return getDownloadURL(result.ref);
}
