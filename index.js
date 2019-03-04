const hello = new Vue({
  el: '#hello',
  data: {
    greeting: 'Moi! This is me,',
    name: 'Jaakko Nurkka',
  }
});

const articles = new Vue({
  el: '#articles',
  data: {
    heading: 'Some of my work',
    entries: [
      {
        title: 'How Investors React When Companies Announce They’re Moving to a SaaS Business Model',
        teaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer arcu dui, mollis scelerisque turpis et, viverra dictum nisi. Curabitur rhoncus, ex vel efficitur consequat, velit libero volutpat justo, et lobortis ex elit sed quam. Pellentesque euismod mi in diam ultrices, ac pharetra odio cursus. Aenean vitae dui et quam pharetra pharetra quis vel diam. Nullam ullamcorper placerat urna, a egestas sapien consequat at. Aliquam quis dapibus nisl. Etiam velit mi, pretium nec massa in, condimentum placerat metus.',
        url: 'https://hbr.org/2017/01/how-investors-react-when-companies-announce-theyre-moving-to-a-saas-business-model',
      },
      {
        title: 'Test with a shorter title',
        teaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer arcu dui, mollis scelerisque turpis et, viverra dictum nisi. Curabitur rhoncus, ex vel efficitur consequat, velit libero volutpat justo, et lobortis ex elit sed quam. Pellentesque euismod mi in diam ultrices, ac pharetra odio cursus. Aenean vitae dui et quam pharetra pharetra quis vel diam. Nullam ullamcorper placerat urna, a egestas sapien consequat at. Aliquam quis dapibus nisl. Etiam velit mi, pretium nec massa in, condimentum placerat metus.',
        url: 'https://hbr.org/2017/01/how-investors-react-when-companies-announce-theyre-moving-to-a-saas-business-model',
      }
    ]
  }
})

const contact = new Vue({
  el: '#contact',
  data: {
    heading: "Let's get in touch",
  }
})
