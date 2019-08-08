import axios from 'axios'

const axiosOrders = axios.create({
  baseURL: 'https://react-my-burger-fa4aa.firebaseio.com/'
})

export default axiosOrders
