import { requestWrapper } from './ServerRequests';

export const getUserDataById = async (id: string) => new Promise<any>(async (resolve, reject) => {
  try {
    const response: any = await requestWrapper({ method: 'get', url: `/users/${id}/questions?site=stackoverflow&order=desc&sort=creation` });
    const { display_name, profile_image, accept_rate, reputation, link } = response?.data?.items[0].owner;

    resolve({
      profileImage: profile_image,
      displayName: display_name,
      profileLink: link,
      reputation,
      acceptRate: accept_rate,
      questions: response?.data?.items
    });
  } catch (error) {
    reject(error);
  }
});
