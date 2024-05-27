import Airtable from 'airtable'

const token =
  'pat7rZ3bNn1doX7yx.e3a053db849dbc90266ee4437df084f90e6a245c626138ea6a63c9859661b5c9'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: token
})

let base = Airtable.base('appePrphSXY2TX8TD')

function getPostTeasers() {
  return new Promise((resolve, reject) => {
    const content = []

    base('teasers')
      .select({ maxRecords: 100 })
      .firstPage()
      .then((result) => {
        result.forEach((record) => {
          content.push({
            id: record.id,
            tags: record.fields['Tags'],
            image: record.fields['Image'],
            title: record.fields['Title'],
            description: record.fields['Description'],
            url: record.fields['Url']
          })
        })

        resolve(content)
      })
    console.log(content)
  })
}

export { getPostTeasers }
