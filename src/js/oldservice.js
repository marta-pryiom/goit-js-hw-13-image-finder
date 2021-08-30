// const URL = 'https://pixabay.com/api/';
// const API_KEY = '23024324-04436665e5646ea163d34a038';
// export default class PixabayApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.number = 12;
//   }

//   fetchImage() {
//     console.log(this);
//     return fetch(
//       `${URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.number}`,
//     )
//       .then(response => response.json())
//       .then(({ hits }) => {
//         this.page += 1;
//         return hits;
//       });
//     //   .catch(err => console.log(err));
//   }
//   get query() {
//     return this.searchQuery;
//   }
//   set query(newquery) {
//     this.searchQuery = newquery;
//   }
//   resetPage() {
//     this.page = 1;
//   }
// }
