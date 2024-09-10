import { HttpResponse, http } from 'msw'

export const handlers = [
  http.get('/locations/x/0', () => {
    return HttpResponse.json([
      {
        address:
          'Japan, 〒206-0013 Tokyo, Tama, Sakuragaoka, 4-chōme−４３−２５',
        authId: '123',
        description:
          'A neighborhood that inspired locations in "Whisper of the Heart"',
        id: 'ChIJmbzCFl_jGGAR98V28VrP0QI',
        image:
          'https://d20aeo683mqd6t.cloudfront.net/articles/title_images/000/040/281/original/cover-photo.jpg',
        name: 'Iroha-zaka Slope',
        rating: 4.3,
        tag: 'ghibli',
        tagId: 1,
        url: 'https://maps.google.com/?cid=203171447713482231',
        userImg: 'image-link',
        username: 'koda',
      },
    ])
  }),
]
