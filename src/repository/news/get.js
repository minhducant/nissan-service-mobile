import Axios from '@configs/Axios';

export default {
  getListNews: ({
    ADMIN,
    accessToken,
    name,
    effective_date,
    type_news,
    category,
    page = 1,
    itemsPerPage = 15,
  }) => {
    const url = '/technews/web_technews';
    let dataBody = {
      admin: ADMIN,
      access_token: accessToken,
    };
    if (page) {
      dataBody.page = page;
    }
    if (itemsPerPage) {
      dataBody.items_per_page = itemsPerPage;
    }
    if (name) {
      dataBody.name = name;
    }
    if (effective_date) {
      dataBody.effective_date = effective_date.split('-').reverse().join('-');
    }
    if (type_news) {
      dataBody.type_news = type_news;
    }
    if (category) {
      dataBody.category = category;
    }
    return Axios.get(url, dataBody);
  },
};
