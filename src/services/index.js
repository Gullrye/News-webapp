import HTTP from '../libs/http'

class Service extends HTTP {
  getNewsList(type, count) {
    return new Promise((resolve, reject) => {
      this.ajax({
        url: 'Juhe/getNewsList',
        type: 'POST',
        dataType: 'JSON',
        data: {
          field: type
        },
        success(data) {
          resolve(data)
        },
        error(err) {
          reject(err)
        }
      })
    })
  }
}

export default new Service()
