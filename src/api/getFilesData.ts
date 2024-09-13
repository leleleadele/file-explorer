import axios from 'axios';

const getFilesData = async () => {
  const url = 'https://ab-file-explorer.athleticnext.workers.dev/?file=regular';

  return axios
    .get(url)
    .then((res) => {
      return res.data.filepaths;
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
};

export default getFilesData;
