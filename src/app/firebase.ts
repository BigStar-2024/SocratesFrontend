import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {
  getStorage,
  ref as assetRef,
  getDownloadURL,
  listAll,
  uploadBytes,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAdf707dGjrJOLJVuES5V-Reu6RuaJuvug',
  authDomain: 'learningwithsocrates-frontend.firebaseapp.com',
  databaseURL:
    'https://learningwithsocrates-frontend-default-rtdb.firebaseio.com',
  projectId: 'learningwithsocrates-frontend',
  storageBucket: 'learningwithsocrates-frontend.appspot.com',
  messagingSenderId: '1031928174067',
  appId: '1:1031928174067:web:38667d9d54008d41c3ee86',
  measurementId: 'G-SLPK83H4DF',
};


const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);


export const getAvatarAsset = (directory: any, image: any, setPhoto: any) => {
  const storage = getStorage();
  getDownloadURL(assetRef(storage, `assets/avatar/${directory}/${image}`))
    .then(url => {
      setPhoto(url);
    })
    .catch(err => {
      console.log('Error in pic getting', err);
    });
};

export const getAvatarDir = async (dir: any, setDir: any) => {
  const storage = getStorage();
  const listRef = assetRef(storage, `assets/avatar/${dir}`);
  listAll(listRef).then(res => {
    Promise.all(res.items.map(getDownloadURL)).then(setDir);
  });
};

/**
 * Card collectible page, when user buys a pack of 3 cards, download files from firebase
 * @author BruceLee
 * @param filenames filenames from backend
 * @param dir directory name in firebase currently bought
 * @param getBoughtCards function to set states with image urls
 */
export const buyCardsWithFilenames = async (
  filenames: Array<{ image: string }>,
  dir: string,
  getBoughtCards: any
) => {
  const storage = getStorage();
  const links = [];

  try {
    for (const filename of filenames) {
      const fileRef = assetRef(
        storage,
        `assets/collectible/${dir}/${filename.image}`
      );
      links.push(await getDownloadURL(fileRef));
    }
    getBoughtCards(links);
  } catch (e) {
    console.log(e);
    getBoughtCards([]);
  }
};

/**
 * Get total images of current category by file names
 * @author BruceLee
 * @param dir currently selected category
 * @param setAllCards set links for all cards of current category
 */
export const getAllCards = async (
  filenames: Array<string>,
  dir: string,
  setAllCards: any
) => {
  const storage = getStorage();
  const links = [];

  for (const filename of filenames) {
    try {
      const fileRef = assetRef(
        storage,
        `assets/collectible/${dir}/${filename}`
      );
      links.push(await getDownloadURL(fileRef));
    } catch {
      links.push('No Image');
    }
  }
  setAllCards(links);
};

/**
 * @author Bruce Lee
 * @description Get firebase storage file download url with file name
 */
export const getDownUrlByFilename = async (dir: string, filename: string) => {


  try {
    const storage = getStorage();
    if ((filename && dir) !== '') {

      const fileRef = assetRef(
        storage,
        `assets/collectible/${dir}/${filename}`
      );
      const url = await getDownloadURL(fileRef);
      return url
    }
    else return null
  } catch (e) {
    console.log('error from firebase:', e)
    return null
  }
};


export const uploadTeacherCertificateFileOnFirebase = async (file: any, filename: string) => {

  const storage = getStorage();
  const imageRef = assetRef(storage, `assets/certificates/${filename}`)

  try {
    const snapshot = await uploadBytes(imageRef, file)
    return { success: true, snapshot: snapshot }
  } catch (error: any) {
    return { success: false, error: error.message }
  }

};

export const fetchTeacherCertificateFilesFromFirebase = async (setUrls: Function) => {
  const storage = getStorage();
  const listRef = assetRef(storage, `assets/certificates`);
  listAll(listRef).then(res => {
    Promise.all(res.items.map(getDownloadURL)).then(urls => {
      setUrls(urls)
    });
  });
};

// const language = 'en-us';
// const userProgress = [
//   {
//     title: dictionary[language].ela,
//     color: BasicColor.red,
//     progress: [
//       false,
//       true,
//       false,
//       false,
//       true,
//       false,
//       false,
//       true,
//       false,
//       false,
//     ],
//   },
//   {
//     title: dictionary[language].math,
//     color: BasicColor.orange,
//     progress: [
//       false,
//       true,
//       false,
//       false,
//       true,
//       false,
//       false,
//       true,
//       false,
//       false,
//     ],
//   },
//   {
//     title: dictionary[language].sight,
//     color: BasicColor.yellow,
//     progress: [
//       false,
//       true,
//       false,
//       false,
//       true,
//       false,
//       false,
//       true,
//       false,
//       false,
//     ],
//   },
//   {
//     title: dictionary[language].science,
//     color: BasicColor.green,
//     progress: [
//       false,
//       true,
//       false,
//       false,
//       true,
//       false,
//       false,
//       true,
//       false,
//       false,
//     ],
//   },
//   {
//     title: dictionary[language].health,
//     color: BasicColor.aqua,
//     progress: [
//       false,
//       true,
//       false,
//       false,
//       true,
//       false,
//       false,
//       true,
//       false,
//       true,
//     ],
//   },
// ];

// const ranking = ['Tony', 'Emily', 'Albert', 'Viri', 'Candy'];

// export function writeProgress() {
//   const db = getDatabase(app);
//   set(ref(db, 'progress/test_user'), userProgress);
// }

// export const getProgress = (update: any) => {
//   const db = getDatabase(app);
//   const progressRef = ref(db, 'progress/test_user');
//   onValue(progressRef, snapshot => {
//     const data = snapshot.val();
//     update(data);
//   });
// };

// export function writeRanking() {
//   const db = getDatabase(app);
//   set(ref(db, 'ranking/test_user'), ranking);
// }

// export const getRanking = (update: any) => {
//   const db = getDatabase(app);
//   const progressRef = ref(db, 'ranking/test_user');
//   onValue(progressRef, snapshot => {
//     const data = snapshot.val();
//     update(data);
//   });
// };
