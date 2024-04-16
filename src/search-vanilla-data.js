import Airtable from 'airtable'

const token =
  'pat7rZ3bNn1doX7yx.960c7e7f16e2f10b4ccb18a266701eab3beae8f86bd5e775c7b5e5ca4028781f'

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
            description: record.fields['Description']
          })
        })

        resolve(content)
      })
    console.log(content)
  })
}

export { getPostTeasers }
