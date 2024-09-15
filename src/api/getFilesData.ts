import axios from 'axios';
import { responseBackup } from 'consts';

const getFilesData = async () => {
  const url = 'https://ab-file-explorer.athleticnext.workers.dev/?file=regular';

  return axios
    .get(url)
    .then((res) => {
      return res.data.filepaths;
    })
    .catch((error) => {
      console.error(
        'Error while fetching filepaths. For demo purposes returning backup instead:',
        error
      );
      return responseBackup;
    });
};

export default getFilesData;
