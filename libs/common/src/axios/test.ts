// https://reqres.in/api/users?page=2
import Http from './index';

class TestApi extends Http {
  getUsers() {
    return this.get('users', { page: 2 });
  }

  postUsers() {
    return this.create('users', {
      name: 'morpheus',
      job: 'leader',
    });
  }
}

const newClass = new TestApi({
  baseUrl: 'https://reqres.in',
  apiUrl: '/api',
  timeout: 5000,
  token: null,
});

(async function () {
  try {
    const getResponse = await newClass.getUsers();
    console.log('GET RESPONSE', getResponse?.data);
    const postResponse = await newClass.postUsers();
    console.log('POST RESPONSE', postResponse?.data);
  } catch (e) {
    console.log(e);
  }
})();
export default newClass;
